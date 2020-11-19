# The Promising Web Scraper

In this exercise, you are going to create a web scraper, i.e., an application that, to some extent, acts as a web browser.

The application will request pages from web servers, extract the links and write the URLs to the web sources to a JSON file. The user must pass the path to the JSON file as the first command-line argument and the URLs to scrape as additional command-line arguments. Only extracted links with absolute URLs that are interesting and relative can be ignored. The JSON file must not contain duplicate URLs that must be sorted in ascending order.

To avoid callback hell, you are obliged to use promises instead of callback functions. Depending on your choices, you may need to "promisify" one or another API function to avoid callbacks.

## A little help to get started

A project has already started, and your task is to complete the Application class, and add additional classes if you find it appropriate (which you should do).

All necessary boiler-plate files are there, `README.md`, `package.json`, `.gitignore`, and `src/app.js`, as well as more specific files and folders such as `src/application.js` and `data`.

You should not need to edit the `src/app.js` file, but read it and familiarize yourself with the code to understand how the `Application` class must be implemented for the code in the file to work.

## A few JavaScript hints

JavaScript has several features that can be useful. Some examples are:

- [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) is handy to collect unique values.
- The array method [flat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) may be useful as well.
- Do not forget the [spread syntax (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax). You can use it to expand arrays and Set objects.

## Dependencies

Although JavaScript and the Node API offers a lot, some external packages may come in handy. In the file `packages.json`, you will find a list of suggestions for dependencies, packages required by your application during production.

Suggested dependencies have functionality for validating URLs (Why request something that is not even formatted as a URL?), reading and writing JSON files, making promisefied HTTP requests, and parsing text into a DOM structure. By reading each package documentation (search for the package at [npm](https://www.npmjs.com/) to find its' documentation), you can learn what they offer.

## Example use and output

Example of the command line to run the application.

```shell
npm start ./data/links.json https://nodejs.org/en/ https://developer.mozilla.org/en-US/
```

The content of the file after the command. Web sources retrieved from [https://nodejs.org/en/](https://nodejs.org/en/) and [https://developer.mozilla.org/en-US/](https://developer.mozilla.org/en-US/). [17th November 2020]

(For the JSON data to be easy to read, make sure it's "prettified" before writing it to the file.)

```shell
[
    "http://hacks.mozilla.org/",
    "https://github.com/mdn/",
    "https://github.com/mdn/browser-compat-data",
    "https://github.com/mdn/kuma#readme",
    "https://github.com/mdn/kuma/issues/new/choose",
    "https://github.com/mdn/sprints/issues/new?template=issue-template.md&projects=mdn/sprints/2&labels=user-report&title=",
    "https://github.com/nodejs/help/issues",
    "https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V14.md#14.15.1",
    "https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V15.md#15.2.1",
    "https://github.com/nodejs/node/graphs/contributors",
    "https://github.com/nodejs/node/issues",
    "https://github.com/nodejs/nodejs.org/issues",
    "https://hacks.mozilla.org/2020/10/coming-through-with-firefox-82/",
    "https://hacks.mozilla.org/2020/10/mdn-web-docs-editorial-strategy-and-community-participation/",
    "https://hacks.mozilla.org/2020/10/mdn-web-docs-evolves-lowdown-on-the-upcoming-new-platform/",
    "https://hacks.mozilla.org/2020/11/firefox-83-is-upon-us/",
    "https://hacks.mozilla.org/2020/11/warp-improved-js-performance-in-firefox-83/",
    "https://nodejs.org/dist/latest-v14.x/docs/api/",
    "https://nodejs.org/dist/latest-v15.x/docs/api/",
    "https://nodejs.org/dist/v14.15.1/",
    "https://nodejs.org/dist/v15.2.1/",
    "https://openjsf.org/",
    "https://openjsf.org/certification",
    "https://raw.githubusercontent.com/nodejs/node/master/LICENSE",
    "https://shop.spreadshirt.com/mdn-store/",
    "https://stackoverflow.com/",
    "https://support.mozilla.org/",
    "https://trademark-list.openjsf.org/",
    "https://trademark-policy.openjsf.org/",
    "https://twitter.com/mozdevnet",
    "https://twitter.com/mozilla",
    "https://v8.dev/",
    "https://www.instagram.com/mozillagram/",
    "https://www.mozilla.org/about/",
    "https://www.mozilla.org/about/legal/terms/mozilla",
    "https://www.mozilla.org/contact/",
    "https://www.mozilla.org/firefox/?utm_source=developer.mozilla.org&utm_campaign=footer&utm_medium=referral",
    "https://www.mozilla.org/firefox/developer/?utm_campaign=deved_inactive_css&utm_medium=referral&utm_source=developer.mozilla.org",
    "https://www.mozilla.org/privacy/",
    "https://www.mozilla.org/privacy/websites/",
    "https://www.mozilla.org/privacy/websites/#cookies"
]
```

## Hints

- [7 Ways to Make HTTP Requests in Node.js](https://attacomsian.com/blog/http-requests-in-nodejs)
- [Parsing HTML: A Guide to Select the Right Library](https://tomassetti.me/parsing-html/#nodejs)
- [Getting starting with web scraping in node.js](https://scotch.io/tutorials/scraping-the-web-with-node-js)
