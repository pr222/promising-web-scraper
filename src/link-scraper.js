/**
 * The link scraper module.
 *
 * @author Ellen Nu <en999zz@student.lnu.se>
 * @version 1.0.0
 */

import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'

/**
 * Encapsulates a link scraper.
 */
export class LinkScraper {
  /**
   * Extracts the unique absolute links on a web page.
   *
   * @param {string} url - The URL of the web page to scrape.
   * @returns {string[]} The unique and absolute links.
   */
  async extractLinks (url) {
    const text = await this._getText(url)

    const dom = new JSDOM(text)

    const links = Array.from(dom.window.document.querySelectorAll('a[href^="http://"],a[href^="https://"]'))
      .map(anchorElement => anchorElement.href)
      .sort()

    return [...new Set(links)]
  }

  /**
   * Gets the plain text from an URL.
   *
   * @param {string} url - URL to get text content from.
   * @returns {string} The content as plain text.
   */
  async _getText (url) {
    const response = await fetch(url)
    return response.text()
  }
}
