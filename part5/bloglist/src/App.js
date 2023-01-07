import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import LoginForm from "./components/loginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await loginService.login({ username, password });
    setUser(user);
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser", JSON.stringify(user));
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

      {user ? (
        <>
          <div>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </div>
          <br />
          <Blogs blogs={blogs} />
        </>
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
