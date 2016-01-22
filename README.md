# Autoshots
Screenshots automation for web applications with PhantomJS

## Requirements
You need to have phantomJS 2 installed. It's not possible to load it via npm for the moment so you'll have to install it manualy.

If you are on Windows or OSX, there are installation [instructions here](http://phantomjs.org/download.html).

If you are on Linux, it depends of your distribution but there are no official binaries. You might need to [build it yourself](http://phantomjs.org/build.html).

## How to use it
You will need to:
- duplicate `example.config.json` and rename it `config.json`
- update `config.json` with the settings you want
- run `npm run shots`

Then you will find the screenshots in the specified output folder.
