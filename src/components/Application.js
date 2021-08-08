import React, { Component } from "react";
import FirestoreService from "services/FirebaseService";
import { auth } from "services/firebase";
import Authentication from "./Authentication";
import Posts from "./Posts";

class Application extends Component {
  state = {
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
  };

  render() {
    const { user } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication user={user} />
        <Posts user={user} />
      </main>
    );
  }
}

export default Application;
