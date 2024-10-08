const express = require("express");
const router = express.Router();
const { validateToken } = require("../Middleware/validateToken");
const { 
    signUpController, 
    getAllUsersController, 
    updateUserController, 
    deleteUserController,
    changePasswordController,
    signInController,
    getUserByTokenController, 
} = require("../Controller/userController");

router.post("/sign-up", signUpController);
router.post("/sign-in", signInController);
router.get("/get", getAllUsersController);
router.get("/get-user", validateToken, getUserByTokenController);
router.put("/change-password", validateToken, changePasswordController);
router.put("/update", validateToken, updateUserController);
router.delete("/delete", validateToken, deleteUserController);

module.exports = router;