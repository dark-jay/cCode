// Author of this code: Cameron Nokes

const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Store {
  constructor(opts) {

    const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    // We'll use the `configName` property to set the file name and path.join to bring it all together as a string
    this.path = path.join(userDataPath, opts.configName + '.json');
    
    this.data = parseDataFile(this.path, opts.defaults);
  }

  get() {
    return this.data;
  }

  set(obj) {
    this.data = {};
    try {
      console.log(obj);
      fs.writeFileSync(this.path, JSON.stringify(obj));
      console.log('file write successfull at: ' + this.path);
    }
    catch(err) {
      console.log(err);
    }
  }
  
  /*
  // This will just return the property on the `data` object
  get(key) {
    return this.data[key];
  }
  
  // ...and this will set it
  set(key, val) {
    this.data[key] = val;

    try {
        fs.writeFileSync(this.path, JSON.stringify(this.data));
    }
    catch(err) {
        console.log('Error writting the last-opened-file.json');
    }
  }
  */
}

function parseDataFile(filePath, defaults) {
  // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
  // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch(error) {
    // if there was some kind of error, return the passed in defaults instead.
    return defaults;
  }
}

// expose the class
module.exports = Store;