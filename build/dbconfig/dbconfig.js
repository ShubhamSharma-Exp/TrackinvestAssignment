"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
exports.default = new pg_1.Pool({
    user: 'me',
    host: 'localhost',
    database: 'assignment',
    password: 'password',
    port: 5432,
});
