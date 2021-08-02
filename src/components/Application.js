import React, { Component } from "react";
import FirestoreService from "services/FirebaseService";
import Posts from "./Posts";

class Application extends Component {
  state = {
    posts: [],
  };
  componentDidMount = () => {
    FirestoreService.getPosts((posts) => {
      this.setState({ posts });
    });
  };

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts posts={posts} />
      </main>
    );
  }
}

export default Application;
