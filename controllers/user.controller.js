
const { jwt_secret } = require("../config");
const Api400Error = require("../utils/errorBase/api400Error");
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res,next) => {
    try {
        let repo = req.repo;
        const { username, password, role } = req.body;
        let values={
            username:username,
            password:password,
            role:role || "user"
        }
        await repo.createUser(values);
       
        res.status(200).send({
            success: true,
           
            message: "user created successfully",
        });
    } catch (e) {
        next(e)
    }
};


exports.signIn = async (req, res,next) => {
    try {
        let repo = req.repo;
        const { username, password } = req.body;
        let condition={
            raw:true,
            attributes:["id","username","password"],
            where:{
                username:username,
                status:"1"
            },
            
        }
        let user=await repo.getUser(condition)
        if(!user|| password!=user.password){
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, jwt_secret, { expiresIn: '1h' });
        res.json({ message: 'Sign in successful', token });

        res.status(200).send({
            success: true,
            token: token,
            message: "Sign in successful",
        });
    } catch (e) {
      next(e)
    }
};

exports.getUsers = async (req, res,next) => {
    try {
        let repo = req.repo;
        let condition={
            raw:true,
            attributes:["id","username","role"],
            where:{
                status:"1"
            },
            
        }
        let allUsers=await repo.getAllUsers(condition);      
        res.status(200).send({
            success: true,
            data: allUsers,
            message: "all User data.",
        });
    } catch (e) {
        next(e)
    }
};

exports.deleteUser = async (req, res,next) => {
    try {
        let repo = req.repo;
        const { id } = req.params;
        let updateCond={
            where:{
                id:id
            }
        }
        let updateValues={
            status:"0"
        }
        await repo.updateUser(updateValues,updateCond)
        res.status(200).send({
            success: true,
            message: "user deleted successfully",
        });
    } catch (e) {
        next(e)
    }
};

exports.updateUser = async (req, res) => {
    try {
        let repo = req.repo;
        const { id } = req.params;
        const { username, role } = req.body;  
        let updateCond={
            where:{
                id:id
            }
        }
        let updateValues={
            username:username,
            role:role
        }
        await repo.updateUser(updateValues,updateCond)    

        res.status(200).send({
            success: true,
            data: constantData,
            message: "user updated successfully",
        });
    } catch (e) {
        res.status(400).send({
            success: false,
            message: "Operation Failed.",
            error: e,
        });
    }
};

exports.getProducts = async (req, res,next) => {
    try {
        let repo = req.repo;
        let condition={
            raw:true,
            attributes:["id","name","price","description"],
            where:{
                isDisplayed:"1",
                status:"1"
            },
            
        }

        let allProducts=await repo.getAllProducts(condition);

        res.status(200).send({
            success: true,
            data: allProducts,
            message: "all Products data",
        });
    } catch (e) {
        next(e)
    }
};

exports.addProducts = async (req, res,next) => {
    try {
        let repo = req.repo;
        const { name, price, description } = req.body;
        let values={
            name:name,
            price:price,
            description:description
        }
        await repo.createProduct(condition);
      
        res.status(200).send({
            success: true,
            message: "product created successfully",
        });
    } catch (e) {
       next(e)
    }
};



exports.updateProducts = async (req, res,next) => {
    try {
        let repo = req.repo;
        const { id } = req.params;
        const { name, price, description, isDisplayed } = req.body; 
        
        let updateCond={
            where:{
                id:id
            }
        }
        let updateValues={
            name:name,
            price:price,
            description:description,
            isDisplayed:isDisplayed
        }
        await repo.updateProducts(updateValues,updateCond)

        res.status(200).send({
            success: true,
            message: "product updated successfully",
        });
    } catch (e) {
       next(e);
    }
};



exports.deleteProducts = async (req, res,next) => {
    try {
        let repo = req.repo;
        const { id } = req.params;
        let updateCond={
            where:{
                id:id
            }
        }
        let updateValues={
          status:"0"
        }
        await repo.updateProducts(updateValues,updateCond)

        res.status(200).send({
            success: true,
            data: constantData,
            message:"product deleted successfully",
        });
    } catch (e) {
      next(e)
    }
};
