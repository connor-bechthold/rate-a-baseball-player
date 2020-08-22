import React from "react";
import "./AllPosts.css";

class AllPosts extends React.Component {
	displayAllPosts = () => {
		if (this.props.exercises.length === 0) {
			return "";
		} else {
			let posts = this.props.exercises.map((post) => {
				return (
					<div key={post._id} className="post">
						<p>{`Posted by ${post.userName}`}</p>
						<p>{`Player: ${post.playerName}`}</p>
						<p>{`Rating out of 10: ${post.playerRating}`}</p>
						<p>{`${post.ratingDescription}`}</p>
						<p>{`Posted at: ${post.postedAt}`}</p>
					</div>
				);
			});
			return posts;
		}
	};

	render() {
		return (
			<div className="AllPosts">
				<h1
					style={{
						textAlign: "center",
						paddingTop: "20px",
						paddingBottom: "20px",
					}}
				>
					All Posts
				</h1>
				<div className="grid">
					{this.displayAllPosts() === "" && (
						<p style={{ width: "100%", textAlign: "center" }}>
							No posts available.
						</p>
					)}
					{this.displayAllPosts() && this.displayAllPosts()}
				</div>
			</div>
		);
	}
}

export default AllPosts;
