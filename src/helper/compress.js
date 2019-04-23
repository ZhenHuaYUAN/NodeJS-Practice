
const {createGzip, createDeflate} = require('zlib');

// 客户端在request的header中声明支持哪几种压缩方式.在response中设置采用哪几种压缩方式
module.exports = (rs, req, res) => {

  const acceptEncoding = req.headers['accept-encoding'];
  console.log(acceptEncoding);
  if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) {
    return rs;
  } else if (acceptEncoding.match(/\bgzip\b/)) {
    res.setHeader('Content-Encoding','gzip');
    return rs.pipe(createGzip());
  } else if (acceptEncoding.match(/\bdeflate\b/)) {
    res.setHeader('Content-Encoding','gzip');
    return rs.pipe(createDeflate());
  }
};
