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
        let protocol = config.protocol;

        // Initialize API
        let paLib = philipsAirLib[protocol +"Client"];
        paLib = new paLib(config.ipAddress);

        // Reset state on redeploy
        node.status({});

        // Handle commands
        this.on('input', onInput);
        return;

        function onInput(msg, send, done) {
            // For maximum backwards compatibility, check that send exists.
            // If this node is installed in Node-RED 0.x, it will need to
            // fallback to using `node.send`
            send = send || function() { node.send.apply(node,arguments) }

            // Already set the status, because some methods seem to be synchronous
            node.status({fill: "blue", shape: "dot", text: RED._("philips-air.processing")});
            
            // Apparently status is not set when using Python script, so get a little breathing room. 100 is needed for a status update.
            setTimeout(()=> processInput(msg, send, done), 100);
        }

        function processInput(msg, send, done) {
            let promise;
            if (msg.payload === GET_STATUS_COMMAND) { promise = paLib.getStatus(); }
            else if (msg.payload === GET_WIFI_COMMAND && protocol === "Http") promise = paLib.getWifi();
            else if (msg.payload === GET_FIRMWARE_COMMAND) { promise = paLib.getFirmware(); }
            else if (msg.payload === GET_FILTERS_COMMAND) { promise = paLib.getFilters(); }
            else if (typeof msg.payload === "object") { promise = paLib.setValues(msg.payload); }
            else { promise = Promise.reject(RED._("philips-air.error-incorrect-command-" + protocol)); }
            
            promise.then((result) => {
                    msg.payload = result;
                    node.status({});
                    send(msg);
                })
                .catch((result) => {
                    let errorMessage = addErrorSummary(result);
                    msg.payload = errorMessage;
                    node.status({fill: "red", shape: "dot", text: RED._("philips-air.error-philips-air") });

                    if (done) { done(errorMessage); }   // Node-RED 1.0 compatible
                    else { node.error(errorMessage); }  // Node-RED 0.x compatible
                })
            ;
        }

        function addErrorSummary(errorMessage) {
            if ((protocol === "Coap" || protocol === "PlainCoap") && errorMessage.message) {
                if (errorMessage.message.indexOf("ModuleNotFoundError: No module named 'pyairctrl'")>-1) {
                    errorMessage.message = RED._("philips-air.error-dependencies-not-installed") + errorMessage;
                }
                else if (errorMessage.message.indexOf("spawnSync python3 ETIMEDOUT")>-1) {
                    errorMessage.message = RED._("philips-air.error-python-timeout") + errorMessage;
                }
            }

            return errorMessage;
        }
    }
}