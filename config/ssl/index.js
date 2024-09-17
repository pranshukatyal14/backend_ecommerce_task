const fs = require("fs");

module.exports = {
    key: fs.readFileSync(`public/ssl/server.key`),
    cert: fs.readFileSync(`public/ssl/server.crt`),
};
