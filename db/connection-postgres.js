const promise = require('bluebird');
const pgp = require('pg-promise')({promiseLib: promise});

const connection = {
    host: 'localhost',
    database: 'training',
    user: 'postgres',
    password: 'root',
    port: 5432,
    max: 20, // set pool max size to 20
    idleTimeoutMillis: 1000, // close idle clients after 1 second
    connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
    maxUses: 7500, // close (and replace) a connection after it has been used 7500 times (see below for discussion)
};
const db = pgp(connection);

module.exports = db;