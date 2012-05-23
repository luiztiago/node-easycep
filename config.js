var _mysql = require('mysql'),
	HOST = 'localhost',
	PORT = '3306',
	MYSQL_USER = 'root',
	MYSQL_PASS = '',
	DATABASE = 'cep';

exports.mysql = _mysql.createClient({
        host: HOST,
        port: PORT,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        database: DATABASE
});