# node-red-contrib-philips-air
Unofficial Node-RED node for Philips Air purifiers

Based on [Philips Air npm package](https://github.com/Sunoo/philips-air#readme).


## Features
More information on https://developer.aliyun.com/mirror/npm/package/philips-air.

### Get 
* ```getStatus``` Returns an object representing the current status of the purifier.
* ```getWifi``` Returns an object representing the wifi settings of the purifier. Only supported with HTTP protocol.
* ```getFirmware``` Returns an object representing information on the firmware of the purifier.
* ```getFilters``` Returns an object representing the air filters in the purifier.

### Set
Sends values to the purifier.


## How to install
Use the pallette editor to install ```philips-air```.

Or manually by installing ```npm install node-red-contrib-philips-air```.


## Available node
Philips air


## Changelog
v0.0.1 (latest)
* Initial release