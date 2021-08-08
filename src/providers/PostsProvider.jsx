import React, { Component, createContext } from "react";
import FirestoreService from "services/FirebaseService";

export const PostsContext = createContext();

class PostsProvider extends Component {
  state = { posts: [] };

  componentDidMount = () => {
    FirestoreService.getPosts((posts) => {
      this.setState({ posts });
    });
  };

  render() {
    const { posts } = this.state;
    const { children } = this.props;

    return (
      <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
    );
  }
}

export default PostsProvider;
