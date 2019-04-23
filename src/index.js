// 读命令行上的东西 yargs
const yargs = require('yargs');
const Server = require('./app');
const argv = yargs.usage('anywhere [options]')
  .option('p', {
    alias: 'port',
    describe: '端口号',
    defalut: 9527,
  })
  .option('h', {
    alias: 'hostname',
    describe: 'host',
    defalut: '127.0.0.1'
  })
  .option('d', {
    alias: 'root',
    describe: 'root path',
    // eslint-disable-next-line no-undef
    defalut: process.cwd()
  })
  .version().alias('v', 'version').help().argv;

const server = new Server(argv);
server.start();
