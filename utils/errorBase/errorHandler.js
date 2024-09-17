
const os = require("os");
const BaseError = require("./baseError");
const { Sequelize, BaseError: sequelizeBaseError } = require("sequelize");
const redis = require("redis");
const { modifyDateFormat, date_format, GMT_TIME_ZONE } = require("../general");

function logError(err) {
    console.log(err);
    // logger.error(err)
}

function logErrorMiddleware(err, req, res, next) {
    logError(err);
    next(err);
}

function notFoud(req, res, next) {
    next({
        message: "Route not found",
        statusCode: 404,
    });
}

function returnError(err, req, res, next) {
    if (err.code === "ECONNREFUSED") {
        err.statusCode = httpStatusCodes.UNAUTHORIZED;
        err.message = apiResponseMessage.AUTH_UNAVAILABLE;
    }
    if (err.response) {
        err.statusCode = err.response.status;
        err.message = err?.response?.data?.errors?.message;
    }

    const status = err.statusCode || 400;
    const message = err.message || "something went wrong";
 
    res.status(status || 400);
    res.json({
        errors: {
            message: message,
            ...err,
        },
    });
}

function isOperationalError(error) {
    if (error instanceof BaseError) {
        return error.isOperational;
    }
    return false;
}

function sendErrorLogs(err, req) {
    try {
        const hostname = os.hostname();
        let errorLogObj = {
            "service-name": "service-watchfaces",
            hostname: hostname,
            timestamp: modifyDateFormat(new Date(), date_format, GMT_TIME_ZONE),
            message: err.message || err,
        };
        if (req.url) {
            errorLogObj.url = req.url;
        }
        if (req.method) {
            errorLogObj.method = req.method;
        }
        if (req.body) {
            errorLogObj.body = req.body;
        }
        if (req.params) {
            errorLogObj.params = req.params;
        }
        if (req.query) {
            errorLogObj.query = req.query;
        }
        if (
            err instanceof sequelizeBaseError ||
            err instanceof redis?.ErrorReply ||
            err instanceof redis?.ConnectionTimeoutError ||
            (err.code === "ECONNABORTED" && err.message.includes("timeout"))
        ) {
            errorLogObj.errType = "critical";
            if (err instanceof sequelizeBaseError) {
                errorLogObj.source = "sequelize";
            } else if (err instanceof redis?.ErrorReply || err instanceof redis?.ConnectionTimeoutError) {
                errorLogObj.source = "redis";
            } else {
                errorLogObj.source = "service";
            }
        } else {
            errorLogObj.errType = "warning";
        }
        logger.error(errorLogObj);
    } catch (error) {
        console.log("ERROR WHILE SENDING ERROR LOGS TO APM --->", error);
    }
}

module.exports = {
    logError,
    logErrorMiddleware,
    returnError,
    isOperationalError,
    notFoud,
    sendErrorLogs,
};
