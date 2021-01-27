import React, { useEffect, useState } from "react";
import { useQuery, gql, graphql } from "@apollo/client";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
const refreshPage = () => {
  window.location.reload();
};

const logout = () => {
  window.localStorage.clear();
  // client.resetStore();
};

const LinkList = ({ user }) => {
  return (
    <div className="formpage">
      {refreshPage}
      <h1>Profile</h1>
      <div className="form">
        <img
          className="imagecover"
          src={user?.picture ? user?.picture : "./bluedude.png"}
        />

        <h3>Name: {user?.name}</h3>
        <h3>Username:{user?.username} </h3>
        <h3>Email: {user?.email} </h3>
        <Link
          to="/"
          onClick={logout}
          style={{ textDecoration: "none" }}
          className="logoutbutton"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default LinkList;
