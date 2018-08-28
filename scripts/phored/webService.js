let config = require('./config.js'),
    express = require('express'),
    request = require('request');

function createBasicAuthHeader() {
    if (config.rpc_pass == null || config.rpc_user == null) {
        return {};
    }
    return {
        Authorization: "Basic " + Buffer.from(config.rpc_user + ":" + config.rpc_pass).toString("base64")
    }
}

function createUri() {
    // there is some problem with requests library and options, everything will be in inside url.
    return config.phored_host + ":" + config.phored_rpc_port + config.phored_rpc_path;
}

function sendRPCCommand(response, method, params) {
    request.post(createUri(), {
            headers: createBasicAuthHeader(),
            json: {"jsonrpc": "2.0", "method": method, "params": params, "id": 1}
        },
        (err, res, body) => {
            if (err) {
                response.status(400);
            }
            else if (res && res.statusCode !== 200) {
                response.status(res.statusCode);
            }
            response.send(body);
        });
}

const AllowedMethods = new Set([
    'getbestblockhash',
    'getblock',
    'getblockchaininfo',
    'getblockcount',
    'getblockhash',
    'getblockheader',
    'getchaintips',
    'getdifficulty',
    'getmempoolinfo',
    'getrawmempool',
    'gettxout',
    'gettxoutsetinfo',
    'getinfo',
    'getmininginfo',
    'getnetworkhashps',
    'submitblock',
    'getconnectioncount',
    'ping',
    'masternodelist',
    'getrawtransaction',
    'sendrawtransaction',
    'estimatefee',
    'estimatepriority',
]);

class MethodNotAllowedError extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, MethodNotAllowedError);
    }
}

function main() {
    let app = express();
    app.use(express.json());

    // error handler
    app.use((err, req, res, next) => {
        console.log(err);
        res.sendStatus(err.statusCode).json(err);
        next();
    });

    app.post('/rpc', (req, res, next) => {
        const method = req.body.method;
        if (method === undefined) {
            let error = new Error("Method parameter is missing from body");
            error.statusCode = 400;
            return next(error, req, res);
        }

        if (!AllowedMethods.has(method.toLowerCase())) {
            let error = new MethodNotAllowedError("Forbidden to run command " + method);
            error.statusCode = 403;
            return next(error);
        }

        try {
            console.log("Sending", method, "with params:", req.body.params || "empty");
            let params = req.body.params;
            if (params === undefined) {
                params = [];
            }
            sendRPCCommand(res, method, params);
        }
        catch (e) {
            res.status(500).send(e);
        }
    });

    app.get('*', (req, res) => {
        console.log("Health check");
        try {
            sendRPCCommand(res, "ping", []);
        }
        catch (e) {
            res.status(408).send(e)
        }
    });

    app.listen(config.phored_web_port, () => {
        console.log("App is running on port", config.phored_web_port);
    });

}

main();
