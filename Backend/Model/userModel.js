const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const userModel = sequelize.define("User", {
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: "Must be a valid email address."
            },
            notNull: {
                msg: "Email is required."
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Password is required."
            },
            len: {
                args: [6, 255],
                msg: "Password must be at least 6 characters long."
            }
        }
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Date of birth is required."
            },
            isDate: {
                msg: "Must be a valid date."
            }
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        onUpdate: Sequelize.NOW
    }
},
    {
        timestamps: true,
    }
);

module.exports = userModel;