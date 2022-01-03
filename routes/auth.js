/*
 * @Author: naman jain(namanj975@gmail.com) 
 * @Date: 2021-12-30 22:03:57 
 * @Last Modified by: naman jain(namanj975@gmail.com)
 * @Last Modified time: 2021-12-30 22:05:11
 */
import jwt from 'jsonwebtoken';

/**
 * @param  {} req
 * @param  {} res
 * @param next(callback)
 * @description  This method is used for authenticating the user by token.
 * @programmers: Naman <namanj975@gmail.com> 
 */
const validateToken = (req, res, next) => {
    let authHeader = req.headers['authorization']
    let token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET_KEY , (err, user) => {
        console.log("result in jwt -->",err,user);
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

export default validateToken;