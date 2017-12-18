import yargs from 'yargs';
import pptx2pdf from './pptx2pdf';

const argv = require('yargs')
  .usage('$0 [options] [input-file]')
  .option('input', {
    alias: 'i',
    describe: 'input file'
  })
  .option('output-dir', {
    alias: 'o',
    describe: 'where your file will be placed',
    default: '.'
  })
  .option('filename', {
    alias: 'f',
    describe: 'override output filename'
  })
  .option('libreoffice-bin', {
    alias: 'l',
    describe: 'override the libreoffice path'
  })
  .option('png', {
    alias: 'p',
    describe: 'output png instead',
    default: false,
    type: 'boolean'
  })  
  .option('remove-pdf', {
    alias: 'r',
    describe: 'delete pdf file when outputting png',
    default: false,
    type: 'boolean'
  })  
  .help()
  .version().argv;

// console.log(argv);
// console.log(argv.input, argv._[0], argv.png);

if (!(argv.input || argv._[0])) {
  console.log('Error: You must provide an input file.');
  process.exit(1);
}

pptx2pdf({ 
  input: argv.input, 
  outputDir: argv.outputDir, 
  filename: argv.filename,
  target: argv._[0],
  png: argv.png,
  removePdf: argv.removePdf,
  libreofficeBin: argv.libreofficeBin
})
.catch(err => {
  console.log(err);
  process.exit(1);
})
;