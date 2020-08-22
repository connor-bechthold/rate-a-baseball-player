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
			exercises: [],
			userExercises: [],
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
				exercises: response.data.data,
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

	setUserExercises = (value) => {
		this.setState({ userExercises: value });
	};

	setExercises = (value) => {
		this.setState({ exercises: value });
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
								userExercises={this.state.userExercises}
								setSuccessMessage={this.setSuccessMessage}
								setUserId={this.setUserId}
								setCurrentUserName={this.setCurrentUserName}
								setUserExercises={this.setUserExercises}
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
								exercises={this.state.exercises}
								userExercises={this.state.userExercises}
								setUserId={this.setUserId}
								setExercises={this.setExercises}
								setUserExercises={this.setUserExercises}
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
								exercises={this.state.exercises}
								userExercises={this.state.userExercises}
								setExercises={this.setExercises}
								setUserExercises={this.setUserExercises}
							/>
						)}
					/>

					<Route
						path="/allposts"
						render={(props) => (
							<AllPosts {...props} exercises={this.state.exercises} />
						)}
					/>

					<Route
						path="/userposts"
						render={(props) => (
							<UserPosts
								{...props}
								userExercises={this.state.userExercises}
								currentUserName={this.state.currentUserName}
								exercises={this.state.exercises}
								editPlayerValue={this.state.editPlayerValue}
								editPlayerRating={this.state.editPlayerRating}
								editPlayerDescription={this.state.editPlayerDescription}
								postId={this.state.postId}
								setUserExercises={this.setUserExercises}
								setExercises={this.setExercises}
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
								exercises={this.state.exercises}
								userExercises={this.state.userExercises}
								setEditPlayerValue={this.setEditPlayerValue}
								setEditPlayerRating={this.setEditPlayerRating}
								setEditPlayerDescription={this.setEditPlayerDescription}
								setPostId={this.setPostId}
								setExercises={this.setExercises}
								setUserExercises={this.setUserExercises}
							/>
						)}
					/>
				</div>
			</Router>
		);
	}
}

export default App;
