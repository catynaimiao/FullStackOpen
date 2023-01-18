import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./App";

import blogReducer from "./reducers/blog/blogReducer";
import loginReducer from "./reducers/login/loginReducer";
import userReducer from "./reducers/user/userReducer";
import notificationReducer from "./reducers/notification/notificationReducer";

import { BrowserRouter as Router } from "react-router-dom";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    login: loginReducer,
    users: userReducer,
    notification: notificationReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
