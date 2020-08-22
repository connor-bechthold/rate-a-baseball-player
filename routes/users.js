const router = require("express").Router();
const {
	getUsers,
	getUserId,
	addUser,
	deleteUser,
	updateUser,
} = require("../controllers/user-controller");

router.route("/").get(getUsers);

router.route("/id").post(getUserId);

router.route("/add").post(addUser);

router.route("/delete/:id").delete(deleteUser);

router.route("/update/:id").put(updateUser);
module.exports = router;
