const path = require('path');


const getProperty = (obj, name) => {
  return name.split('.').reduce((previous, current) => {
    return previous ? previous[current] : undefined;
  }, obj);
};

function compareValues(key, ascendingOrder = true) {
  return function innerSort(a, b) {
    const varA = getProperty(a, key);
    const varB = getProperty(b, key);

    let comparison = 0;
    if (!varA && !varB) {
      comparison = 0;
    } else if (!varB || varA > varB) {
      comparison = 1;
    } else if (!varA || varA < varB) {
      comparison = -1;
    }
    return ascendingOrder ? comparison : comparison * -1;
  };
}


let ancestryMap = {}

module.exports = {

  buildCollection: (collection) => {

    if (Object.entries(ancestryMap).length === 0) {

      ancestryMap = collection.reduce((map, item) => {
        item.parent = null;
        item.children = [];
        map[item.filePathStem.replace(/_index$/, 'index')] = item;
        return map;
      }, {});

      isIndex = (str) => str.match(/\/_?index$/);
            
      normalizeIndex = (str) => str.replace(/_index$/, 'index');

      Object.keys(ancestryMap).forEach(key => {
        // TODO: Need to simplify these
        let parent = key;
        if (isIndex(parent)) {
          parent = path.dirname(parent);
          while (parent !== '/') {
            parent = path.dirname(parent);
            index = path.join(parent, 'index').replace(/\\/g, '/');
            if (ancestryMap[index]) {
              ancestryMap[key].parent = normalizeIndex(ancestryMap[index].filePathStem);
              ancestryMap[index].children.push(ancestryMap[key]);
              break;
            }
          }
        } else {
          do {
            parent = path.dirname(parent);
            index = path.join(parent, 'index').replace(/\\/g, '/');
            if (ancestryMap[index]) {
              ancestryMap[key].parent = normalizeIndex(ancestryMap[index].filePathStem);
              ancestryMap[index].children.push(ancestryMap[key]);
              break;
            }
          } while (parent !== '/');
        }
      });
    }
    // console.dir(ancestryMap, {depth:2});
    return ancestryMap;
  },

  find: (path) => {
    path.replace(/_index$/, 'index');

    return ancestryMap[path];
  },

  children: (path) => {
    if (typeof path === 'object' && path.filePathStem) path = path.filePathStem;

    path = path.replace(/_index$/, 'index');

    return ancestryMap[path]?.children ? ancestryMap[path].children : [];
  },

  ancestors: (path) => {
    if (typeof path === 'object' && path.filePathStem) path = path.filePathStem;

    path = path.replace(/_index$/, 'index');

    let results = [];
    while (ancestryMap[path]?.parent) {
      path = ancestryMap[path].parent;
      results.unshift(ancestryMap[path]);
    }
    return results;
  },

  sorted: (collection, key, ascendingOrder = true) => {
    return collection.sort(compareValues(key, ascendingOrder));
  }

}
