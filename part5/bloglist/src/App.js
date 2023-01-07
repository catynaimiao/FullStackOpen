import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  //user
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  //blog
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  //message
  const [callbackMessage, setCallbackMessage] = useState(null);

  const addBlog = async (event) => {
    event.preventDefault();

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };

    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");

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

  const handleLogin = async (e) => {
    e.preventDefault();

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
    blogService.getAll().then((blogs) => setBlogs(blogs));
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

          <BlogForm
            addBlog={addBlog}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            newAuthor={newAuthor}
            setNewAuthor={setNewAuthor}
            newUrl={newUrl}
            setNewUrl={setNewUrl}
          />

          <br />
          <Blogs blogs={blogs} />
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
