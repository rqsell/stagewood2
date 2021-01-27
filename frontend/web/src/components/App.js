import React, { useEffect, useState, Component } from "react";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import { useQuery, gql, graphql } from "@apollo/client";
import Login from "./Login";
import LinkList from "./LinkList";

// passing user fetching query
const GET_USER = gql`
  {
    getUser {
      id
      name
      email
      picture
      username
    }
  }
`;

function App() {
  // state for hamburger menu
  const [open, setOpen] = useState(false);
  // fetching user
  let user = useQuery(GET_USER).data?.getUser;
  console.log(user);

  return (
    <div>
      <BrowserRouter>
        <nav role="navigation">
          <div id="menuToggle">
            <input type="checkbox" onClick={() => setOpen(!open)} />

            <span></span>
            <span></span>
            <span></span>

            <ul className="hamburgerMenu" id={!open ? "clickedmenu" : ""}>
              <Link
                to="/"
                style={{ textDecoration: "none" }}
                onClick={() => setOpen(!open)}
              >
                <li>Sign In</li>
              </Link>

              <Link
                to="/profile"
                style={{ textDecoration: "none" }}
                onClick={() => setOpen(!open)}
              >
                <li>Profile</li>
              </Link>
            </ul>
          </div>
        </nav>

        <Switch>
          <Route exact path="/" render={(props) => <Login {...props} />} />
          {/* passing the set user */}
          <Route
            exact
            path="/profile"
            render={(props) => <LinkList user={user} {...props} />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
