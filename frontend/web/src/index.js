import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter } from "react-router-dom";
// import * as serviceWorker from "./serviceWorker";

// 1
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

// Backend Link
const httpLink = createHttpLink({
  uri: "https://secure-ravine-62793.herokuapp.com/",
});

// Auth Token
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("auth-token");
  console.log(token);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
// 3
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
//

// 4
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
// serviceWorker.unregister();
