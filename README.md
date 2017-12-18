# pptx2pdf

Converts `pptx` (*.pptx, *.ppt, *.odp) to `pdf` and/or `png`.

```
# install globally to use on the command-line
npm install -g pptx2pdf

# install locally to use a library
npm install --save pptx2pdf

```

## command-line

```
pptx2png 
```

#### Inspiration

I needed convert PowerPoint into pdf or pdf. I found the following projects:

- [node-ppt2pdf](https://github.com/fitraditya/node-ppt2pdf) (not on **npm**)
- [ppt2png](https://github.com/tzwm/ppt2png) ([npm](https://www.npmjs.com/package/ppt2png))

Both require unoconv and LibreOffice (or OpenOffice) however it doesn't work. I assume it was because of a older version of unoconv/libreoffice. The newest version libreoffice didn't version work in either project. However, the latest version of libreoffice can convert to pdf on the command-line.

e.g.:

```
libreoffice --headless \
--invisible \
--convert-to pdf \
--outdir <outputDir> \
inputPath
```
