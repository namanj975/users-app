/*
 * @Author: naman jain(namanj975@gmail.com) 
 * @Date: 2021-12-28 18:46:13 
 * @Last Modified by: naman jain(namanj975@gmail.com)
 * @Last Modified time: 2021-12-30 19:03:52
 */

import { connectDb } from './db/connection'
import { default as task, getUsers } from './task';
import initialProcess from './initialProcessHandler';
import express from 'express';
import configuration from './appConfig.js';
import appRoutes from './routes/index';

const app = express()
app.set('appPort', configuration.port);

app.all('/', (req, res) => {
    console.log("this withot mount called",req.method);
    res.send('Hello World!')
})

app.listen(app.get('appPort'), (val) => {
    console.log(`Example app listening at http://localhost:${app.get('appPort')}`);
})

let initiateProcess = async () => {
    try {
        connectDb().then((result) => { console.log("db result", result); }).catch(err => console.log(err));
        await initialProcess();
    }catch(err){
        console.log("error occured while initiating the main process",err);
    }
}


function errorHandler(err, req, res, next) {
    if (res.headersSent) {   //If any error encountered after response headers has been sent then express default error handler deal with it.
        return next(err)
    }
    console.log("error occured in the app", err);
    res.status(500)
    res.render('error', { error: err })
}
app.use(errorHandler)
app.use("/api/v1",appRoutes);
process.on("unhandledRejection", (reason, promise) => {
    console.log("unhandled promise rejection has been caught", reason);
});

process.on('uncaughtException', function (err) {
    console.error("Exceptions has been caught", err);
})

initiateProcess();