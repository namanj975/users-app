import mongoose from 'mongoose';
import configuration from './appConfig.js';
import {encryptMessage , decryptMessage } from './encryptDecrypt';

let ObjectId = mongoose.Types.ObjectId
global.superAdminRoleId = new ObjectId();
global.adminRoleId = new ObjectId();
global.studentRoleId = new ObjectId();
let studentPassword = encryptMessage(configuration.password.student);
let adminPassword = encryptMessage(configuration.password.admin);
let superAdminPassword = encryptMessage(configuration.password.superAdmin);



let roles = [{
    role_id: studentRoleId,
    name: 'student'
},{
    role_id: adminRoleId,
    name: 'admin', 
},{
    role_id: superAdminRoleId,
    name: 'superAdmin', 
}];

let users = {
    studentUsers : [{
        user_id : new ObjectId(),
        first_name : 'naman',
        last_name : 'jain',
        role_id : studentRoleId.toString(),
        email : 'naman.jain@biz2credit.com',
        password : studentPassword,
    },{
        user_id : new ObjectId(),
        first_name : 'vishal',
        last_name : 'pandey',
        role_id : studentRoleId.toString(),
        email : 'vishal.pandey@biz2credit.com',
        password : studentPassword,
    },{
        user_id : new ObjectId(),
        first_name : 'mayank',
        last_name : 'raj',
        role_id : studentRoleId.toString(),
        email : 'mayank.raj@biz2credit.com',
        password : studentPassword,
    },{
        user_id : new ObjectId(),
        first_name : 'shubham',
        last_name : 'tiwari',
        role_id : studentRoleId.toString(),
        email : 'shubham.tiwari@biz2credit.com',
        password : studentPassword,
    },{
        user_id : new ObjectId(),
        first_name : 'vishal',
        last_name : 'negi',
        role_id : studentRoleId.toString(),
        email : 'vishal.negi@biz2credit.com',
        password : studentPassword,
    }],
    adminUsers : [{
        user_id : new ObjectId(),
        first_name : 'Gaurav',
        last_name : 'gupta',
        role_id : adminRoleId.toString(),
        email : 'gaurav.gupta@biz2credit.com',
        password : adminPassword,
    },{
        user_id : new ObjectId(),
        first_name : 'Abhishek',
        last_name : 'kumar',
        role_id : adminRoleId.toString(),
        email : 'abhishek.kumar@biz2credit.com',
        password : adminPassword,
    },{
        user_id : new ObjectId(),
        first_name : 'manoj',
        last_name : 'pandey',
        role_id : adminRoleId.toString(),
        email : 'manoj.pandey@biz2credit.com',
        password : adminPassword,
    }],
    superAdminUsers : [{
        user_id : new ObjectId(),
        first_name : 'Hari',
        last_name : 'soni',
        role_id : superAdminRoleId.toString(),
        email : 'hari.soni@biz2credit.com',
        password : superAdminPassword,
    },{
        user_id : new ObjectId(),
        first_name : 'mukesh',
        last_name : 'mehra',
        role_id : superAdminRoleId.toString(),
        email : 'mukesh.mehra@biz2credit.com',
        password : superAdminPassword,
    }]
}

export default roles;
export { users};