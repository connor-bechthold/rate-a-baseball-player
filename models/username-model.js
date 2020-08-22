const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	userName: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
