const ancestry = require('./ancestry.js');


module.exports = (eleventyConfig) => {

  eleventyConfig.addCollection('ancestry', collection => {
    return ancestry.buildCollection(collection.getAll());
  })

  eleventyConfig.addFilter('find', ancestry.find);
  eleventyConfig.addFilter('children', ancestry.children);
  eleventyConfig.addFilter('ancestors', ancestry.ancestors);
  eleventyConfig.addFilter('sorted', ancestry.sorted);

}
