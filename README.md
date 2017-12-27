# pptx2pdf

Converts `pptx` (*.pptx, *.ppt, *.odp) to `pdf` and/or `png` OR converts `pdf` to `png`.

```
# install globally to use on the command-line
npm install -g pptx2pdf

# install locally to use a library
npm install --save pptx2pdf

```

## Dependencies

`pptx2pdf` requires [libreoffice](https://www.libreoffice.org/) and [imagemagick](https://www.imagemagick.org/script/index.php) and might require [ghostscript](https://www.ghostscript.com/). 

ubuntu/debian

```
sudo apt install libreoffice
sudo apt install imagemagick
sudo apt install ghostscript # was NOT required
```

macos

```
brew cask install libreoffice
brew install imagemagick
brew install ghostscript # WAS required
```

## using the command-line

```
$ pptx2png --help

pptx2png [options] [input-file]

Options:
  --input, -i            input file
  --output-dir, -o       where your file will be placed           [default: "."]
  --filename, -f         override output filename
  --libreoffice-bin, -l  override the libreoffice path
  --png, -p              output png instead           [boolean] [default: false]
  --remove-pdf, -r       delete pdf file when outputting png
                                                      [boolean] [default: false]
  --help                 Show help                                     [boolean]
  --version              Show version number                           [boolean]
 
# convert to pdf 
pptx2pdf input.pptx

# convert to png 
pptx2pdf input.pptx --png

# convert pdf to png
pptx2pdf input.pdf
```

#### Inspiration

I needed convert PowerPoint into pdf or pdf. I found the following projects:

- [node-ppt2pdf](https://github.com/fitraditya/node-ppt2pdf) (not on **npm**)
- [ppt2png](https://github.com/tzwm/ppt2png) ([npm](https://www.npmjs.com/package/ppt2png))

Both require unoconv and LibreOffice (or OpenOffice) however it didn't work with the latest version of Libreoffice. I assume it was because of a older version of unoconv/libreoffice. However, the latest version of libreoffice can convert to pdf on the command-line, please see below.

```
libreoffice --headless \
--invisible \
--convert-to pdf \
--outdir <outputDir> \
inputPath
```
