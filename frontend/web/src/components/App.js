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
          <button onClick={() => navigateTo(PAGE_CART)}>Cart</button>

          <button onClick={() => navigateTo(PAGE_PRODUCTS)}>
            View Products
          </button>
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
          <Route
            exact
            path="/items"
            render={(props) => (
              <Items user={user} Cart={cart} setCart={setCart} {...props} />
            )}
          />
          <Route
            exact
            path="/cart"
            render={(props) => (
              <Cart user={user} Cart={cart} setCart={setCart} {...props} />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
