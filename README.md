# eleventy-plugin-ancestry

A plugin for creating a real hierarchical navigation, following folders and documents, in Eleventy projects. Supports breadcrumbs too!

![GitHub package.json version](https://img.shields.io/github/package-json/v/tigersway/eleventy-plugin-ancestry?style=flat-square) ![GitHub last commit](https://img.shields.io/github/last-commit/tigersway/eleventy-plugin-ancestry?style=flat-square)

## Installation

Available on [npm](https://www.npmjs.com/package/@tigersway/eleventy-plugin-ancestry).
![npm (scoped)](https://img.shields.io/npm/v/@tigersway/eleventy-plugin-ancestry?style=flat-square)

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

See `sample/index.md` for examples how to access children/parent.

### Supplies filters

* `find`: ...
* `children`: ...
* `sorted`: ...
