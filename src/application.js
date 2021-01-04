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
    // Not developed yet.
  }

  /**
   * Write links to file in JSON-format.
   *
   * @param {string[]} links - Array of links to write into file.
   * @memberof Application
   */
  async _writeLinks (links) {
    try {
      await fse.writeJSON(this.dataSource, links, { spaces: '\t' })
      console.log('Succeeded writing down links.')
    } catch (err) {
      console.error(err)
    }
  }
}
