import React, { useEffect, useState, Component } from "react";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import { useQuery, gql, graphql } from "@apollo/client";
import Login from "./Login";
import LinkList from "./LinkList";
import Items from "./Items";
import Cart from "./Cart";
import "../styles/items.css";

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
const PAGE_PRODUCTS = "products";
const PAGE_CART = "cart";

const fetch = require("node-fetch");
// "https://trefle.io/api/v1/plants?token=XpgmAh9e49lJGpwiyJ9-vtxcGJbx7IrSACqWOa-2-XU&filter[common_name]=beach%20strawberry"
(async () => {
  const response = await fetch(
    "https://trefle.io/api/v1/plants?token=XpgmAh9e49lJGpwiyJ9-vtxcGJbx7IrSACqWOa-2-XU&filter[common_name]=gumbo%20limbo"
  );
  const json = await response.json();
  console.log(json);
})();

function App() {
  // state for hamburger menu
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(PAGE_PRODUCTS);

  // fetching user
  let user = useQuery(GET_USER).data?.getUser;
  console.log(user);
  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

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
        <header>
          <div className="buttonbox2">
            <div onClick={() => navigateTo(PAGE_CART)}>
              <img className="cart" src="./cart.png" />
            </div>

            <button onClick={() => navigateTo(PAGE_PRODUCTS)}>
              View Products
            </button>
          </div>
        </header>
        {page === PAGE_PRODUCTS && <Items Cart={cart} setCart={setCart} />}
        {page === PAGE_CART && <Cart Cart={cart} setCart={setCart} />}
        <Switch>
          {/* <Route exact path="/" render={(props) => <App {...props} />} /> */}
          <Route exact path="/login" render={(props) => <Login {...props} />} />
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
