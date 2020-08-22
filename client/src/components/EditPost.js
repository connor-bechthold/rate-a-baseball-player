import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./EditPost.css";

class EditPost extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editPlayerValue: "",
			editPlayerRating: "",
			editPlayerDescription: "",
			currentUserName: "",
			postId: "",
			exercises: "",
			userExercises: "",
		};
	}

	handlePlayerEdit = (e) => {
		this.props.setEditPlayerValue(e.target.value);
	};

	handlePlayerRatingEdit = (e) => {
		this.props.setEditPlayerRating(e.target.value);
	};

	handlePlayerDescriptionEdit = (e) => {
		this.props.setEditPlayerDescription(e.target.value);
	};

	editPost = async (e) => {
		e.preventDefault();
		try {
			const data = {
				userName: this.props.currentUserName,
				playerName: this.props.editPlayerValue,
				playerRating: this.props.editPlayerRating,
				ratingDescription: this.props.editPlayerDescription,
			};
			const responseAll = await axios.put(
				`/posts/update/${this.props.postId}`,
				data
			);

			const userData = { userName: this.props.currentUserName };

			const responseUser = await axios.post("/posts/user", userData);

			this.props.setEditPlayerValue("");
			this.props.setEditPlayerRating("");
			this.props.setEditPlayerDescription("");
			this.props.setPostId("");
			this.props.setExercises(responseAll.data.posts);
			this.props.setUserExercises(responseUser.data.data);
			this.props.history.push("/userposts");
		} catch (error) {
			console.log(error.response.data.error);
		}
	};
	render() {
		return (
			<div className="EditPost">
				<div className="flex">
					<h3 style={{ textAlign: "center" }}>Edit Post</h3>
					<form onSubmit={this.editPost}>
						<p>Enter an MLB player's name.</p>
						<input
							maxlength="50"
							type="text"
							className="form-control"
							placeholder="Enter the player"
							value={this.props.editPlayerValue}
							onChange={this.handlePlayerEdit}
							style={{ width: "100%", marginBottom: "15px" }}
						/>
						<p>Select their overall rating out of 10.</p>
						<select
							className="form-control"
							style={{ width: "100%", marginBottom: "15px" }}
							value={this.props.editPlayerRating}
							onChange={this.handlePlayerRatingEdit}
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
						<p>Explain the rating (Max length 280 characters).</p>
						<textarea
							maxLength="280"
							className="form-control"
							rows="3"
							placeholder="Explain rating here"
							style={{ width: "100%", marginBottom: "25px" }}
							value={this.props.editPlayerDescription}
							onChange={this.handlePlayerDescriptionEdit}
						></textarea>

						<input type="submit" className="btn btn-danger" value="Edit Post" />
					</form>
				</div>
			</div>
		);
	}
}

export default withRouter(EditPost);
