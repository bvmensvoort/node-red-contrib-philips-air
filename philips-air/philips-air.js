const GET_STATUS_COMMAND = "getStatus";
const GET_WIFI_COMMAND = "getWifi";
const GET_FIRMWARE_COMMAND = "getFirmware";
const GET_FILTERS_COMMAND = "getFilters";

module.exports = function (RED) {
    const philipsAirLib = require("philips-air");
    
    RED.nodes.registerType("philips-air", PhilipsAirNode, {});
    return;


    function PhilipsAirNode(config) {
        let node = this;
        RED.nodes.createNode(node, config);

        // Initialize API
        let paLib = philipsAirLib[config.protocol +"Client"];
        paLib = new paLib(config.ipAddress);

        // Handle commands
        this.on('input', onInput);
        return;

        function onInput(msg) {
            let promise;
            if (msg.payload === GET_STATUS_COMMAND) { promise = paLib.getStatus(); }
            else if (msg.payload === GET_WIFI_COMMAND) { promise = paLib.getWifi(); }
            else if (msg.payload === GET_FIRMWARE_COMMAND) { promise = paLib.getFirmware(); }
            else if (msg.payload === GET_FILTERS_COMMAND) { promise = paLib.getFilters(); }
            else if (typeof msg.payload === "object") { promise = paLib.setValues(msg.payload); }
            else { promise = Promise.reject(RED._("philips-air.error-incorrect-command")); }
            
            node.status({fill: "blue", shape: "dot", text: RED._("philips-air.processing")});
            promise.then((result) => {
                    msg.payload = result;
                    node.send(msg);
                    node.status({});
                })
                .catch((result) => {
                    msg.payload = result;
                    node.error(msg);
                    node.status({fill: "red", shape: "dot", text: RED._("philips-air.error-philips-air") });
                })
            ;
        }
    }
}