/**
 * The application module.
 *
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @author Ellen Nu <en999zz@student.lnu.se>
 * @version 1.0.0
 */

import fs from 'fs-extra'
import validator from 'validator'
import { LinkScraper } from './link-scraper.js'

/**
 * Encapsulates a Node application.
 */
export class Application {
  /**
   * Initializes a new instance of the Application class.
   *
   * @param {string} dataSource - ...
   * @param {string[]} urls - The URLs to scrape links from.
   */
  constructor (dataSource, urls) {
    this.dataSource = dataSource
    this.urls = urls
  }

  /**
   * Gets the URLs to scrape links from.
   *
   * @returns {string[]} The URLs.
   */
  get urls () {
    return [...this._urls]
  }

  /**
   * Sets the URLs to scrape links from.
   */
  set urls (values) {
    // Validate the number of urls.
    if (values.length === 0) {
      throw new Error('No url(s).')
    }

    // Validate the arguments as URLs.
    values.forEach(value => {
      if (!validator.isURL(value)) {
        throw new Error(`"${value}" is not a valid URL.`)
      }
    })

    this._urls = [...values]
  }

  /**
   * Merges persistent links and scraped links and write the merged links
   * back to the persistent storage.
   */
  async run () {
    // Read persistent links from a JSON file.
    const persistentLinksPromise = this._readPersistentLinks()

    // Scrape links.
    const linkScraper = new LinkScraper()
    const scrapedLinksPromises = this._urls.map(url => linkScraper.extractLinks(url))

    // Wait for the promises to resolve.
    const links = await Promise.all([persistentLinksPromise, ...scrapedLinksPromises])

    // Flatten the persistent links and scraped links arrays to create
    // a new array and then create a Set to remove any duplicates.
    const linksSet = new Set([...links.flat()])

    // Spread the Set to create an array with links, sort the links and
    // write them to a JSON file.
    await this._writePersistentLinks([...linksSet].sort())
  }

  /**
   * Reads the entire content of a JSON file.
   *
   * @returns {string[]} An array with links.
   */
  async _readPersistentLinks () {
    // eslint-disable-next-line node/handle-callback-err
    return fs.readJson(this.dataSource).catch(error => [])
  }

  /**
   * Writes links as JSON to a file, replacing the file if it already exists.
   *
   * @param {string[]} links - The links to be written to a file.
   */
  async _writePersistentLinks (links) {
    fs.writeJson(this.dataSource, links, { spaces: 4 })
  }
}
