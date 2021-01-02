import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import AllPosts from "./components/AllPosts";
import EditPost from "./components/EditPost";
import Home from "./components/Home";
import SubmitPost from "./components/SubmitPost";
import UserChange from "./components/UserChange";
import UserPosts from "./components/UserPosts";
import NavBar from "./components/Navbar";

import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userId: "",
			currentUserName: "",
			posts: [],
			userPosts: [],
			editPlayerValue: "",
			editPlayerRating: "",
			editPlayerDescription: "",
			postId: "",
			successMessage: "",
		};
	}

	componentDidMount = async () => {
		try {
			const response = await axios.get("/posts/");
			this.setState({
				posts: response.data.data,
			});
		} catch (error) {
			console.log(error.response.data.error);
		}
	};

	setSuccessMessage = (value) => {
		this.setState({ successMessage: value });
	};

	setUserId = (value) => {
		this.setState({ userId: value });
	};

	setCurrentUserName = (value) => {
		this.setState({ currentUserName: value });
	};

	setUserPosts = (value) => {
		this.setState({ userPosts: value });
	};

	setPosts = (value) => {
		this.setState({ posts: value });
	};

	setEditPlayerValue = (value) => {
		this.setState({ editPlayerValue: value });
	};

	setEditPlayerRating = (value) => {
		this.setState({ editPlayerRating: value });
	};

	setEditPlayerDescription = (value) => {
		this.setState({ editPlayerDescription: value });
	};

	setPostId = (value) => {
		this.setState({ postId: value });
	};

	render() {
		return (
			<Router>
				<NavBar />
				{this.state.currentUserName && (
					<p
						style={{
							textAlign: "right",
							paddingRight: "10px",
						}}
					>{`Current User: ${this.state.currentUserName}`}</p>
				)}
				<div className="App">
					<Route
						path="/"
						exact
						render={(props) => (
							<Home
								{...props}
								currentUserName={this.state.currentUserName}
								successMessage={this.state.successMessage}
								userId={this.state.userId}
								userPosts={this.state.userPosts}
								setSuccessMessage={this.setSuccessMessage}
								setUserId={this.setUserId}
								setCurrentUserName={this.setCurrentUserName}
								setUserPosts={this.setUserPosts}
								setSignedIn={this.setSignedIn}
							/>
						)}
					/>

					<Route
						path="/edituser"
						render={(props) => (
							<UserChange
								{...props}
								successMessage={this.state.successMessage}
								currentUserName={this.state.currentUserName}
								userId={this.state.userId}
								posts={this.state.posts}
								userPosts={this.state.userPosts}
								setUserId={this.setUserId}
								setPosts={this.setPosts}
								setUserPosts={this.setUserPosts}
								setCurrentUserName={this.setCurrentUserName}
								setSuccessMessage={this.setSuccessMessage}
							/>
						)}
					/>

					<Route
						path="/createpost"
						render={(props) => (
							<SubmitPost
								{...props}
								currentUserName={this.state.currentUserName}
								posts={this.state.posts}
								userPosts={this.state.userPosts}
								setPosts={this.setPosts}
								setUserPosts={this.setUserPosts}
							/>
						)}
					/>

					<Route
						path="/allposts"
						render={(props) => <AllPosts {...props} posts={this.state.posts} />}
					/>

					<Route
						path="/userposts"
						render={(props) => (
							<UserPosts
								{...props}
								userPosts={this.state.userPosts}
								currentUserName={this.state.currentUserName}
								posts={this.state.posts}
								editPlayerValue={this.state.editPlayerValue}
								editPlayerRating={this.state.editPlayerRating}
								editPlayerDescription={this.state.editPlayerDescription}
								postId={this.state.postId}
								setUserPosts={this.setUserPosts}
								setPosts={this.setPosts}
								setEditPlayerValue={this.setEditPlayerValue}
								setEditPlayerRating={this.setEditPlayerRating}
								setEditPlayerDescription={this.setEditPlayerDescription}
								setPostId={this.setPostId}
							/>
						)}
					/>

					<Route
						path="/editpost"
						render={(props) => (
							<EditPost
								{...props}
								editPlayerValue={this.state.editPlayerValue}
								editPlayerRating={this.state.editPlayerRating}
								editPlayerDescription={this.state.editPlayerDescription}
								currentUserName={this.state.currentUserName}
								postId={this.state.postId}
								posts={this.state.posts}
								userPosts={this.state.userPosts}
								setEditPlayerValue={this.setEditPlayerValue}
								setEditPlayerRating={this.setEditPlayerRating}
								setEditPlayerDescription={this.setEditPlayerDescription}
								setPostId={this.setPostId}
								setPosts={this.setPosts}
								setUserPosts={this.setUserPosts}
							/>
						)}
					/>
				</div>
			</Router>
		);
	}
}

export default App;
