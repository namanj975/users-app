/*
 * @Author: naman jain(namanj975@gmail.com) 
 * @Date: 2021-12-30 12:57:11 
 * @Last Modified by: naman jain(namanj975@gmail.com)
 * @Last Modified time: 2021-12-30 21:14:27
 */
import User from '../db/schema/users';
import Role from '../db/schema/role';
import {decryptMessage } from '../encryptDecrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import configuration from '../appConfig';


/**
 * @param  {} user
 * @param  '' password
 * @description  This method is used for validating the user on the basis of password provided in the payload.
 * @programmers: Naman <namanj975@gmail.com> 
 */
const validateUser = (user,password) => new Promise((resolve,reject) => {
    let decryptedPassword = decryptMessage(user.password);
    console.log("decrypted PP",decryptedPassword);
    if(decryptedPassword === password){
        resolve(true);
    }else{
        resolve(false);
    }
})

/** @param '' username 
 * @description  This method is used for generating the distinct jwt token to be passed to the admin and superAdmin.
 * @programmers: Naman <namanj975@gmail.com> 
 */
 const generatejwtToken = (username) => new Promise((resolve,reject) => {
    resolve(jwt.sign(username, process.env.JWT_SECRET_KEY))
})


/**
 * @param  {} req
 * @param  {} res
 * @description  This method is used for performing operations of user login implementation.
 * @programmers: Naman <namanj975@gmail.com> 
 */
const userLogin = async (req,res) =>{
    try {
        // let Adminroles = await Role.find({name:{$in : ["admin", "superAdmin"]}}).select("role_id");
        if (req.body && req.body.email && req.body.password) {
            let requiredUser= await User.findOne({ email : req.body.email }).select("email role_id password is_active first_name");
            console.log("required user",requiredUser);
            if(requiredUser){
                if(!requiredUser.is_active) return res.status(401).send('This user is not active');
                let validationResult = await validateUser(requiredUser,req.body.password);
                if(validationResult){
                    let userRole = await Role.findOne({role_id : mongoose.Types.ObjectId(requiredUser.role_id)}).select("name");
                    if(userRole.name == "student") return res.json({ success: true, data: "User login is successfull" });
                    else {
                        console.log("going to generate the jwt toket");
                        let jwtToken = await generatejwtToken(requiredUser.first_name);
                        return res.json({ success: true, data: {result : "User login is successfull",token:jwtToken } });
                    }
                }
                else return res.status(401).send('Kindly provide correct credentials!!');
            }else{
                return res.status(404).send('No user found !!');
            }
        }else{
            return res.status(400).send('Mising Parameters');
        }
    }catch (err){
        res.sendStatus(403);
        console.log("getting error while processing the user login",err);
    }
}

export default userLogin;