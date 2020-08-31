const GET_STATUS_COMMAND = "status";
const GET_WIFI_COMMAND = "wifi";
const GET_FIRMWARE_COMMAND = "firmware";
const GET_FILTERS_COMMAND = "filters";
const SET_VALUES_COMMAND = "set";

module.exports = function (RED) {
    const philipsAirLib = require("philips-air");
    
    RED.nodes.registerType("philips-air", PhilipsAirNode, {});
    return;


    function PhilipsAirNode(config) {
        let node = this;
        let nodeConfig = config;
        RED.nodes.createNode(node, config);

        // Initialize API
        let paLib = philipsAirLib[config.protocol +"Client"];
        paLib = new paLib(config.ipAddress);

        // Handle commands
        this.on('input', onInput);
        return;

        function onInput(msg) {
            let result;
            if (msg.payload.command === SET_VALUES_COMMAND) { result = setValues(msg.payload.values); }
            else if (msg.payload.command === GET_STATUS_COMMAND) { result = getStatus(); }
            else if (msg.payload.command === GET_WIFI_COMMAND) { result = getStatus(); }
            else if (msg.payload.command === GET_FIRMWARE_COMMAND) { result = getFirmware(); }
            else if (msg.payload.command === GET_FILTERS_COMMAND) { result = getFilters(); }
            node.send(result);
        }

        function setValues(valueObject) {
            if (!valueObject) {
                node.error(RED._("philips-air.error-setvalues-notset"));
            } else if (typeof valueObject !== "object") {
                node.error(RED._("philips-air.error-setvalues-incorrect"));
            };

            return paLib.setValues(valueObject);
        }
    }
}