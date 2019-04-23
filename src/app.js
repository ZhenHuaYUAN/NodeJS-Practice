const http = require('http');
const chalk = require('chalk');
const path = require('path');
const conf = require('./config/defaultConfig');
const route = require('./helper/route');

class Server {
  constructor(config) {
    this.conf = Object.assign({}, conf, config);
  }
  start() {
    const server = http.createServer((req, res) => {
      // 拿到用户当前的文件夹
      const filePath = path.join(this.conf.root, req.url);
      // eslint-disable-next-line no-debugger
      debugger;
      console.log(filePath);
      route(req, res, filePath, this.conf);
    });
    // res.statusCode = 200;
    // content-type 为text/plain时是文本文件 ，text/html是网页
    // res.setHeader('Content-Type', 'text/plain');
    // res.end(filePath);

    server.listen(this.conf.port, this.conf.hostname, () => {
      const addr = `http://${this.conf.hostname}:${this.conf.port}`;
      console.info(`Server started at ${chalk.green(addr)}`);
    });

  }
}

module.exports = Server;
