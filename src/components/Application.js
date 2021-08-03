import React, { Component } from "react";
import FirestoreService from "services/FirebaseService";
import {auth} from "services/firebase";
import Authentication from "./Authentication";
import Posts from "./Posts";

class Application extends Component {
  state = {
    posts: [],
    user: null,
  };
  componentDidMount = () => {
  
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        if (!user) return;
        const userData = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
  
        this.setState({ user: userData });
      },
      () => unsubscribe()
    );

    FirestoreService.getPosts((posts) => {
      this.setState({ posts });
    });
  };

  render() {
    const { posts, user } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication user={user} />
        <Posts user={user} posts={posts} />
      </main>
    );
  }
}

export default Application;
