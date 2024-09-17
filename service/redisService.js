var serviceConfig = require("../config/index");
const axios = require("axios");

exports.verifyApiRateLimit = async body => {
  return new Promise(async (resolve, reject) => {
    try {
      let options = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          api_key: serviceConfig.apikey.internal
        }
      };
      let resData = await axios.post(
        config.APP_BASE_URL +
          ":" +
          config.APP_PORT +
          "/cache/verify-rate-limit",
        body,
        options
      );
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
