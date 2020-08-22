const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
	userName: { type: String, required: true },
	playerName: { type: String, required: true },
	playerRating: { type: Number, required: true },
	ratingDescription: { type: String, required: true },
	postedAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
