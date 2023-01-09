import { useState } from "react";

const Blog = ({ blog, likeClick, deleteBlog }) => {
  const [visible, setVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = async () => {
    const like = blog.likes ? blog.likes + 1 : 1;
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: like,
      id: blog.id,
    };
    await likeClick(newBlog, blog.id);
  };

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      await deleteBlog(blog.id);
    }
  };

  const BlogInfo = () => (
    <>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes ? blog.likes : 0}{" "}
        <button onClick={handleLike}>like</button>
      </div>
      <div>{blog.author}</div>
      <button onClick={handleRemove}>remove</button>
    </>
  );

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div style={blogStyle}>
        <div>
          {blog.title}
          <button onClick={toggleVisibility}>
            {visible ? "hide" : "view"}
          </button>
        </div>
        {visible ? <BlogInfo /> : null}
      </div>
    </>
  );
};

export default Blog;
