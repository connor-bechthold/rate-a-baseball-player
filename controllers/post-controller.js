const Posts = require("../models/post-model");

exports.getPosts = async (req, res, next) => {
	try {
		const posts = await Posts.find();
		res.json({
			success: "yes",
			data: posts,
		});
	} catch (error) {
		res.status(500).json({
			success: "no",
			error: error.message,
		});
	}
};

exports.getPostByUser = async (req, res, next) => {
	try {
		const userName = req.body.userName;
		const posts = await Posts.find({ userName: userName });
		res.json({
			success: "yes",
			data: posts,
		});
	} catch (error) {
		res.status(500).json({
			success: "no",
			error: error.message,
		});
	}
};

exports.getPostById = async (req, res, next) => {
	try {
		const id = req.params.id;
		const post = await Posts.findById(id);
		res.json({
			success: "yes",
			data: post,
		});
	} catch (error) {
		res.status(500).json({
			success: "no",
			error: error.message,
		});
	}
};

exports.addPost = async (req, res, next) => {
	try {
		const userName = req.body.userName;
		const playerName = req.body.playerName;
		const playerRating = req.body.playerRating;
		const ratingDescription = req.body.ratingDescription;

		const data = await Posts.create({
			userName: userName,
			playerName: playerName,
			playerRating: playerRating,
			ratingDescription: ratingDescription,
		});

		const allPosts = await Posts.find();
		res.json({
			success: "yes",
			message: `Post has been created!`,
			data: data,
			posts: allPosts,
		});
	} catch (error) {
		res.status(500).json({
			success: "no",
			error: error.message,
		});
	}
};

exports.deletePost = async (req, res, next) => {
	try {
		const postId = req.params.id;
		const data = await Posts.findByIdAndRemove(postId);
		res.json({
			success: "yes",
			message: "Post has been deleted",
			data: data,
		});
	} catch (error) {
		res.status(500).json({
			success: "no",
			error: error.message,
		});
	}
};

exports.deletePostByUser = async (req, res, next) => {
	try {
		const userName = req.params.userName;
		const data = await Posts.deleteMany({ userName: userName });
		res.json({
			success: "yes",
			message: "Post has been deleted",
		});
	} catch (error) {
		res.status(500).json({
			success: "no",
			error: error.message,
		});
	}
};

exports.updatePost = async (req, res, next) => {
	try {
		const id = req.params.id;
		const updatedUserName = req.body.userName;
		const updatedPlayerName = req.body.playerName;
		const updatedPlayerRating = req.body.playerRating;
		const updatedRatingDescription = req.body.ratingDescription;
		const data = await Posts.findOneAndUpdate(
			{ _id: id },
			{
				userName: updatedUserName,
				playerName: updatedPlayerName,
				playerRating: updatedPlayerRating,
				ratingDescription: updatedRatingDescription,
			},
			{ new: true }
		);
		const allPosts = await Posts.find();
		res.json({
			success: "yes",
			message: "Post has been updated",
			data: data,
			posts: allPosts,
		});
	} catch (error) {
		res.status(500).json({
			success: "no",
			error: error.message,
		});
	}
};

exports.updatePostsUserName = async (req, res, next) => {
	try {
		const oldUserName = req.body.oldUserName;
		const updatedUserName = req.body.updatedUserName;
		const data = await Posts.updateMany(
			{ userName: oldUserName },
			{ userName: updatedUserName },
			{ new: true }
		);
		const allPosts = await Posts.find();
		res.json({
			success: "yes",
			message: "Post username has been updated",
			data: data,
			posts: allPosts,
		});
	} catch (error) {
		res.status(500).json({
			success: "no",
			error: error,
		});
	}
};
