import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./SubmitPost.css";

class SubmitPost extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			playerValue: "",
			playerRating: "",
			playerDescription: "",
		};
	}

	handlePlayer = (e) => {
		this.setState({
			playerValue: e.target.value,
		});
	};

	handlePlayerRating = (e) => {
		this.setState({
			playerRating: e.target.value,
		});
	};

	handlePlayerDescription = (e) => {
		this.setState({
			playerDescription: e.target.value,
		});
	};

	submitPost = async (e) => {
		e.preventDefault();
		try {
			const data = {
				userName: this.props.currentUserName,
				playerName: this.state.playerValue,
				playerRating: this.state.playerRating,
				ratingDescription: this.state.playerDescription,
			};

			const userData = { userName: this.props.currentUserName };

			const responseAll = await axios.post("/posts/add", data);
			const responseUser = await axios.post("/posts/user", userData);
			this.setState({
				playerValue: "",
				playerRating: "",
				playerDescription: "",
			});
			this.props.setPosts(responseAll.data.posts);
			this.props.setUserPosts(responseUser.data.data);
			this.props.history.push("/allposts");
		} catch (error) {
			if (this.props.currentUserName === "") {
				alert("Error: You have not signed in.");
			} else {
				alert(
					"Error: Please make sure the player, rating and description fields are all filled out."
				);
			}
		}
	};

	render() {
		return (
			<div className="SubmitPost">
				<div className="flex">
					<h3 style={{ textAlign: "center" }}>Create A Post</h3>
					<form onSubmit={this.submitPost}>
						<p>Enter an MLB player's name.</p>
						<input
							maxLength="50"
							type="text"
							className="form-control"
							placeholder="Enter the player"
							value={this.state.playerValue}
							onChange={this.handlePlayer}
							style={{ width: "100%", marginBottom: "15px" }}
						/>
						<p>Select their overall rating out of 10.</p>
						<select
							className="form-control"
							style={{ width: "100%", marginBottom: "15px" }}
							value={this.state.playerRating}
							onChange={this.handlePlayerRating}
						>
							<option value="">Select A Number</option>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
							<option>6</option>
							<option>7</option>
							<option>8</option>
							<option>9</option>
							<option>10</option>
						</select>
						<p>Explain the rating (Max 280 characters).</p>
						<textarea
							maxLength="280"
							className="form-control"
							rows="3"
							placeholder="Explain rating here"
							style={{ width: "100%", marginBottom: "25px" }}
							value={this.state.playerDescription}
							onChange={this.handlePlayerDescription}
						></textarea>

						<input
							type="submit"
							className="btn btn-danger"
							value="Submit Post"
						/>
					</form>
				</div>
			</div>
		);
	}
}

export default withRouter(SubmitPost);
