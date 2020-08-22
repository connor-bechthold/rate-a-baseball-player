import React from "react";
import axios from "axios";
import "./Home.css";
import { withRouter } from "react-router-dom";

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			newUserValue: "",
			userValue: "",
			newPasswordValue: "",
			passwordValue: "",
		};
	}

	handleNewUserChange = (e) => {
		this.setState({
			newUserValue: e.target.value,
		});
	};

	handleNewPasswordChange = (e) => {
		this.setState({
			newPasswordValue: e.target.value,
		});
	};

	handlePasswordChange = (e) => {
		this.setState({
			passwordValue: e.target.value,
		});
	};

	addUser = async (e) => {
		e.preventDefault();
		if (/^[a-z0-9_-]{3,16}$/gim.test(this.state.newUserValue)) {
			if (
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/gim.test(
					this.state.newPasswordValue
				)
			) {
				try {
					const data = {
						userName: this.state.newUserValue,
						password: this.state.newPasswordValue,
					};
					// eslint-disable-next-line
					const response = await axios.post("/users/add", data);
					this.setState({
						newUserValue: "",
						newPasswordValue: "",
					});
					this.props.setSuccessMessage("User has been created!");
					setTimeout(() => {
						this.props.setSuccessMessage("");
					}, 5000);
				} catch (error) {
					alert("Error: User already exists.");
				}
			} else {
				alert(
					"Error: Password must be at least 5 characters, containing at least one uppercase letter, lowercase letter, and number "
				);
			}
		} else {
			alert(
				"Error: New username does not match requirements. Username must be between 3 and 16 characters, only consisting of letters, numbers, underscores, or dashes."
			);
		}
	};

	handleUserChange = (e) => {
		this.setState({
			userValue: e.target.value,
		});
	};

	getUserId = async (e) => {
		e.preventDefault();
		try {
			const data = {
				userName: this.state.userValue,
				password: this.state.passwordValue,
			};
			const responseId = await axios.post("/users/id", data);
			const responseUser = await axios.post("posts/user", data);

			this.setState({
				userValue: "",
				passwordValue: "",
			});

			this.props.setUserId(responseId.data.id);
			this.props.setCurrentUserName(responseId.data.userName);
			this.props.setUserExercises(responseUser.data.data);
			this.props.setSuccessMessage("You have signed in!");

			setTimeout(() => {
				this.props.setSuccessMessage("");
			}, 5000);
			this.props.history.push("/createpost");
		} catch (error) {
			if (error.response.data.error === "Invalid Password") {
				alert("Error: Username or password is incorrect.");
			} else {
				alert("Error: Username or password is incorrect.");
			}
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
					Home
				</h1>
				<p
					style={{
						textAlign: "center",
						paddingLeft: "10px",
						paddingRight: "10px",
					}}
				>
					Welcome to Rate A Baseball Player! Make sure to create a user or sign
					in below to create a post. You can see what everyone else is saying on
					the "All Posts" link above.
				</p>
				<div className="Home">
					<div className="add-user">
						<h3 style={{ textAlign: "center" }}>Add a user</h3>
						<p>
							A new username must be between 3 and 16 characters, only
							consisting of letters, numbers, underscores, or dashes.
						</p>
						<form onSubmit={this.addUser}>
							<input
								type="text"
								className="form-control"
								placeholder="Enter a new username"
								value={this.state.newUserValue}
								onChange={this.handleNewUserChange}
								style={{ width: "100%", marginBottom: "15px" }}
							/>
							<p>
								Password must be at least 5 characters, containing at least one
								uppercase letter, lowercase letter, and number.
							</p>
							<input
								type="password"
								className="form-control"
								placeholder="Password"
								value={this.state.newPasswordValue}
								onChange={this.handleNewPasswordChange}
								style={{ width: "100%", marginBottom: "15px" }}
							/>
							{this.props.successMessage === "User has been created!" && (
								<p style={{ color: "green" }}>{this.props.successMessage}</p>
							)}
							<input type="submit" className="btn btn-danger" />
						</form>
					</div>
					<div className="sign-in">
						<h3 style={{ textAlign: "center" }}>Sign In</h3>
						<p>
							Sign in with your username and password. Make sure to create a
							user if you don't have a username.
						</p>
						<form onSubmit={this.getUserId}>
							<input
								type="text"
								className="form-control"
								placeholder="Enter your username"
								value={this.state.userValue}
								onChange={this.handleUserChange}
								style={{ width: "100%", marginBottom: "25px" }}
							/>
							<input
								type="password"
								className="form-control"
								placeholder="Password"
								value={this.state.passwordValue}
								onChange={this.handlePasswordChange}
								style={{ width: "100%", marginBottom: "25px" }}
							/>

							<input type="submit" className="btn btn-danger" />
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Home);
