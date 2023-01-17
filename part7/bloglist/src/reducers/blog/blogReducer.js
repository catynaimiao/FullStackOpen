import { createSlice } from "@reduxjs/toolkit";

const initialBlogs = [];

// eslint-disable-next-line no-unused-vars
const _getBlogById = (blogs, id) => {
  return blogs.find((blog) => blog.id.toString() === id.toString());
};

const _updateBlog = (blogs, newBlog) => {
  const { id } = newBlog;
  return blogs.map((blog) => {
    if (blog.id.toString() === id.toString()) {
      return newBlog;
    } else {
      return blog;
    }
  });
};

const _removeBlog = (blogs, id) => {
  return blogs.filter((blog) => blog.id.toString() !== id.toString());
};

const blogSlice = createSlice({
  name: "blogs",
  initialState: initialBlogs,
  reducers: {
    createBlog(state, action) {
      const blog = action.payload;
      state.push(blog);
    },
    updateBlog(state, action) {
      const newBlog = action.payload;
      return _updateBlog(state, newBlog);
    },
    removeBlog(state, action) {
      const id = action.payload;
      return _removeBlog(state, id);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { createBlog, updateBlog, removeBlog, setBlogs } =
  blogSlice.actions;
export default blogSlice.reducer;
