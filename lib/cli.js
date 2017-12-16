'use strict';

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _pptx2pdf = require('./pptx2pdf');

var _pptx2pdf2 = _interopRequireDefault(_pptx2pdf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var argv = require('yargs').usage('$0 [options] [input-file]').option('input', {
  alias: 'i',
  describe: 'input file'
}).option('output-dir', {
  alias: 'o',
  describe: 'where your file will be placed',
  default: '.'
}).option('filename', {
  alias: 'f',
  describe: 'override output filename'
}).option('libreoffice-path', {
  alias: 'l',
  describe: 'override the libreoffice path'
}).help().version().argv;

if (!(argv.input || argv._)) {
  console.log('You must provide an input file');
}

(0, _pptx2pdf2.default)({
  input: argv.input,
  outputDir: argv.outputDir,
  filename: argv.filename,
  target: argv._[0]
}).catch(function (err) {
  console.log(err);
  process.exit(1);
});