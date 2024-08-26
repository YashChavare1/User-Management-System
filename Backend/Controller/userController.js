const userModel = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUpController = async (req, res) => {
    try {
        const { name, email, password, dateOfBirth } = req.body;

        const existingUser = await userModel.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with provided email already exists.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
            dateOfBirth,
        });

        const token = jwt.sign({
            email: newUser.email,
            userId: newUser.userId,
        },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "24h" }
        );

        return res.status(201).json({
            success: true,
            message: "User created successfully.",
            userToken: token,
        });
    }
    catch (error) {
        console.error("Error occurred while creating new user: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message,
        });
    }
};

const signInController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await userModel.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const verifyPassword = await bcrypt.compare(password, user.password);
        if (!verifyPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign({
            userId: user.userId,
            email: user.email,
        }, process.env.JWT_SECRET_KEY);

        return res.status(200).json({
            success: true,
            message: "Sign-in Successfull",
            userToken: token,
            userData: {
                name: user.name,
                email: user.email,
                userId: user.userId,
                dateOfBirth: user.dateOfBirth,
            },
        });
    }
    catch (error) {
        console.error("Error occurred while user sign-in: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}

const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.findAll({
            attributes: { exclude: ["password"] }
        });

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No user found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User details fetched successfully.",
            users: users,
        });
    }
    catch (error) {
        console.error("Error occurred while fetching user details: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message,
        });
    }
}

const getUserByTokenController = async (req, res) => {
    try {
        const { userId } = req.user;

        const user = await userModel.findOne({
            where: { userId: userId },
            attributes: { exclude: ["password"] }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No user found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            userData: user,
        });
    }
    catch (error) {
        console.error("Error occured while fetching user details: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

const updateUserController = async (req, res) => {
    try {
        const { name, email, dateOfBirth } = req.body;
        const { userId } = req.user;

        const user = await userModel.findOne({
            where: { userId: userId },
            attributes: { exclude: ["password"] }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        if (email) {
            const existingEmailUser = await userModel.findOne({ where: { email } });
            
            if (existingEmailUser && existingEmailUser.userId !== userId) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists. Please use a different email.",
                });
            }
        }

        const updates = {};

        if (name) updates.name = name;
        if (email) updates.email = email;
        if (dateOfBirth) updates.dateOfBirth = dateOfBirth;

        await userModel.update(
            updates,
            { where: { userId: userId } }
        );

        const updatedUser = await userModel.findOne({
            where: { userId: userId },
            attributes: { exclude: ["password"] }
        });

        const token = jwt.sign({
            email: updatedUser.email,
            userId: updatedUser.userId,
        },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "24h" }
        );

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: {
                name: updatedUser.name,
                email: updatedUser.email,
                dateOfBirth: updatedUser.dateOfBirth,
            },
            userToken: token,
        });
    }
    catch (error) {
        console.error("Error occurred while updating user details: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error,
        });
    }
};

const changePasswordController = async (req, res) => {
    try {
        const { userId } = req.user;
        const { oldPassword, newPassword } = req.body;

        const user = await userModel.findOne({
            where: { userId: userId },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const verifyOldPassword = await bcrypt.compare(oldPassword, user.password);

        if (!verifyOldPassword) {
            return res.status(400).json({
                success: false,
                message: "Old password does not match",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await userModel.update(
            { password: hashedPassword },
            { where: { userId: userId } }
        );

        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    }
    catch (error) {
        console.error("Error occurred while updating password: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server Error.",
            error: error.message,
        });
    }
}

const deleteUserController = async (req, res) => {
    try {
        const { userId } = req.user;
        const user = await userModel.findOne({
            where: { userId: userId }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        await user.destroy();

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    }
    catch (error) {
        console.error("Error occurred while deleting user: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message,
        });
    }
}

module.exports = {
    signUpController,
    signInController,
    getAllUsersController,
    updateUserController,
    changePasswordController,
    deleteUserController,
    getUserByTokenController,
};