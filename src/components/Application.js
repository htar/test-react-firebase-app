import React, { Component } from "react";
import FirestoreService from "../services/FirebaseService";
import Posts from "./Posts";

class Application extends Component {
  state = {
    posts: [],
  };
  componentDidMount = async () => {
    await FirestoreService.getPosts((posts) => {
      this.setState({ posts });
    });
  };

  handleCreate = (post) => {
    const { posts } = this.state;
    FirestoreService.setPost(post, () =>
      this.setState({ posts: [post, ...posts] })
    );
  };

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts posts={posts} onCreate={this.handleCreate} />
      </main>
    );
  }
}

export default Application;
