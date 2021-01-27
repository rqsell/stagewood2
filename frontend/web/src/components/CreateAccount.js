import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router";
import { AUTH_TOKEN } from "../constants";
import LinkList from "./LinkList";
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
const CreateAccount = () => {
  const [formStateTwo, setFormStateTwo] = useState({
    login: true,
    email: "",
    password: "",
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formStateTwo.email,
      password: formStateTwo.password,
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      // console.log(login.token);
    },
  });
  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formStateTwo.name,
      email: formStateTwo.email,
      username: formStateTwo.username,
      picture: formStateTwo.picture,
      password: formStateTwo.password,
    },
    onCompleted: ({ signup }) => {
      console.log(AUTH_TOKEN, signup.token);
      localStorage.setItem(AUTH_TOKEN, signup.token);
    },
  });
  return (
    <div>
      <h4 className="mv3">{formState.login ? "Login" : "Sign Up"}</h4>
      <div className="form">
        <div>Name</div>
        {!formStateTwo.login && (
          <div>
            <input
              required
              value={formStateTwo.name}
              onChange={(e) =>
                setFormStateTwo({
                  ...formStateTwo,
                  name: e.target.value,
                })
              }
              type="text"
              placeholder="Your name"
            />
            <input
              required
              value={formStateTwo.email}
              onChange={(e) =>
                setFormStateTwo({
                  ...formStateTwo,
                  email: e.target.value,
                })
              }
              type="text"
              placeholder="Your email address"
            />
          </div>
        )}
        <div>Email</div>
        <input
          required
          value={formStateTwo.email}
          onChange={(e) =>
            setFormStateTwo({
              ...formStateTwo,
              email: e.target.value,
            })
          }
          type="text"
          placeholder="Your email address"
        />
        <div>Password</div>
        <input
          required
          value={formStateTwo.password}
          onChange={(e) =>
            setFormStateTwo({
              ...formStateTwo,
              password: e.target.value,
            })
          }
          type="password"
          placeholder="Choose a safe password"
        />
        <div>Username</div>
        <input
          required
          value={formStateTwo.username}
          onChange={(e) =>
            setFormStateTwo({
              ...formStateTwo,
              username: e.target.value,
            })
          }
          type="username"
          placeholder="anything you like???"
        />
        <div>Image Url</div>
        <input
          required
          value={formStateTwo.picture}
          onChange={(e) =>
            setFormStateTwo({
              ...formStateTwo,
              picture: e.target.value,
            })
          }
          type="picture"
          placeholder="anything you like?????"
        />

        <div className="buttonbox">
          <button
            className="button"
            onClick={formStateTwo.login ? login : signup}
          >
            {formStateTwo.login ? "login" : "create account"}
          </button>
          <button
            className="button"
            onClick={(e) =>
              setFormStateTwo({
                ...formStateTwo,
                login: !formStateTwo.login,
              })
            }
          >
            {formStateTwo.login ? "Create Account" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
