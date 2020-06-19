const User = require('../Models/User');

module.exports = class Database  {
    #connection;
    #mysql;
    #username;
    #authToken;
    #password;


    constructor() {
        this.#connection = null;
    }

    async getConnection(){
        try {
            const mysql = require('mysql');
            const conn = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'Isatu1997',
                database: "SLGS",
            });
        }
        catch (e) {
            console.log("err " + e);
        }

        return conn;
    }


    handleDisconnect(conn) {
        const mysql = require('mysql');
        conn.on('error', function (err) {
            if (!err.fatal) {
                return;
            }
            if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
                throw err;
            }

            console.log('Re-connecting lost connection: ' + err.stack);
            // to avoid a hot loop, and to allow our node script to
            conn = mysql.createConnection(conn.config);
            this.handleDisconnect(conn);
            conn.connect();
        });
    }

    openTransaction(){
        const mysql = require('mysql');
        const conn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Isatu1997',
            database: "SLGS",
        });

        this.handleDisconnect(conn);

        conn.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            const sql = "CREATE TABLE IF NOT EXISTS User" +
                " (authToken VARCHAR(255)," +
                " username VARCHAR(255) PRIMARY KEY, password VARCHAR(255))";

            const sql1 = "CREATE TABLE IF NOT EXISTS Student" +
                " (ID VARCHAR(255) PRIMARY KEY," +
                "username VARCHAR(255), password VARCHAR(255), firstName VARCHAR(255)," +
                ", middleName VARCHAR(255), streetlastName(VARCHAR(255), )";
            conn.query(sql, function (err, result) {
                if (err) throw err;
                // console.log("Table created");
            });
            conn.end();

        });

    }



    closeTransaction(){
        this.#connection.end((err) => {
            // The connection is terminated gracefully
            // Ensures all remaining queries are executed
            // Then sends a quit packet to the MySQL server.
            console.log("Connection closed");
        });
    }

    insertUser(user) {
        const conn = this.getConnection();
        console.log(user);
        let username = user.username;
        let authToken = user.authToken;
        let password = user.password;
        let value = user.toString();
        const sql =   `INSERT INTO User(authToken, username, password) 
VALUES('${authToken}', '${username}', '${password}')`;
        conn.query(sql);
    }

    findPassword(password){
        return new Promise(async function(resolve, reject) {
            let user;
            let conn;
            try {
                user = new User();
                //  conn = this.getConnection();
                const mysql = require('mysql');
                const conn = mysql.createConnection({
                    host: 'localhost',
                    user: 'root',
                    password: 'Isatu1997',
                    database: "SLGS",
                });
                conn.connect(async function (err) {
                    if (err) throw err;
                    let result = await conn.query(`SELECT * FROM User WHERE password = '${password}'`, function (err, result) {
                        if (err) throw err;
                        resolve(result[0]);
                    });

                })
            }
            catch (e) {
                console.log('Error occurred', e);
                reject(e);
            }
            finally {
                if (conn) {
                    try {
                        await conn.close();
                        console.log('Connection closed');
                    } catch (err) {
                        console.log('Error closing connection', err);
                    }
                }
            }
        });
    }

    findUser(authToken){
        return new Promise(async function(resolve, reject) {
            let user;
            let conn;
            try {
                user = new User();
                //  conn = this.getConnection();
                const mysql = require('mysql');
                const conn = mysql.createConnection({
                    host: 'localhost',
                    user: 'root',
                    password: 'Isatu1997',
                    database: "SLGS",
                });
                conn.connect(async function (err) {
                    if (err) throw err;
                    let result = await conn.query(`SELECT * FROM User WHERE username = '${authToken}'`, function (err, result) {
                        if (err) throw err;
                        // console.log(result);
                        resolve(result[0]);
                        //return result;
                    });

                })
            }
            catch (e) {
                console.log('Error occurred', e);
                reject(e);
            }
            finally {
                if (conn) {
                    try {
                        await conn.close();
                        console.log('Connection closed');
                    } catch (err) {
                        console.log('Error closing connection', err);
                    }
                }
            }
        });
    }

    deleteUser(authToken){
        const conn = this.getConnection();
        conn.connect(function(err) {
            if (err) throw err;
            conn.query(`DELETE FROM User WHERE authToken = '${authToken}'`, function (err, result) {
                if (err) throw err;
                console.log("Number of affected rows: " + result.affectedRows);
            });
        })
    }

}




