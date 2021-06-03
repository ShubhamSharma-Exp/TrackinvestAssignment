import { Pool } from 'pg';

export default new Pool({
    user: 'me',
    host: 'localhost',
    database: 'assignment',
    password: 'password',
    port: 5432,
});