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
  .option('libreoffice-path', {
    alias: 'l',
    describe: 'override the libreoffice path'
  })
  .help()
  .version().argv;

if (!(argv.input || argv._)) {
  console.log(`You must provide an input file`);
}

pptx2pdf({ 
  input: argv.input, 
  outputDir: argv.outputDir, 
  filename: argv.filename,
  target: argv._[0]
})
.catch(err => {
  console.log(err);
  process.exit(1);
})
;