# Autoshots
Screenshots automation for web applications with PhantomJS

## Disclaimer
If you don't have it, this application will install **PhantomJS** thanks to the usefull [phantomjs-prebuilt](https://www.npmjs.com/package/phantomjs-prebuilt) package and make it available in your path.

## How to use it
You will need to:
- run `npm install`
- update `config.json` with the settings you want
- run `npm start`

Then you will find the screenshots in `render/` + the specified output folder in config.

## Settings details
### Main settings
Parameter     | Type      | Description
--------------|-----------|------------------
baseUrl       | String    | Url where phantomJS will access the web-app. It will be completed with views url while taking screenshots
baseFolder    | String    | Folder where your screenshots will be saved. It will be completed with devices name whiletaking screenshots
pageLoadingTimer | Int (miliseconds) | Time for PhantomJS to wait between opening the page and taking the screenshot. It can be usefull if your server is slow or if you need an instanciation time. (ex: waiting for Angualr to bootstrap)
viewsList     | Array ([View](#view)) | Array containing all the views you want to shots.
devices       | Array ([Device](#device)) | Array containing all the devices you want to have screenshots for.


### View
Parameter     | Type      | Description
--------------|-----------|------------------
name          | String    | Name of the view to shots. Will be used to name the screenshot.
url           | String    | Part of the url to complete baseUrl setting.


### Device
Parameter     | Type      | Description
--------------|-----------|------------------
name          | String    | Name of the device. Will be the name of the subfolder where screenshots will be saved.
size          | Object ([Size](#size)) | Size of the device with a property width and a property height.
pixelDensity  | Int       | Pixel density of the device you want to shot. It's used to zoom the viewport in PhantomJS.


### Size
Parameter     | Type      | Description
--------------|-----------|------------------
width         | Int       | Width of the device.
height        | Int       | Height of the device.


## Available tasks
* `npm run init` will copy `example.config.json` to `config.json` (automaticaly launched at post-install)
* `npm start` or `npm run shots` will launch the screenshots automation
