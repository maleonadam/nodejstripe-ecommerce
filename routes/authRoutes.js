const express = require("express");
const {
	createUser,
	loginUser,
	getAllUsers,
	getSingleUser,
	deleteUser,
	updateUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/users/register", createUser);
router.post("/users/login", loginUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getSingleUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
