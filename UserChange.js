import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./UserChange.css";

class UserChange extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			deleteUserValue: "",
			updatedUserValue: "",
		};
	}

	handleDeleteUser = (e) => {
		this.setState({ deleteUserValue: e.target.value });
	};

	deleteUser = async (e) => {
		e.preventDefault();
		if (this.state.deleteUserValue === this.props.currentUserName) {
			try {
				// eslint-disable-next-line
				const responseUser = await axios.delete(
					`/users/delete/${this.props.userId}`
				);
				// eslint-disable-next-line
				const responsePost = await axios.delete(
					`posts/delete/${this.props.currentUserName}`
				);

				this.setState({
					deleteUserValue: "",
				});
				this.props.setUserId("");
				this.props.setPosts(
					this.props.posts.filter((post) => {
						return post.userName !== this.props.currentUserName;
					})
				);
				this.props.setUserPosts(
					this.props.userPosts.filter((post) => {
						return post.userName !== this.props.currentUserName;
					})
				);
				this.props.setCurrentUserName("");
				this.props.setSuccessMessage("You have deleted your user.");

				setTimeout(() => {
					this.props.setSuccessMessage("");
				}, 5000);
				this.props.history.push("/");
			} catch (error) {
				alert("Error: You have not signed in.");
			}
		} else {
			alert("Error: Current field and username do not match.");
		}
	};

	handleUpdatedUser = (e) => {
		this.setState({ updatedUserValue: e.target.value });
	};

	updateUser = async (e) => {
		e.preventDefault();
		if (/^[a-z0-9_-]{3,16}$/gim.test(this.state.updatedUserValue)) {
			try {
				const userData = { userName: this.state.updatedUserValue };
				const responseUser = await axios.put(
					`/users/update/${this.props.userId}`,
					userData
				);
				const postData = {
					oldUserName: this.props.currentUserName,
					updatedUserName: this.state.updatedUserValue,
				};
				const responsePost = await axios.post("/posts/update/post", postData);

				this.setState({
					updatedUserValue: "",
				});
				this.props.setCurrentUserName(responseUser.data.userName);
				this.props.setPosts(responsePost.data.posts);
				this.props.setUserPosts(
					responsePost.data.posts.filter((post) => {
						return post.userName === responseUser.data.userName;
					})
				);
				this.props.setSuccessMessage("You have updated your username!");

				setTimeout(() => {
					this.props.setSuccessMessage("");
				}, 5000);
			} catch (error) {
				if (this.props.currentUserName === "") {
					alert("Error: You have not signed in.");
				} else {
					alert(
						"Error: The new username you entered already exists. Please pick a different username."
					);
				}
			}
		} else {
			alert(
				"Error: The username does not match requirements. Username must be between 3 and 16 characters, only consisting of letters, numbers, underscores, or dashes."
			);
		}
	};

	render() {
		return (
			<div>
				<h1
					style={{
						textAlign: "center",
						paddingTop: "20px",
						paddingBottom: "20px",
					}}
				>
					Edit User
				</h1>
				<div className="UserChange">
					<div className="delete-user">
						<h3>Delete User</h3>
						<form onSubmit={this.deleteUser}>
							<p>
								Enter your username to confirm you want to delete your user.
							</p>
							<input
								type="text"
								className="form-control"
								placeholder="Enter your username"
								value={this.state.deleteUserValue}
								onChange={this.handleDeleteUser}
								style={{ width: "100%", marginBottom: "25px" }}
							/>
							{this.props.successMessage === "You have deleted your user." && (
								<p style={{ color: "green" }}>{this.props.successMessage}</p>
							)}
							<input type="submit" className="btn btn-danger" />
						</form>
					</div>
					<div className="change-username">
						<h3>Change Username</h3>
						<form onSubmit={this.updateUser}>
							<p>
								Enter your new username. The username must be between 3 and 16
								characters, only consisting of letters, numbers, underscores, or
								dashes.
							</p>
							<input
								type="text"
								className="form-control"
								placeholder="Enter your username"
								value={this.state.updatedUserValue}
								onChange={this.handleUpdatedUser}
								style={{ width: "100%", marginBottom: "25px" }}
							/>
							{this.props.successMessage ===
								"You have updated your username!" && (
								<p style={{ color: "green" }}>{this.props.successMessage}</p>
							)}
							<input type="submit" className="btn btn-danger" value="Confirm" />
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(UserChange);
