import path from 'path';
import fs from 'mz/fs';
import { exec } from 'mz/child_process';

export default function pptx2pdf({ input, outputDir, filename, target }) {

  const libreoffice = process.platform === 'darwin' ?
    '/Applications/LibreOffice.app/Contents/MacOS/soffice' : 
    '/usr/bin/libreoffice';

  const inputPath = input || target;
  const outputFile = filename || path.basename(inputPath).replace(/\..*$/, '.pdf');
  const outputPath = `${outputDir}/${outputFile}`;
  const cmd = `${libreoffice} --headless --invisible --convert-to pdf --outdir ${outputDir} ${inputPath}`;

  return fs.access(inputPath)
    .then(() =>   exec(cmd))
    .then(() => fs.access(outputPath));

}