const userModel = require("./Model/userModel");

const syncDatabase = async () => {
    try {
        await userModel.sync();
        console.log("User table has been created or exists.");
    } 
    catch (error) {
        console.error("Error syncing User model:", error);
    }
};

module.exports = syncDatabase;
