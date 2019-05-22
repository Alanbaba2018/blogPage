const path = require('path');
const fs= require('fs');

const rootPath = path.join(__dirname, './src/lib');
eachDir(rootPath);

function eachDir(path) {
  fs.readdir(path, (err, fileList) => {
    if (err) {
      console.error(err);
    } else {
      console.log(fileList);
    }
  })
}
