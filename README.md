# node-red-contrib-philips-air
Unofficial Node-RED node for Philips Air purifiers

Based on [Philips Air npm package](https://github.com/Sunoo/philips-air#readme).


## Features
More information on https://developer.aliyun.com/mirror/npm/package/philips-air.

[Import this example flows](https://raw.githubusercontent.com/bvmensvoort/node-red-contrib-philips-air/master/examples/philips-air%20functionalities.json) to get started quickly in Node-RED.

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

### For newer 2020 devices with CoAP protocol
If your device is using the CoAP protocol, you need to install some extra Python packages.
When using Node-RED in a Docker container, you need to [install the packages inside the Docker container](https://github.com/bvmensvoort/node-red-contrib-philips-air/issues/6).


## Available node
Philips air

## Connection issues
### For errormessage: connect ECONNREFUSED
* The node can reach the IP. Otherwise the error message would have been: Host Unreachable.
* Then, make sure you access the Philips device with the Air Matters App. Maybe it is not connected to your WiFi yet.
* It could be that the protocol is not http, but CoAP. (Note: accessing the URL in the browser on a http-device results in a timeout, eg: http://192.168.194.36:80).
See [issue 5](https://github.com/bvmensvoort/node-red-contrib-philips-air/issues/5).

### For errormessage: Cannot communicate with the Philips device yet...ETIMEDOUT
See [issue 6](https://github.com/bvmensvoort/node-red-contrib-philips-air/issues/6).


## Changelog
v0.3.0 {latest)
* Make errors catchable in Node-RED 1.x

v0.1.0
* Add support for CoAP and PlainCoAP protocols
* Reset status on redeploy
* Enhance error messages
* Show Processing state before processing starts

v0.0.1
* Initial release