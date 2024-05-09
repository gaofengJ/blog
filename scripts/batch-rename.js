const fs = require('fs');
const path = require('path');

// 定义要修改的文件夹路径
const folderPath = path.join(__dirname, '../docs/.vuepress/public/imgs/summary-primary/tools');

// 获取文件夹中所有文件的名称
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // 遍历所有文件
  files.forEach((file, index) => {
    // 构建旧文件路径和新文件路径
    const oldPath = path.join(folderPath, file);
    const newPath = path.join(folderPath, file.replace('summary_primary_tools_', ''));

    // 修改文件名
    fs.rename(oldPath, newPath, (e) => {
      if (e) {
        console.error(`Error renaming file ${oldPath}:`, e);
      } else {
        console.log(`File ${oldPath} renamed to ${newPath}`);
      }
    });
  });
});
