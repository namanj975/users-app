/*
 * @Author: naman jain(namanj975@gmail.com) 
 * @Date: 2021-12-28 18:47:14 
 * @Last Modified by:   naman jain(namanj975@gmail.com) 
 * @Last Modified time: 2021-12-28 18:47:14 
 */

import mongoose from 'mongoose';
const { Schema , model } = mongoose;

const userSchema = new Schema({
    user_id : mongoose.ObjectId,
    first_name : String,
    last_name : String,
    role_id : String,
    email : String,
    password : String,
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const User = model('User',userSchema);
export default User;