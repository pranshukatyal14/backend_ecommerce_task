"use strict";

const db = require("../models");
const moment = require("moment");
const { sequelize } = require("../models");
const { QueryTypes } = require("sequelize");

const User = db.user;
const Products = db.products;

const repository = () => {
    const getUser = condition => {
        return new Promise(async (resolve, reject) => {
            try {
                let check = await User.findOne(condition);
                resolve(check);
            } catch (error) {
                console.log(error);
                reject(new Error(error));
            }
        });
    };

    const getAllUsers = (condition, countStatus = false) => {
        return new Promise(async (resolve, reject) => {
            try {
                           
                let check = await User.findAll(condition);
                
                resolve(check);
            } catch (error) {
                console.log(error);
                reject(new Error(error));
            }
        });
    };

    const updateUser = (data, condition) => {
        return new Promise(async (resolve, reject) => {
            try {
                let updateData = await User.update(data, condition);
                resolve(updateData);
            } catch (error) {
                console.log(error);
                reject(new Error(error));
            }
        });
    };

    

    const createUser = condition => {
        return new Promise(async (resolve, reject) => {
            try {
                let check = await User.create(condition);
                resolve(check);
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    };
    const getProduct = condition => {
        return new Promise(async (resolve, reject) => {
            try {
                let check = await Products.findOne(condition);
                resolve(check);
            } catch (error) {
                console.log(error);
                reject(new Error(error));
            }
        });
    };

    const getAllProducts = (condition) => {
        return new Promise(async (resolve, reject) => {
            try {
                           
                let check = await Products.findAll(condition);
                
                resolve(check);
            } catch (error) {
                console.log(error);
                reject(new Error(error));
            }
        });
    };

    const updateProducts = (data, condition) => {
        return new Promise(async (resolve, reject) => {
            try {
                let updateData = await Products.update(data, condition);
                resolve(updateData);
            } catch (error) {
                console.log(error);
                reject(new Error(error));
            }
        });
    };

    

    const createProduct = condition => {
        return new Promise(async (resolve, reject) => {
            try {
                let check = await Products.create(condition);
                resolve(check);
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    };

   
    return {
        getUser,
        getAllUsers,
        updateUser,
        createUser,
        getProduct,
        getAllProducts,
        updateProducts,
        createProduct

      
    };
};

const connect = () => {
    return new Promise((resolve, reject) => {
        try {
            db.sequelize;
            console.log("Connection has been established successfully.");
            resolve(repository());
        } catch (error) {
            console.error("Unable to connect to the database:", error);
            reject("error connecting: " + error.stack);
        }
    });
};

const disConnect = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.sequelize.close();
            console.log("Connection has been closed successfully.");
            resolve(true);
        } catch (error) {
            console.error("Unable to close connection to the database:", error);
            reject(false);
        }
    });
};

module.exports = Object.assign({}, { connect, disConnect });
