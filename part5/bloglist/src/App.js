import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  //user
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  //message
  const [callbackMessage, setCallbackMessage] = useState(null);

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog).sort((a, b) => b.likes - a.likes));
      setCallbackMessage({
        type: "success",
        content: `a new blog ${returnedBlog.title} by ${user.name} added`,
      });
    } catch (error) {
      setCallbackMessage({
        type: "error",
        content: error.message,
      });
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId);
      let blogTitle = "";
      const newBlogs = blogs
        .filter((blog) => blog.id !== blogId)
        .sort((a, b) => b.likes - a.likes);
      setBlogs(newBlogs);
      setCallbackMessage({
        type: "success",
        content: ` blog ${blogTitle} deleted`,
      });
    } catch (error) {
      setCallbackMessage({
        type: "error",
        content: error.message,
      });
    }
  };

  const likeClick = async (blogObject, blogId) => {
    try {
      const returnedBlog = await blogService.update(blogObject, blogId);
      const updatedBlogs = blogs
        .map((blog) => {
          if (blog.id === blogId) {
            return returnedBlog;
          }
          return blog;
        })
        .sort((a, b) => b.likes - a.likes);
      setBlogs(updatedBlogs);
      setCallbackMessage({
        type: "success",
        content: ` blog ${returnedBlog.title} by ${user.name} updated`,
      });
    } catch (error) {
      setCallbackMessage({
        type: "error",
        content: error.message,
      });
    }
  };

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setCallbackMessage({
        type: "success",
        content: `${user.name} login successful`,
      });
    } catch (error) {
      if (error.name === "AxiosError") {
        setCallbackMessage({
          type: "error",
          content: "wrong username or password",
        });
      }
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser", JSON.stringify(user));
    setCallbackMessage({
      type: "success",
      content: `${user.name} logout successful`,
    });
  };

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
    console.log(blogs);
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={callbackMessage} />
      {user ? (
        <div>
          <div>
            {user.name} logged in<button onClick={handleLogout}>logout</button>
          </div>

          <Togglable buttonLabel="new blog">
            <BlogForm addBlog={addBlog} />
          </Togglable>

          <br />
          <Blogs blogs={blogs} likeClick={likeClick} deleteBlog={deleteBlog} />
        </div>
      ) : (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}
    </div>
  );
};

export default App;
