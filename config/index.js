const dotenv = require("dotenv");

let env = process.env.RUN_ENV;

    dotenv.config();

module.exports = {
    RUN_ENV: env,
    NODE_HOST: process.env.HOST || "127.0.0.1",
    APP_PORT: process.env.APP_PORT,
    SERVICE_NAME: "connect-service-master",
    IS_SELF: true,
    APP_URL: process.env.APP_URL,
   
    mysql: {
        DB: process.env.DB_NAME,
        port: process.env.DB_PORT,
        master_host: process.env.DB_MASTER_HOST,
        master_user: process.env.DB_MASTER_USER,
        master_password: process.env.DB_MASTER_PASSWORD,
        slave_host: process.env.DB_SLAVE_HOST,
        slave_user: process.env.DB_SLAVE_USER,
        slave_password: process.env.DB_SLAVE_PASSWORD,
        dialect: "mysql",
        db_conn_type: process.env.DB_CONNECTION_TYPE,
        
    },
    jwt_secret:process.env.JWT_SECRET


   
};
