import React, { Component } from "react";
import { firebaseSignWithGoogle } from "services/firebase";

class SignIn extends Component {
  state = { email: "", password: "" };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ email: "", password: "" });
  };
  signWithGoogle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    firebaseSignWithGoogle();
  };

  render() {
    const { email, password } = this.state;

    return (
      <form className="SignIn" onSubmit={this.handleSubmit}>
        <h2>Sign In</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={this.handleChange}
        />
        <input type="submit" value="Sign In" />
        <button onClick={this.signWithGoogle}>Sign In With Google</button>
      </form>
    );
  }
}

export default SignIn;
