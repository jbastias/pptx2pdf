import path from 'path';
import fs from 'mz/fs';
import { exec } from 'mz/child_process';

export default function pptx2pdf({ input, outputDir, filename, target, png, removePdf, libreofficeBin, convertBin }) {

  const defaultLibreoffice = process.platform === 'darwin' ?
    '/Applications/LibreOffice.app/Contents/MacOS/soffice' : 
    '/usr/bin/libreoffice';

  const libreoffice = libreofficeBin || defaultLibreoffice;

  const convert = 'convert';

  const inputPath = input || target;
  const outputFile = filename || path.basename(inputPath).replace(/\..*$/, '.pdf');
  const outputPath = `${outputDir}/${outputFile}`;
  const cmdPdf = `${libreoffice} --headless --invisible --convert-to pdf --outdir ${outputDir} ${inputPath}`;
  const cmdPng = `${convert} -resize 1200 -density 200  ${outputPath} ${outputPath.replace(/\.pdf$/, '')}.png`;

  return fs.access(inputPath)
    .then(() =>  exec(cmdPdf))
    .then(() => {
      if (!png) {
        return fs.access(outputPath);
      } else {
        return exec(cmdPng).then(() => {
          if (removePdf) fs.unlink(outputPath);
        });
      }
    });

}