var config = require("../config/index");
var fs = require("fs");
const Sequelize = require("sequelize");

let dialectOptions;


var sequelize = new Sequelize(config.mysql.DB, null, null, {
    dialect: config.mysql.dialect,
    operatorsAliases: 0,
    define: {
        timestamps: false,
    },
    port: config.mysql.port,
    replication: {
        read: [{ host: config.mysql.slave_host, username: config.mysql.slave_user, password: config.mysql.slave_password }],
        write: { host: config.mysql.master_host, username: config.mysql.master_user, password: config.mysql.master_password },
    },
   
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.products = require("../models/products.model.js")(sequelize, Sequelize);



module.exports = db;
