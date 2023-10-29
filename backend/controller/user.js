const userModel = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// createuser api
const createUser=async (req,res)=>{
    try {
        const {firstName,lastName,email,password} = req.body;
        const hashPassword = await bcrypt.hash(password,10); //converting password to hash
        //creating new instance of usermodel to save data 
        const user = new userModel({
            firstName,
            lastName,
            email,
            password:hashPassword
        })
        await user.save();  //save the above user instance
        res.status(201).json(user);  
    } catch (error) {
        res.status(500).json({error:error.message});  //convert error message
    }
}

//get api

const getAllUser = async(req,res)=>{
    try {
        const user = await userModel.find({});
       
        res.status(200).json(user);     
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

//delete api
const deleteUser = async(req,res)=>{
    try {
        const user = req.params.id;
        const del=await userModel.findByIdAndDelete(user);
        res.status(200).json('user deleted successfully');
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}
//update api
const updateUser = async(req,res)=>{
    try {
        const user = await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json('user updated successfully');
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}
//get single data by querry
const getDataByQuerry = async(req,res)=>{
    try {
        const user = await userModel.findOne({email:req.query.email});
        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}
//get single data and update by params
const getAndUpdateByParams = async(req,res)=>{
    try {
        const user = await userModel.findOneAndUpdate({name:req.params.name},req.body,{new:true});
        
        res.status(200).json("Updation successfull")
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
//login system apis
const loginSystem = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(user && (await bcrypt.compare(password,user.password))){
            const token = jwt.sign({userId:user.id},"LDUyfHQNq5qggRxsLjrutYqVkBxj6nXv",{expiresIn:"1 hr"})
        res.status(200).json({token});      
        }
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
//
module.exports = {
    createUser,
    getAllUser,
    deleteUser,
    updateUser,
    getDataByQuerry,
    getAndUpdateByParams,
    loginSystem
};  //destructuring the object of createUser
