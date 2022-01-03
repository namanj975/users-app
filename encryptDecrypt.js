/*
 * @Author: naman jain(namanj975@gmail.com) 
 * @Date: 2021-12-28 18:35:48 
 * @Last Modified by: naman jain(namanj975@gmail.com)
 * @Last Modified time: 2021-12-30 19:14:30
 */

import cryptoJs from "crypto-js";
import configuration from './appConfig.js';
export default cryptoJs;

let iv = cryptoJs.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");

/**
 * @param  '' message
 * @description  This method is used to encrypt the message provided as its arguement.
 * @programmers: Naman <namanj975@gmail.com> 
 */
const encryptMessage = (message ) => {
    let encrypted = cryptoJs.AES.encrypt(message, configuration.secretKey , { iv } );
    return encrypted.toString(); 
};

/**
 * @param  {} encrypted
 * @description  This method is used for decrypting the message by using encrypted object or key as its arguement
 * @programmers: Naman <namanj975@gmail.com> 
 */
const decryptMessage = (encrypted) =>{
    let decrypted = cryptoJs.AES.decrypt(encrypted,configuration.secretKey,{ iv });
    return decrypted.toString(cryptoJs.enc.Utf8)
}

export {encryptMessage, decryptMessage};


