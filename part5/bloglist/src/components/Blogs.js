import PropTypes from "prop-types";
import Blog from "./Blog";

const Blogs = (props) => {
  const { blogs } = props;
  return (
    <>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeClick={props.likeClick}
          deleteBlog={props.deleteBlog}
        />
      ))}
    </>
  );
};

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
};

Blog.prototype = {
  blog: PropTypes.object.isRequired,
  likeClick: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blogs;
