/*
 * @Author: naman jain(namanj975@gmail.com) 
 * @Date: 2021-12-29 20:37:46 
 * @Last Modified by: naman jain(namanj975@gmail.com)
 * @Last Modified time: 2021-12-30 17:33:31
 */
import User from '../db/schema/users';
import Role from '../db/schema/role';

/**
 * @param  [] allUsers 
 * @param  [] allRoles
 * @description  This method is used to filtering the users on the basis of their role and assigning new properties on th user document.
 * @programmers: Naman <namanj975@gmail.com> 
 */
const filterUsers = (allUsers, allRoles) => new Promise((resolve, reject) => {
    let filteredUsers = [];
    allUsers.forEach((user) => {
        let newUser = {};
        newUser.firstName = user.first_name ? user.first_name : '';
        newUser.lastName = user.last_name ? user.last_name : '';
        newUser.registeredAt = user.created_at;
        newUser.role = allRoles.filter((role) => {
            return role.role_id.toString() == user.role_id;
        })[0].name;
        filteredUsers[filteredUsers.length] = newUser;
    });
    resolve(filteredUsers);
});

/**
 * @param  [] allUsers
 * @param  '' role
 * @description  This method is used to filtering users on the basis of their role.
 * @programmers: Naman <namanj975@gmail.com> 
 */
const filterUsersByRole = (allUsers, role) => new Promise((resolve, reject) => {
    let filteredUsers = [];
    allUsers.forEach((user) => {
        let newUser = {};
        newUser.firstName = user.first_name ? user.first_name : '';
        newUser.lastName = user.last_name ? user.last_name : '';
        newUser.registeredAt = user.created_at;
        newUser.role = role;
        filteredUsers[filteredUsers.length] = newUser;
    });
    resolve(filteredUsers);
});

/**
 * @param  {} req
 * @param  {} res
 * @description  This method is used for performing operations for listing users.
 * @programmers: Naman <namanj975@gmail.com> 
 */
const listUsers = async (req, res) => {
    try {
        if (req.query && req.query.role) {
            let role = await Role.findOne({ name: req.query.role }).select("name role_id");
            let allUsersByRole = await User.find({ role_id: role.role_id.toString() }).select("first_name last_name created_at");
            let filteredUsersByRole = await filterUsersByRole(allUsersByRole, req.query.role);
            return res.json({ success: true, data: { users: filteredUsersByRole } });
        } else {
            let allRoles = await Role.find({}).select("name role_id");
            let allUsers = await User.find({});
            let fiteredUsers = await filterUsers(allUsers, allRoles);
            console.log("all users and all roles", allRoles, allUsers);
            return res.json({ success: true, data: { users: fiteredUsers } });
        }
    } catch (err) {
        res.sendStatus(403);
        console.log("getting error while listing the users...", err);
    }
}

export default listUsers;