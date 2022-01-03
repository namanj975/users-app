/*
 * @Author: naman jain(namanj975@gmail.com) 
 * @Date: 2021-12-28 18:47:05 
 * @Last Modified by:   naman jain(namanj975@gmail.com) 
 * @Last Modified time: 2021-12-28 18:47:05 
 */

import mongoose from 'mongoose';
const { Schema,model } = mongoose;

const roleSchema = new Schema({
    role_id: {type : mongoose.ObjectId, required: true},
    name: String, 
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const Role = model('Role',roleSchema);
export default Role;