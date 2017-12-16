'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pptx2pdf;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

var _child_process = require('mz/child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pptx2pdf(_ref) {
  var input = _ref.input,
      outputDir = _ref.outputDir,
      filename = _ref.filename,
      target = _ref.target;


  var libreoffice = process.platform === 'darwin' ? '/Applications/LibreOffice.app/Contents/MacOS/soffice' : '/usr/bin/libreoffice';

  var inputPath = input || target;
  var outputFile = filename || _path2.default.basename(inputPath).replace(/\..*$/, '.pdf');
  var outputPath = outputDir + '/' + outputFile;
  var cmd = libreoffice + ' --headless --invisible --convert-to pdf --outdir ' + outputDir + ' ' + inputPath;

  return _fs2.default.access(inputPath).then(function () {
    return (0, _child_process.exec)(cmd);
  }).then(function () {
    return _fs2.default.access(outputPath);
  });
}