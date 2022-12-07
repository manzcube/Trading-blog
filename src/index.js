import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

export const PostContext = createContext({
  orderOfPost: 0,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <PostContext.Provider value={PostContext}>
      <App />
    </PostContext.Provider>
  </BrowserRouter>
);
