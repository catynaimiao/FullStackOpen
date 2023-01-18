import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";

import blogsService from "./services/blogs";
import usersService from "./services/users";

import { setBlogs } from "./reducers/blog/blogReducer";
import { setUsers } from "./reducers/user/userReducer";

import LoginPage from "./pages/LoginPage/LoginPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import Blog from "./pages/BlogPage/Blog";
import User from "./pages/UserPage/User";
import UserPage from "./pages/UserPage/UserPage";
import MenuHome from "./components/MenuHome";
import Notification from "./components/Notification";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((data) => data.login);

  useEffect(() => {
    blogsService.getAll().then((blogs) => {
      dispatch(setBlogs(blogs));
    });
    const user = JSON.parse(window.localStorage.getItem("user"));
    if (user) {
      blogsService.setToken(user.token);
    }
  }, []);

  const blogs = useSelector((data) => data.blogs);
  const matchBlog = useMatch("/blogs/:id");

  useEffect(() => {
    usersService.getAll().then((users) => {
      dispatch(setUsers(users));
    });
  }, [blogs]);

  let blog = {};
  if (matchBlog) {
    blog = blogs.find((blog) => blog.id === matchBlog.params.id);
  }

  const users = useSelector((data) => data.users);
  const matchUser = useMatch("/users/:id");
  let userinfo = {};
  if (matchUser) {
    userinfo = users.find((item) => item.id === matchUser.params.id);
  }

  return (
    <>
      <MenuHome />
      <Notification />
      <Routes>
        <Route
          path="/blogs"
          element={
            user ? <BlogPage /> : <Navigate to="/login" replace={true} />
          }
        />
        <Route
          path="/users"
          element={
            user ? <UserPage /> : <Navigate to="/login" replace={true} />
          }
        />
        <Route path="/login" element={<LoginPage />} />

        {blog ? (
          <Route path="/blogs/:id" element={<Blog blog={blog} />} />
        ) : (
          <Route
            path="/blogs/:id"
            element={<Navigate to="/blogs" replace={true} />}
          />
        )}
        {userinfo ? (
          <Route path="/users/:id" element={<User user={userinfo} />} />
        ) : (
          <Route
            path="/users/:id"
            element={<Navigate to="/users" replace={true} />}
          />
        )}
      </Routes>
    </>
  );
};

export default App;
