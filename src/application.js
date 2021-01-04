/**
 * The application module.
 *
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */
import validator from 'validator'
import fse from 'fs-extra'
import { Scraper } from './scraper.js'

/**
 * Encapsulates a Node application.
 */
export class Application {
  /**
   * Create a new instance of the Application class.
   *
   * @param {string} dataSource - directory where to write links.
   * @param {string[]} urls - Array of urls to scrape.
   */
  constructor (dataSource, urls) {
    this.dataSource = dataSource
    this._urls = urls
  }

  /**
   * Get the array of urls.
   *
   * @readonly
   * @memberof Application
   * @returns {string[]} - The urls to scrape from.
   */
  get urls () {
    const urls = [...this._urls]
    return urls
  }

  /**
   * Validate and set the value or URLs to scrape.
   *
   * @memberof Application
   */
  set urls (values) {
    // Make sure there are any URLs to scrape from.
    if (values.length < 1) {
      throw new Error('There are no arguments provided with URLs to scrape from...')
    }

    // Make sure all arguments are valid URL-strings.
    if (values.every(value => {
      return validator.isURL(value)
    })) {
      // Set urls when all links are valid.
      this._urls = [...values]
    } else {
      // Othervise, throw and error.
      throw new Error('Some arguments for URLs were not an valid URL...')
    }
  }

  /**
   * Begins running the application.
   */
  async run () {
    // First, start reading the previous links from file.
    const previousLinks = this._readLinksFromFile()

    // Scrape for the new links...
    const scraper = new Scraper()
    const scrapedLinks = this._urls.map(url => scraper.findLinksFromPage(url))

    // And wait for all links to be ready.
    const links = await Promise.all([previousLinks, ...scrapedLinks])

    // Make a new Set to remove duplicates and flatten.
    const linksSet = new Set([...links.flat()])

    // Sort links in array and write array of links to the file.
    await this._writeLinksOnFile([...linksSet].sort())
  }

  /**
   * Read a JSON file to get the links written on it.
   *
   * @returns {string[]} - Array of links from a file.
   * @memberof Application
   */
  async _readLinksFromFile () {
    try {
      const filedLinks = fse.readJson(this.dataSource)
      return filedLinks
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * Write links to file in JSON-format.
   *
   * @param {string[]} links - Array of links to write into file.
   * @memberof Application
   */
  async _writeLinksOnFile (links) {
    try {
      fse.writeJSON(this.dataSource, links, { spaces: '\t' })
    } catch (err) {
      console.error(err)
    }
  }
}
