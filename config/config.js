module.exports = {
    app : {
        port : process.env.port || 3000
    },
    db : {
        dbPort: process.env.DB_PORT || 3306,
		database: process.env.DB_NAME || 'retail_system',
		password: process.env.DB_PASS || 'tibuberuk',
		username: process.env.DB_USER || 'root',
		host: process.env.DB_HOST || 'localhost',
		dialect: 'mysql',
        connectionLimit: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
}