/*
 * @Author: naman jain(namanj975@gmail.com) 
 * @Date: 2021-12-30 01:38:28 
 * @Last Modified by: naman jain(namanj975@gmail.com)
 * @Last Modified time: 2021-12-30 17:34:16
 */

import User from '../db/schema/users';
import Role from '../db/schema/role';

/**
 * @param  [] allUsersByRoleCount
 * @param  [] roles
 * @description  This method is used to filter users count on the basis of their role.
 * @programmers: Naman <namanj975@gmail.com> 
 */
 const getUsersFilteredCount = (allUsersByRoleCount, roles) => new Promise((resolve, reject) => {
    let usersCountDoc = {};
    allUsersByRoleCount.forEach((userCount) => {
        roles.forEach((role) => {
            if(role.role_id.toString() == userCount._id)
            usersCountDoc[role.name] = userCount.roleCount 
        })
    })
    resolve(usersCountDoc);
});

/**
 * @param  {} req
 * @param  {} res
 * @description  This method is used to count the users on the basis of role.
 * @programmers: Naman <namanj975@gmail.com> 
 */
const countUsers = async (req,res) =>{
    try {
        let roles = await Role.find({}).select("name role_id");
        let allUsersByRoleCount = await User.aggregate([{ $group: { _id: '$role_id', roleCount: { $sum : 1 }}}]);
        let usersCount = await getUsersFilteredCount(allUsersByRoleCount,roles);
        console.log("all users count", allUsersByRoleCount)

        return res.json({success: true, data: usersCount})
    }catch (err){
        res.sendStatus(403);
        console.log("getting error while counting the users...",err);
    }
}

export default countUsers;