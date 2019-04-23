const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
// 渲染模板文件
const Handlebars = require('handlebars');
// const config = require('../config/defaultConfig.js');
const mime = require('../helper/mime');
const compress = require('../helper/compress');
const range = require('./range');
const isFresh = require('./cache');

// eslint-disable-next-line no-undef
const tplPath = path.join(__dirname, '../template/dir.tpl');
// fs读文件默认读出来的是buffer，可在第二个参数声明 utf-8强制转成string。 读buffer速度会快一点
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());
module.exports = async function (req, res, filePath, config) {
  try {
    const stats = await stat(filePath);
    if (stats.isFile()) {
      const contentType = mime(filePath);
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      // 通过流的形式读取文件内容，吐出给客户端  在高并发下可以表现的更好
      if (isFresh(stats, req, res)) {
        console.log('fresh');
        res.statusCode = 304;
        res.end();
        return;
      }
      let rs;
      const {
        code,
        start,
        end
      } = range(stats.size, req, res);
      if (code === 200) {
        rs = fs.createReadStream(filePath);
      } else {
        rs = fs.createReadStream(filePath, {
          start,
          end
        });
      }

      if (filePath.match(config.compress)) {
        rs = compress(rs, req, res);
      }
      rs.pipe(res);
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath);
      res.statusCode = 200;
      const dir = path.relative(config.root, filePath);
      res.setHeader('Content-Type', 'text/html');
      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '',
        // array.map() 回调函数   方法返回一个新数组，新数组中的元素为原始数组中的元素调用函数处理后的值。
        files: files.map(file => {
          return {
            file,
            icon: mime(file)
          };
        })
      };
      res.end(template(data));
    }
  } catch (ex) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`${filePath} is not a directory or file\n ${ex.toString()}`);
    return;
  }
};
