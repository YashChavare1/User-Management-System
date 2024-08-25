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
} = require("../Controller/userController");

router.post("/sign-up", signUpController);
router.post("/sign-in", signInController);
router.get("/get", getAllUsersController);
router.patch("/change-password", validateToken, changePasswordController);
router.patch("/update", validateToken, updateUserController);
router.delete("/delete", validateToken, deleteUserController);

module.exports = router;