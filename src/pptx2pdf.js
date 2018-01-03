import path from 'path';
import fs from 'mz/fs';
import { exec, spawn } from 'mz/child_process';
import createDebug from 'debug';

const debug = createDebug('PPTX2PDF');

export function checkInput(inputPath) {
  debug(`checkInput(inputPath=${inputPath})`);
  return new Promise((resolve, reject) => {
    const ext = path.extname(inputPath.toLowerCase());
    const extensions = ['.pdf', '.pptx', '.ppt', '.odp'];
    if (extensions.includes(ext)) 
      return resolve(ext);
    else
      return reject('Input file extension must be .pptx, .ppt, .odp and .pdf'); 
  });
}

export function parseCommand(cmd) {
  debug(`parseCommand(cmd=${cmd})`);
  const _args = cmd.split(' ');
  const _cmd = _args.shift();
  return { _cmd, _args };
}

export function run(cmd, dir = '.') {
  debug(`run(cmd=${cmd})`);

  return new Promise((resolve, reject) => {
    const { _cmd, _args } = parseCommand(cmd);

    debug(`_cmd: ${_cmd}, _args: ${JSON.stringify(_args)}`);
  
    const logStream = fs.createWriteStream(`${dir}/pptx2pdf.log`, { flags: 'a' });
  
    const proc = spawn(_cmd, _args, { detached: false });
  
    logStream.write(`pid: ${proc.pid}\n`, 'utf8');
  
    proc.on('error', function (err) {
      debug(`child process got an error: ${err}`);
      logStream.write(`child process got an error: ${err}`, 'utf8');
      reject(err);
    })
    .on('close', (code) => {
      const status = code === 0 ? 'SUCCESS' : 'ERROR';
      debug(`child process exited with code: ${code} and status: ${status}`);
      logStream.end(`status: ${status}\n`, 'utf8');
      resolve(code);
    })
    .stdout.on('data', (data) => {
      logStream.write(data, 'utf8');
    });
  
  });

}

export default function pptx2pdf({ input, outputDir, filename, target, png, removePdf, libreofficeBin, convertBin, logDir }) {

  debug(`pptx2pdf({ input, outputDir, filename, target, png, removePdf, libreofficeBin, convertBin, logDir })`);

  const defaultLibreoffice = process.platform === 'darwin' ?
    '/Applications/LibreOffice.app/Contents/MacOS/soffice' : 
    '/usr/bin/libreoffice';

  const libreoffice = libreofficeBin || defaultLibreoffice;

  const convert = 'convert';

  const inputPath = input || target;
  const baseFilename = path.basename(inputPath);
  const ext = baseFilename.split('.').pop();
  const outputFile = filename || baseFilename.replace(new RegExp(`.${ext}$`), '.pdf');
  const outputPng = outputFile.replace(/\.pdf$/, '.png');
  const outputPath = `${outputDir}/${outputFile}`;
  const cmdPdf = `${libreoffice} --headless --invisible --convert-to pdf --outdir ${outputDir} ${inputPath}`;
  // const cmdPng = `${convert} -limit memory 0 -limit map 0 -resize 1200 -density 200 ${outputPath} ${outputPath.replace(/\.pdf$/, '')}.png`;
  const cmdPng = `${convert} -resize 1200 -density 200 ${outputPath} ${outputPath.replace(/\.pdf$/, '')}.png`;
  // const cmdPdf2Png = `${convert} -limit memory 0 -limit map 0 -resize 1200 -density 200 ${inputPath} ${outputDir}/${outputPng}`;
  const cmdPdf2Png = `${convert} -resize 1200 -density 200 ${inputPath} ${outputDir}/${outputPng}`;

  return fs.access(inputPath)
    .then(() => checkInput(inputPath))
    .then(ext => {

      if (ext === '.pdf') 
        return run(cmdPdf2Png);

      return run(cmdPdf)
        .then(() => {
          if (!png) {
            return fs.access(outputPath);
          } else {
            return run(cmdPng).then(() => {
              if (removePdf) fs.unlink(outputPath);
            });
          }
        });

    });
}