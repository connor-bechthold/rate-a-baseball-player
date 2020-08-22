const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
app.use(cors());
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "client/build")));

const dbConnection = async () => {
	try {
		const connection = await mongoose.connect(process.env.URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log("Connection to database was successful");
	} catch (error) {
		console.log(`Error: ${error.message}`);
	}
};
dbConnection();

app.use(express.json());

const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => {
	console.log(`Listening at port ${port}`);
});
