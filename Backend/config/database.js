const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false,
    }
);

const databaseConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database Connection Successful");
        return true;
    }
    catch(error) {
        console.error("Unable to connect to the database: ", error);
        return false;
    }
}

module.exports = { 
    sequelize, 
    databaseConnection,
};