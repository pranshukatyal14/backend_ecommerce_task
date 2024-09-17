"use strict";

const { createUser, signIn, getUsers, deleteUser, updateUser, getProducts, addProducts, updateProducts, deleteProducts } = require("../controllers/user.controller");
const { authJwt, redisMiddleware } = require("../middleware");
// let { signIn,getUsers ,updateUser,deleteUser,getProducts,addProducts,updateProducts,deleteProducts,createUser} = require("../controllers/user.controller");
const { authenticateToken, isAdmin } = require("../middleware/authJwt");

module.exports = (app, options) => {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        req.repo = options.repo;
        next();
    });
    app.post("/users/signup",createUser);
    app.post("/users/signIn",signIn);

    app.get("/",authenticateToken,isAdmin,getUsers);
    app.delete("/:id",authenticateToken,isAdmin,deleteUser);
    app.update("/:id",authenticateToken,isAdmin,updateUser);


    app.get("/products",getProducts);
    app.post("/products",authenticateToken,addProducts);
    app.put("/products/:id",authenticateToken,isAdmin,updateProducts);
    app.delete("/products/:id",authenticateToken,isAdmin,deleteProducts);






 };
