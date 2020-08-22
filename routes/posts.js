const router = require("express").Router();
const {
	getPosts,
	getPostByUser,
	getPostById,
	addPost,
	deletePost,
	deletePostByUser,
	updatePost,
	updatePostsUserName,
} = require("../controllers/post-controller");

router.route("/").get(getPosts);

router.route("/user").post(getPostByUser);

router.route("/:id").get(getPostById);

router.route("/add").post(addPost);

router.route("/delete/:userName").delete(deletePostByUser);

router.route("/delete/post/:id").delete(deletePost);

router.route("/update/:id").put(updatePost);

router.route("/update/post").post(updatePostsUserName);

module.exports = router;
