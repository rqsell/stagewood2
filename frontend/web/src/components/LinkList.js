import React, { useEffect, useState } from "react";
import { useQuery, gql, graphql } from "@apollo/client";

const LinkList = ({ user }) => {
  return (
    <div className="formpage">
      <h1>Profile</h1>
      <div className="form">
        <img
          className="imagecover"
          src={user?.picture ? user?.picture : "./bluedude.png"}
        />

        <h3>Name: {user?.name}</h3>
        <h3>Username:{user?.username} </h3>
        <h3>Email: {user?.email} </h3>
      </div>
    </div>
  );
};

export default LinkList;
