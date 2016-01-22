'use strict';

var system  = require('system');
var webpage = require('webpage');
var fs      = require('fs');


var configFile,
    configPath,
    currentActionCounter,
    scriptArguments,
    totalActionsCounter;

function takeAScreenshot(address, output, size, zoom, timer) {
    var page = webpage.create();

    totalActionsCounter++;

    console.log('started ' + output + ' screenshot');

    page.viewportSize = { width: size.width, height: size.height };
    page.zoomFactor   = zoom;

    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('Error: Unable to load the address ' + address);
            return false;
        } else {
            window.setTimeout(function () {
                page.render(output);
                console.log('finished ' + output + ' screenshot');
                setTimeout(function() {
                    page.close();
                    currentActionCounter++;
                    if (currentActionCounter === totalActionsCounter) {
                        phantom.exit();
                    }
                }, 1);
                return true;
            }, timer);
        }
    });
}

function launchScreenshotsSeries(conf) {
    var currentDevice,
        currentView,
        fullUrl,
        outputFolder,
        outputPath,
        size,
        zoom;

    var baseFolder = conf.baseFolder;
    var baseUrl    = conf.baseUrl;
    var devices    = conf.devices;
    var viewsList  = conf.viewsList;
    var timer      = conf.pageLoadingTimer;

    totalActionsCounter = 0;
    currentActionCounter = 0;

    for (var i = devices.length - 1; i >= 0; i--) {
        currentDevice = devices[i];
        size          = currentDevice.size;
        zoom          = currentDevice.pixelDensity;
        outputFolder  = baseFolder + '/' + currentDevice.name;

        for (var j = viewsList.length - 1; j >= 0; j--) {
            currentView = viewsList[j];
            outputPath  = outputFolder + '/' + currentView.name + '.png';
            fullUrl     = baseUrl + currentView.url;
            takeAScreenshot(fullUrl, outputPath, size, zoom, timer);
        }
    }

    return true;
}

scriptArguments = system.args;


if (scriptArguments.length !== 2) {
    console.log('Usage: screenshots.js path-to-config-file');
    phantom.exit();
} else {

    // system.args contains the current script file name so we get directly the second argument
    configPath = scriptArguments[1];

    if (!fs.exists(configPath)) {
        console.log('Error: couldn\'t find config file at ' + configPath);
    } else {
        configFile = JSON.parse(fs.read(configPath));
        launchScreenshotsSeries(configFile);
    }

}