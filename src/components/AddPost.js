import React, { Component } from "react";
import { auth } from "services/firebase";
import FirestoreService from "services/FirebaseService";
import moment from "moment";

class AddPost extends Component {
  state = { title: "", content: "" };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  createPost = (post) => {
    FirestoreService.setPost(post);
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { title, content } = this.state;
    const { uid, displayName, email, photoURL } = auth.currentUser || {};

    debugger;
    const post = {
      id: Date.now().toString(),
      title,
      content,

      user: {
        uid,
        displayName,
        email,
        photoURL,
      },

      favorites: 0,
      comments: 0,
      createdAt: moment().format("DD/MM/YYYY"),
    };

    this.createPost(post);

    this.setState({ title: "", content: "" });
  };

  render() {
    const { title, content } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="AddPost">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="content"
          placeholder="Body"
          value={content}
          onChange={this.handleChange}
        />
        <input className="create" type="submit" value="Create Post" />
      </form>
    );
  }
}

export default AddPost;
