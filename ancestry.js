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
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (!ascendingOrder ? (comparison * -1) : comparison);
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

      String.prototype.isIndex = function () {
        return this.match(/\/_?index$/);
      }
      String.prototype.normalizeIndex = function () {
        return this.replace(/_index$/, 'index');
      }

      Object.keys(ancestryMap).forEach(key => {
        // TODO: Need to simplify these
        let parent = key;
        if (parent.isIndex()) {
          parent = path.dirname(parent);
          while (parent !== '/') {
            parent = path.dirname(parent);
            index = path.join(parent, 'index').replace(/\\/g, '/');
            if (ancestryMap[index]) {
              ancestryMap[key].parent = ancestryMap[index].filePathStem.normalizeIndex();
              ancestryMap[index].children.push(ancestryMap[key]);
              break;
            }
          }
        } else {
          do {
            parent = path.dirname(parent);
            index = path.join(parent, 'index').replace(/\\/g, '/');
            if (ancestryMap[index]) {
              ancestryMap[key].parent = ancestryMap[index].filePathStem.normalizeIndex();
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

    if (ancestryMap[path].children) return ancestryMap[path].children;

    return null;
  },

  sorted: (collection, key, ascendingOrder = true) => {
    return collection.sort(compareValues(key, ascendingOrder));
  }

}
