import path from 'path';
import fs from 'mz/fs';
import { exec } from 'mz/child_process';

export function checkInput(inputPath) {
  return new Promise((resolve, reject) => {
  
    const ext = path.extname(inputPath);

    const extensions = ['.pdf', '.pptx', '.ppt', '.odp'];

    if (extensions.includes(ext)) 
      return resolve(ext);
    else
      return reject('Input file extension must be .pptx, .ppt, .odp and .pdf'); 
  });
}

export default function pptx2pdf({ input, outputDir, filename, target, png, removePdf, libreofficeBin, convertBin }) {

  const defaultLibreoffice = process.platform === 'darwin' ?
    '/Applications/LibreOffice.app/Contents/MacOS/soffice' : 
    '/usr/bin/libreoffice';

  const libreoffice = libreofficeBin || defaultLibreoffice;

  const convert = 'convert';

  const inputPath = input || target;
  const outputFile = filename || path.basename(inputPath).replace(/\..*$/, '.pdf');
  const outputPng = outputFile.replace(/\.pdf$/, '.png');
  const outputPath = `${outputDir}/${outputFile}`;
  const cmdPdf = `${libreoffice} --headless --invisible --convert-to pdf --outdir ${outputDir} ${inputPath}`;
  const cmdPng = `${convert} -resize 1200 -density 200  ${outputPath} ${outputPath.replace(/\.pdf$/, '')}.png`;
  const cmdPdf2Png = `${convert} -resize 1200 -density 200  ${inputPath} ${outputDir}/${outputPng}`;

  return fs.access(inputPath)
    .then(() => checkInput(inputPath))
    .then(ext => {

      if (ext === '.pdf') 
        return exec(cmdPdf2Png);

      return exec(cmdPdf)
        .then(() => {
          if (!png) {
            return fs.access(outputPath);
          } else {
            return exec(cmdPng).then(() => {
              if (removePdf) fs.unlink(outputPath);
            });
          }
        });

    });
}