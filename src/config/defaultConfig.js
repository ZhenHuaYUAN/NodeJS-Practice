module.exports = {
  // eslint-disable-next-line no-undef
  root: process.cwd(),
  hostname: '127.0.0.1',
  port: '9527',
  // 使用正则定义要进行压缩的文件,
  compress: /\.(html|js|css|md)/,
  cache:{
    // 600秒内有效
    maxAge:600,
    expires:true,
    cacheControl: true,
    lastModified:true,
    etag:true
  }
};
