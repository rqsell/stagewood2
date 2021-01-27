import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";

// Mutations
const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $username: String!
    $picture: String!
    $name: String!
  ) {
    signup(
      email: $email
      password: $password
      username: $username
      picture: $picture
      name: $name
    ) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
// Login Function that creates form state and passes in mutations
const Login = ({ setUser }) => {
  const history = useHistory();
  const [formState, setFormState] = useState({
    login: true,
    email: "",
    password: "",
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      console.log(login.token);
      window.location.replace("/profile");
    },
  });
  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      username: formState.username,
      picture: formState.picture,
      password: formState.password,
    },
    onCompleted: ({ signup }) => {
      console.log(AUTH_TOKEN, signup.token);
      localStorage.setItem(AUTH_TOKEN, signup.token);
      history.push("/profile");
    },
  });
  return (
    <div className="formpage">
      <h1 className="header">{formState.login ? "Login" : "Sign Up"}</h1>
      <div className="form">
        {!formState.login && (
          <>
            <h4>Name</h4>
            <input
              required
              value={formState.name}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  name: e.target.value,
                })
              }
              type="name"
              placeholder="Anything you like"
            />
            <h4>Username</h4>
            <input
              required
              value={formState.username}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  username: e.target.value,
                })
              }
              type="username"
              placeholder="Username"
            />
            <h4>Picture Url</h4>
            <input
              required
              value={formState.picture}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  picture: e.target.value,
                })
              }
              type="picture"
              placeholder="A url to your image"
            />
          </>
        )}
        <h4>Email</h4>
        <input
          required
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value,
            })
          }
          type="text"
          placeholder="Your email address"
        />
        <h4>Password</h4>
        <input
          required
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value,
            })
          }
          type="password"
          placeholder="Choose a safe password"
        />

        <div className="buttonbox">
          <button
            to="/profile"
            className="button2"
            onClick={formState.login ? login : signup}
            style={{ textDecoration: "none", color: "black" }}
          >
            {formState.login ? "login" : "signup"}
          </button>
          <button
            className="button"
            onClick={(e) =>
              setFormState({
                ...formState,
                login: !formState.login,
              })
            }
          >
            {formState.login ? "Need to sign up?" : "Need to login?"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
