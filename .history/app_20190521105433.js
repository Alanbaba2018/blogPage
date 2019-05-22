const path = require('path');
const fs= require('fs');

const rootPath = path.join(__dirname, './src/lib');
eachDir(rootPath);

function eachDir(filePath) {
  fs.readdir(filePath, (err, fileList) => {
    if (err) {
      console.error(err);
    } else {
      for (const f of fileList) {
        const innerPath = path.join(filePath, f);
        fs.stat(innerPath, (err, stats) => {
          if (err) {
            console.log('文件类型判断出错');
          } else {
            if (stats.isDirectory()) {
              eachDir(innerPath);
            } else {
              console.log(innerPath);
            }
          }
        })
      }
    }
  })
}
