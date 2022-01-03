/*
 * @Author: naman jain(namanj975@gmail.com) 
 * @Date: 2021-12-29 20:37:55 
 * @Last Modified by: naman jain(namanj975@gmail.com)
 * @Last Modified time: 2021-12-30 21:58:06
 */
import express from "express"
import listUsers from './listUsers';
import countUsers from './countUsers';
import userLogin from './userLogin';
import bodyParser from 'body-parser';
import verifyToken from './auth'
import dotenv from 'dotenv';

let jsonParser = bodyParser.json()
let router = express.Router();
dotenv.config();

console.log("process env", process.env.PORT);
router.use(function timeLog(req, res, next) {
    console.log("hello from app routes");
    console.log('Time: ', Date.now());
    next()
})

router.get('/users', verifyToken,function (req, res) {
    listUsers(req, res);
})

router.get('/users/role/count',verifyToken, function (req, res) {
    countUsers(req,res);
})

router.post('/login',jsonParser, function (req, res) {
    console.log("here request",req.body);
    userLogin(req,res);
})

export default router