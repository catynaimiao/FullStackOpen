const blogsRouter = require("express").Router();
const { request, response } = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

blogsRouter.post("/", async (request, response) => {
  const body = new Blog(request.body);

  if (!request.user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(request.user.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = request.user;
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    response.status(404).json({ error: "Not Find determine Blog" });
  } else {
    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      response.status(401).json({ error: "The blog not belong to User" });
    }
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  if (!request.user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = await Blog.findById(request.params.id);
  const user = request.user;
  if (!blog) {
    response.status(404).json({ error: "Not Find determine Blog" });
  } else {
    if (blog.user.toString() === user.id.toString()) {
      const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
      };
      const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
        runValidators: true,
        context: "query",
      });
      response.json(updateBlog);
    } else {
      response.status(401).json({ error: "The blog not belong to User" });
    }
  }
});

module.exports = blogsRouter;
