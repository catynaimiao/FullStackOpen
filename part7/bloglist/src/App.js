import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import blogsService from "./services/blogs";
import { setBlogs } from "./reducers/blog/blogReducer";
import LoginPage from "./pages/LoginPage/LoginPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import Blog from "./pages/BlogPage/Blog";

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

  return (
    <>
      <MenuHome />
      <Notification />
      <Routes>
        <Route
          path="*"
          element={
            user ? (
              <Navigate to="/blogs" replace={true} />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default App;
