/*
 *@Author: naman jain(namanj975@gmail.com) 
 * @Date: 2021-12-23 14:00:17 
 * @Last Modified by: naman jain(namanj975@gmail.com)
 * @Last Modified time: 2021-12-30 17:56:37
 */

 import users from './users.json'

/**
 * @param  [] users
 * @description  This method is used for filtering the deactivated users from the provided array.
 * @programmers: Naman <namanj975@gmail.com> 
 */
const filterDeactivatedUsers = (users) => {
    const filteredUsers = users.filter((user) => {
        return user.isActive === false;
    })
    return filteredUsers;
}

/**
 * @param  [] users
 * @description  This method returns the array of strings representing the full name(i.e appended first and last name) of each user in the provided array of users.
 * @programmers: Naman <namanj975@gmail.com> 
 */
const getUserFirstAndLastNameAppended = (users) => {
    let userNames = [];
    users.forEach((user) => {
        let finalName  = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : `${user.firstName && !user.lastName ? user.firstName : ''}`;
        userNames[userNames.length] = finalName;
    })
    return userNames;
}

/**
 * @param  {}
 * @description  This method returns the count of users according to the filter provided.
 * @programmers: Naman <namanj975@gmail.com> 
 */
const getCountOfUsersAfterGivenDate = ({ role = 'student' , date = '1425111000000' } = {}) => {
    let filteredUsers = users.filter((user) => user.role === role && user.registeredAt > date );
    return filteredUsers && filteredUsers.length > 0 ? filteredUsers.length : 0;
}

/**
 * @param '' order
 * @description  This method returs the array of sorted users on basis of order of date(i.e 'asc' or 'desc')
 * @programmers: Naman <namanj975@gmail.com> 
 */
const sortUsersByDate = (order) => {
let usersList = [];
Object.assign(usersList, users);
switch (order) {
    case 'asc':
      console.log('in ascending order');
      usersList.sort((a,b) => {
          if(a.registeredAt > b.registeredAt){
              return 1
          }else if(a.registeredAt < b.registeredAt) {
            return -1
          } else {
            return 0;
          }
      })
      return usersList;
    case 'desc':
      console.log('in descending order');
      usersList.sort((a,b) => {
        if(a.registeredAt < b.registeredAt){
            return 1
        }else if(a.registeredAt > b.registeredAt) {
            return -1
        }
        return 0;
    })
    return usersList;
    default:
      usersList.sort((a,b) => {
        if(a.registeredAt > b.registeredAt){
            return 1
        }else if(a.registeredAt < b.registeredAt) {
          return -1
        } else {
          return 0;
        }
    })
    return usersList;
  }
}

/**
 * @param  (number) invocation
 * @description  This method provides the default array of users.
 * @programmers: Naman <namanj975@gmail.com> 
 */
const getUsers = async (invocation) => {
  try {
    console.log("getting all users from invocation ", invocation);
    return users;
  } catch(err){
    console.log("error while fetching the users list");
    throw new Error(err);
  }
};

getUsers(1).then(filterDeactivatedUsers).then(getUserFirstAndLastNameAppended).then(users => console.log(users));
getUsers(2).then((result) => getCountOfUsersAfterGivenDate({role:"student", "date": 1611155600000})).then(count => console.log("count of users", count));

export { filterDeactivatedUsers as default , getUserFirstAndLastNameAppended as getAllUserNamesInArray , getCountOfUsersAfterGivenDate as getUserscount , sortUsersByDate as sortedUsers, getUsers};