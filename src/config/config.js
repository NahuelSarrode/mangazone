module.exports = {
    port: 3000,
    logLevel: 'debug',
    production: true, 
    secret: 'sectret', 
    mysql: {
        host: 'localhost',
        user: 'root',
        database: 'mangazone_db',
        password: '',
    },
    email: {
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: '',
            pass: ''
        }
    }
};