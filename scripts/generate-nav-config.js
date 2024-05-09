const fs = require('fs');
const path = require('path');

const EXCLUDED_FOLDERS = ['public'];
const targetPath = path.join(__dirname, '../docs/src');
// 输出文件地址
const outputPath = path.join(targetPath, 'nav-config.ts');

const generateNavConfig = () => {
  try {
    const dirs = fs.readdirSync(targetPath);
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      if (EXCLUDED_FOLDERS.includes(dir)) continue;
      const tempPath = path.join(targetPath, dir);
      const stat = fs.statSync(tempPath);
      if (stat.isDirectory()) {
        console.log(dir);
      }
    }
  } catch (e) {
    console.log('e', e);
  }
};

module.exports = {
  generateNavConfig,
};
