const generateToken = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// create user
const createUser = asyncHandler(async (req, res) => {
	const email = req.body.email;
	// check if user exists
	const findUser = await User.findOne({ email: email });
	if (!findUser) {
		const newUser = await User.create(req.body);
		res.json(newUser);
	} else {
		throw new Error("User already exists!");
	}
});

// login user
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	// check if user exists
	const findUser = await User.findOne({ email });
	if (findUser && (await findUser.isPasswordMatched(password))) {
		res.json({
			_id: findUser?._id,
			firstname: findUser?.first_name,
			lastname: findUser?.last_name,
			email: findUser?.email,
			mobile: findUser?.mobile,
			token: generateToken(findUser?._id),
		});
	} else {
		throw new Error("Invalid Credentials!");
	}
});

// get all users
const getAllUsers = asyncHandler(async (req, res) => {
	try {
		const allUsers = await User.find();
		res.json(allUsers);
	} catch (error) {
		throw new Error(error);
	}
});

// get single user
const getSingleUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const singleUser = await User.findById(id);
		res.json(singleUser);
	} catch (error) {
		throw new Error(error);
	}
});

// update a user
const updateUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const updatedUser = await User.findByIdAndUpdate(
			id,
			{
				first_name: req?.body?.first_name,
				last_name: req?.body?.last_name,
				email: req?.body?.email,
				mobile: req?.body?.mobile,
			},
			{ new: true }
		);
		res.json(updatedUser);
	} catch (error) {
		throw new Error(error);
	}
});

// delete a user
const deleteUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const deletedUser = await User.findByIdAndDelete(id);
		res.json(deletedUser);
	} catch (error) {
		throw new Error(error);
	}
});

module.exports = {
	createUser,
	loginUser,
	getAllUsers,
	getSingleUser,
	deleteUser,
	updateUser,
};
