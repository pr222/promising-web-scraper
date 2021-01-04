/**
 * The link scraper module.
 *
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 1.0.0
 */
import jsdom from 'jsdom'
import fetch from 'node-fetch'
const { JSDOM } = jsdom
/**
 * Link scraper class.
 *
 * @class Scraper
 */
export class Scraper {
  /**
   * Get the text of a page.
   *
   * @param {string} url - The url page to get its text from.
   * @returns {string} - The text.
   * @memberof Scraper
   */
  async _getPageText (url) {
    // Fetch the requested url.
    const response = await fetch(url)
    // Convert the response to plain text.
    return response.text()
  }

  /**
   * Scraping for links on a page.
   *
   * @param {string} url - The url page to scrape.
   * @returns {string[]} - Array of urls.
   * @memberof Scraper
   */
  async findLinksFromPage (url) {
    const text = await this._getPageText(url)

    // Convert plain text to a workable DOM.
    const dom = new JSDOM(text)
    const links = Array.from(dom.window.document.querySelectorAll('a[href^="http"], a[href^="https"]'), anchor => anchor.href)

    return [...new Set(links)]
  }
}
