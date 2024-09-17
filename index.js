"use strict";

const { EventEmitter } = require("events");

const repository = require("./repository/repository");
const server = require("./server/server");
var config = require("./config/index");
var APP_PORT = process.env.APP_PORT || config.APP_PORT;

const debug = require("debug")("connect-service-master");

console.log("----- Service - Master -----");
console.log(" + Connecting to Master repository...");

repository
    .connect()
    .then(async repo => {
        console.log(" + Repo Connected. Starting Server..");
     
        return server.start({
            port: APP_PORT,
            repo,
            isSelf: config.IS_SELF,
        });
    })
    .then(app => {
        console.log(" + Server started succesfully. Running on port: " + APP_PORT + ".");
        app.on("close", () => {
            // Handle stuff here to do on close.
            console.log(" + Shutting down..");
        });
        let pm2Deploy = process.env.PM2_DEPLOY || false;
        if (pm2Deploy) {
            process.send("ready");
            process.on("SIGINT", async function(msg) {
                console.log("Process reload ongoing message: " + msg);
                await repository.disConnect();
                process.exit(0);
            });
            process.on("message", msg => {
                if (msg == "shutdown") {
                    console.log("Closing all connections...");
                    setTimeout(() => {
                        console.log("Finished closing connections");
                        process.exit(0);
                    }, 1500);
                }
            });
          
        }
    });
