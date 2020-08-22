const User = require("../models/username-model");
const bcrypt = require("bcrypt");

exports.getUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		res.json({
			success: "yes",
			data: users,
		});
	} catch (error) {
		res.json({
			success: "no",
			error: error.message,
		});
	}
};

exports.addUser = async (req, res, next) => {
	try {
		const newUser = req.body.userName;
		const password = req.body.password;
		const hashedPassword = await bcrypt.hash(password, 10);

		const data = await User.create({
			userName: newUser,
			password: hashedPassword,
		});
		res.json({
			success: "yes",
			message: `User ${newUser} has been created!`,
			data: data,
		});
	} catch (error) {
		res.status(500).json({
			success: "no",
			error: error.message,
		});
	}
};

exports.getUserId = async (req, res, next) => {
	try {
		const user = req.body.userName;
		const password = req.body.password;
		const data = await User.find({ userName: user });
		if (!(await bcrypt.compare(password, data[0].password))) {
			res.status(500).json({
				success: "no",
				error: "Invalid Password",
			});
		}

		res.json({
			success: "yes",
			data: data,
			id: data[0]._id,
			userName: data[0].userName,
			message: "You are signed in!",
		});
	} catch (error) {
		res.status(500).json({
			success: "no",
			error: error.message,
		});
	}
};

exports.deleteUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		const data = await User.findByIdAndRemove(id);
		res.json({
			success: "yes",
			message: "User has been deleted",
			data: data,
		});
	} catch (error) {
		res.status(500).json({
			success: "no",
			error: error.message,
		});
	}
};

exports.updateUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		const updatedUser = req.body.userName;
		const data = await User.findOneAndUpdate(
			{ _id: id },
			{ userName: updatedUser },
			{ new: true, runValidators: true }
		);
		res.json({
			success: "yes",
			message: "User has been updated",
			userName: data.userName,
			data: data,
		});
	} catch (error) {
		res.status(500).json({
			success: "no",
			error: error.message,
		});
	}
};
