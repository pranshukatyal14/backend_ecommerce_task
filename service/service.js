var serviceConfig = require("../config/index");
const axios = require("axios");

exports.verifyToken = async headers => {
    return new Promise(async (resolve, reject) => {
        try {
            let options = {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "x-access-token": headers["x-access-token"],
                },
            };
            let resData = await axios.post(serviceConfig.services.CONNECT_USERS_URL + "/connect/user/auth/verify", {}, options);
            if (resData.data.success) {
                resolve(resData.data);
            } else {
                reject(resData.data);
            }
        } catch (error) {
            reject(error);
        }
    });
};

exports.isSuperAdmin = async userId => {
    return new Promise(async (resolve, reject) => {
        try {
            let body = {
                userId: userId,
            };
            let options = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            let resData = await axios.post(serviceConfig.services.CONNECT_USERS_URL + "/connect/user/auth/issuperadmin", body, options);
            if (resData.data.success) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
};

exports.getUserContact = async userId => {
    return new Promise(async (resolve, reject) => {
        try {
            let options = {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    api_key: serviceConfig.apikey.internal,
                },
            };
            let resData = await axios.get(serviceConfig.services.CONNECT_USERS_URL + "/connect/user/contact/" + userId, options);
            if (resData.data.success) {
                resolve(resData.data);
            } else {
                reject(resData.data);
            }
        } catch (error) {
            reject(error);
        }
    });
};

exports.clickToCallTeleforce = async body => {
    return new Promise(async (resolve, reject) => {
        try {
            let options = {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    api_key: serviceConfig.apikey.internal,
                },
            };
            let resData = await axios.post(serviceConfig.services.CONNECT_MESSAGES_URL + "/connect/message/teleforce/outgoing-call", body, options);
            if (resData.data.success) {
                resolve(resData.data);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
};
