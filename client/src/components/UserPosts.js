import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./UserPosts.css";

class UserPosts extends React.Component {
	displayUserPosts = () => {
		if (this.props.userExercises.length === 0 && this.props.currentUserName) {
			return (
				<p style={{ textAlign: "center", width: "100%" }}>
					There are no posts for this user.
				</p>
			);
		} else if (this.props.userExercises.length === 0) {
			return (
				<p style={{ textAlign: "center", width: "100%" }}>
					There is nobody signed in.
				</p>
			);
		} else {
			let posts = this.props.userExercises.map((post) => {
				return (
					<div key={post._id} className="post">
						<div className="info">
							<p>{`Posted by ${post.userName}`}</p>
							<p>{`Player: ${post.playerName}`}</p>
							<p>{`Rating out of 10: ${post.playerRating}`}</p>
							<p>{`${post.ratingDescription}`}</p>
							<p>{`Posted at: ${post.postedAt}`}</p>
						</div>
						<div className=" buttons">
							<button
								className="btn btn-success edit"
								postid={post._id}
								onClick={this.handlePostEdit}
							>
								Edit Post
							</button>
							<button
								postid={post._id}
								className="btn btn-danger delete"
								onClick={this.handlePostDelete}
							>
								Delete Post
							</button>
						</div>
					</div>
				);
			});
			return posts;
		}
	};

	handlePostDelete = async (e) => {
		e.preventDefault();
		try {
			const id = e.currentTarget.getAttribute("postid");
			// eslint-disable-next-line
			const response = await axios.delete(`/posts/delete/post/${id}`);
			this.props.setUserExercises(
				this.props.userExercises.filter((post) => {
					return post._id !== id;
				})
			);
			this.props.setExercises(
				this.props.exercises.filter((post) => {
					return post._id !== id;
				})
			);
		} catch (error) {
			console.log(error.response.data.error);
		}
	};

	handlePostEdit = async (e) => {
		e.preventDefault();
		try {
			const id = e.currentTarget.getAttribute("postid");
			const response = await axios.get(`posts/${id}`);

			this.props.setEditPlayerValue(response.data.data.playerName);
			this.props.setEditPlayerRating(response.data.data.playerRating);
			this.props.setEditPlayerDescription(response.data.data.ratingDescription);
			this.props.setPostId(id);
			this.props.history.push("/editpost");
		} catch (error) {
			console.log(error.response.data.error);
		}
	};

	render() {
		return (
			<div className="UserPosts">
				<h1
					style={{
						textAlign: "center",
						paddingTop: "20px",
						paddingBottom: "20px",
					}}
				>
					User Posts
				</h1>
				<div className="grid">
					{this.displayUserPosts() && this.displayUserPosts()}
				</div>
			</div>
		);
	}
}

export default withRouter(UserPosts);
