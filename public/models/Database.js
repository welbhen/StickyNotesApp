const Sequelize = require('sequelize');

// .env
    const path = require('path');
    const dotenv = require('dotenv');
    dotenv.config({ path: path.resolve(__dirname, '../../.env')});

// Database MySQL connection:
    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT
    });
    sequelize.authenticate().then(() => {
        console.log("MySQL connected!");
    }).catch((err) => {
        console.log("Error connecting to MySQL: " + err);
    })

// Exports:
module.exports = {
	Sequelize: Sequelize,
	sequelize: sequelize
}