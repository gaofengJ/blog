const fs = require('fs');
const path = require('path');

const EXCLUDED_FOLDERS = ['public'];
const INCLUDE_FILE_TYPE = ['md'];
const targetPath = path.join(__dirname, '../docs/src');
// 输出文件地址
const outputPath = path.join(targetPath, 'sidebar-config.mts');

/**
 * 获取文件名后缀
 */
const getFileExtension = (fileName) => {
  const match = fileName.match(/\.([^.]+)$/);
  if (match) {
    return match[1];
  }
  return ''; // 如果没有匹配到点，返回空字符串或其他默认值
};

/**
 * 获取md中title属性
 */
const getTitleOfMarkdown = (file) => {
  try {
    const data = fs.readFileSync(file, 'utf8');
    // 使用正则表达式匹配title的值
    const titleMatch = data.match(/title:\s*(.*)/);
    return titleMatch[1] || '';
  } catch (e) {
    console.log('e', e);
  }
};

/**
 * 写文件
 */
const writeFile = async (config) => {
  let str = JSON.stringify(config, null, 2);
  str = str.replace(/"/g, "'");
  await fs.writeFileSync(outputPath, `export default ${str}`);
};

/**
 * 获取存放源md文件的目录
 */
const getDirsPath = () => {
  try {
    const ret = [];
    const dirs = fs.readdirSync(targetPath);
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      if (EXCLUDED_FOLDERS.includes(dir)) continue;
      const tempPath = path.join(targetPath, dir);
      const stat = fs.statSync(tempPath);
      if (stat.isDirectory()) {
        ret.push(tempPath);
      }
    }
    return ret;
  } catch (e) {
    console.log('e', e);
  }
};

/**
 * 生成sidebar config
 */
const getSideBarConfig = (dirs) => {
  const regex = /\/([^/]+)$/; // 匹配最后一个斜杠后面的内容
  const config = {};
  for (let i = 0; i < dirs.length; i++) { // 遍历一级路径
    const dir = dirs[i];
    const lastPathOfFistLevel = dir.match(regex)[1]; // 获取最后一级路径作为key
    const configValue = [];
    const secondLevelDirs = fs.readdirSync(dir);
    for (let j = 0; j < secondLevelDirs.length; j++) { // 遍历二级路径
      const secondLevelDir = secondLevelDirs[j];
      const secondLevelDirPath = path.join(dir, secondLevelDir);
      const secondLevelDirstat = fs.statSync(secondLevelDirPath);
      if (secondLevelDirstat.isDirectory()) {
        const configValueItem = {
          text: '',
          // collapsed: true,
          items: [],
        };
        const indexPath = `${secondLevelDirPath}/index.md`;
        const titleOfMd = getTitleOfMarkdown(indexPath);
        configValueItem.text = titleOfMd;
        const files = fs.readdirSync(secondLevelDirPath);
        for (let k = 0; k < files.length; k++) { // 遍历文件
          const file = files[k];
          const filePath = path.join(secondLevelDirPath, file);
          const fileStat = fs.statSync(filePath);
          const fileSuffix = getFileExtension(filePath);
          if (fileStat.isFile() && INCLUDE_FILE_TYPE.includes(fileSuffix) && file !== 'index.md') {
            const fileTitleOfMd = getTitleOfMarkdown(filePath);
            configValueItem.items.push({
              text: fileTitleOfMd,
              link: `/${lastPathOfFistLevel}/${secondLevelDir}/${file}`,
            });
          }
        }
        configValue.push(configValueItem);
      }
    }
    config[`/${lastPathOfFistLevel}/`] = configValue;
  }
  return config;
};

const generateSideBarConfig = () => {
  const dirs = getDirsPath();
  const sidebarConfig = getSideBarConfig(dirs);
  writeFile(sidebarConfig);
  console.info('sidebar-config生成成功！');
};

module.exports = generateSideBarConfig;
