# eleventy-plugin-ancestry ![GitHub package.json version](https://img.shields.io/github/package-json/v/tigersway/eleventy-plugin-ancestry?style=flat-square) ![GitHub last commit](https://img.shields.io/github/last-commit/tigersway/eleventy-plugin-ancestry?style=flat-square)


A plugin for creating a real hierarchical navigation, following folders and documents, in Eleventy projects.


## Installation

Available on [npm](https://www.npmjs.com/package/@tigersway/eleventy-plugin-ancestry).

```
npm install @tigersway/eleventy-plugin-ancestry --save
```

Open up your Eleventy config file (probably `.eleventy.js`) and use `addPlugin`:

```
const pluginAncestry = require("@tigersway/eleventy-plugin-ancestry");
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginAncestry);
};
```

## Usage

See `sample/index.md` & `sample/_includes/base.njk` for examples how to access children/parent.

### Supplied filters

* `find`: Gives access to one - if it exists - `collections.all` element.
* `children`: Gives access to the folder or subfolders `collections.all` elements.
* `sorted`: Allows to sort any collection with a deep property.

### Notes

- As of today, the use of `_index` (to allow easier search of parent) is not included in Eleventy [#1057](https://github.com/11ty/eleventy/issues/1057) & [#774](https://github.com/11ty/eleventy/issues/774).<br>
A permalink rewrite in root directory data file imposes `@11ty/eleventy@beta`!
