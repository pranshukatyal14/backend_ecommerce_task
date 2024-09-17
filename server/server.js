"use strict";

const spdy = require("spdy-fixes");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const fs = require("fs");
const { returnError, notFoud } = require("../utils/errorBase/errorHandler");

const UserAPI = require("../api/user.js");


const start = options => {
    return new Promise((resolve, reject) => {
        if (!options.repo) {
            reject(new Error("The server must be started with a connected repository"));
        }
        if (!options.port) {
            reject(new Error("The server must be started with an available port"));
        }
        const app = express();
        app.use((req, res, next) => {
            const transaction = apm.startTransaction(`${req.method} ${req.path}`, "request");
            if (transaction) {
                const originalEnd = res.end.bind(res);
                res.end = function(chunk, encoding, callback) {
                    transaction.end();
                    res.end = originalEnd;
                    return res.end(chunk, encoding, callback);
                };
            }
            next();
        });
        app.use(morgan("dev"));
        app.use(helmet());
        app.use(cors());
        app.use((err, req, res, next) => {
            reject(new Error("Something went wrong! Error:" + err));
            res.status(500).send("Something went wrong!");
        });
        // Add middleware to handle post requests
        app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
        app.use(bodyParser.json({ limit: "50mb" }));
        app.get("/", (req, res, next) => {
            res.status(200).json("ok");
        });
        app.use((err, req, res, next) => {
            reject(new Error("Something went wrong! Error:" + err));
            res.status(400).send("Service Invalid Request!!!");
        });
        UserAPI(app, options);
       
       
        if (options.isSelf) {
            app.listen(options.port, () => {
                console.log("Server started succesfully. Running on port: " + options.port);
            });
        } else {
            const server = spdy.createServer(options.ssl, app).listen(options.port, () => resolve(server));
        }
        resolve(app);
    });
};

process.on("uncaughtException", err => {
    console.error("Unhandled Exception", err);
    apm.captureError(err);
    apm.endTransaction();
    apm.flush(function() {
        // process.exit(1);
    });
    // throw err;
});

process.on("uncaughtRejection", (error, promise) => {
    console.error("Unhandled Rejection", error);
    throw error;
});

module.exports = Object.assign({}, { start });
