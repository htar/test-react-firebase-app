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
  handleRemove(id) {
    FirestoreService.deletePost(`${id}`, () => {
      console.log("Document successfully deleted!");
      const allPosts = this.state.posts;
      const posts = allPosts.filter((post) => post.id !== id);
      this.setState({ posts });
    });
  }

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts
          posts={posts}
          onCreatePost={this.handleCreate}
          onRemovePost={(id)=>this.handleRemove(id)}
        />
      </main>
    );
  }
}

export default Application;
