
# $ user-app

* A simple application for performing the user related operations like listing users ,counting users , user sign-in and much more.

## Installation

* Run 'npm install' command in the project root directory for installing the required dependencies.
* Run 'npm start' command in the project root directory for starting the server.
* Run 'npm run dev' command in the project root directory for starting the server in dev mode.

## Configuration

* For db configuration use file './db/config.js'
* For application configuration like port , user password and secret key use file './app/config.js'.
* For adding user documents or role documents to be inserted in the database use file './records.js'.
* For changing the encryption or decryption mechanism use file 'encryptDecrypt.js'.

## APIs endpoint

* For user login '/api/v1/login' (All the users are allowed to login but jwt token will only be provided to admin and super admin users ).
* For listing all users '/api/v1/users' (jwt token required).
* For listing admin users '/api/v1/users?role=admin' (jwt token required).
* For listing super admin users '/api/v1/users?role=superAdmin' (jwt token required).
* For listing student users '/api/v1/users?role=student' (jwt token required).
* For getting the count of all users(i.e student,admin,superAdmin) 'api/vi/role/count' (jwt token required).

## jwt authentication

* For passing the jwt token in the API add Bearer Token in the Authorization param of request.