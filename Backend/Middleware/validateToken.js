const jwt = require("jsonwebtoken");
const userModel = require("../Model/userModel");

const validateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No token provided",
            });
        }

        const token = authHeader.split(" ")[1];
        const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const verifyUser = await userModel.findOne({
            where: { userId: tokenData.userId, email: tokenData.email }
        });

        if (!verifyUser) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid token",
            });
        }

        req.user = {
            email: tokenData.email,
            userId: tokenData.userId,
        };

        next();
    }
    catch (error) {
        console.error("Error occurred while token validatin: ", error.message);
    }
}

module.exports = { validateToken }