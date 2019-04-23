/* eslint-disable linebreak-style */
// eslint-disable-next-line no-unused-vars
const path = require('path');

const mimeTypes = {
  'css': 'text/css',
  'git': 'image/git',
  'html': 'text/html',
  'ico': 'image/x-icon',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'js': 'text/javascript',
  'json': 'application/json',
  'pdf': 'application/pdf',
  'png': 'image/png',
  'svg': 'image/svg+xml',
  'swf': 'application/x-shockwave-flash',
  'tiff': 'image/tiff',
  'txt': 'text/plain',
  'wav': 'audio/x-wav',
  'wma': 'audio/x-ms/wma',
  'xmv': 'video/x-ms-wmv',
  'xml': 'text/xml'
};

// 设置responseHeader中的ContentType
module.exports = (filePath) => {
  let ext = path.extname(filePath).split('.').pop().toLowerCase(); // jquery.min.js取最后一部分作为扩展名
  if (!ext) {
    ext = filePath;
  }
  return mimeTypes[ext] || mimeTypes['txt'];
};
