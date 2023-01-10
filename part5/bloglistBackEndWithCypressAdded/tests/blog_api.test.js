const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const { loginJson } = require("../utils/config");

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];

let loggedInToken = null;

beforeEach(async () => {
  api
  .post("/api/login")
  .send(loginJson)
  .end((err, response) => {
    loggedInToken = "bearer " + response.body.token;
  });

  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();

});

describe("api integration test", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are two blogs", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(2);
  });

  test("the first blog is about HTTP methods", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].title).toBe("React patterns");
  });

  test("all notes are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("a specific blog is within the returned title", async () => {
    const response = await api.get("/api/blogs");

    const contents = response.body.map((r) => r.title);
    expect(contents).toContain("Go To Statement Considered Harmful");
  });

  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
    };

    console.log(loggedInToken);

    await api
      .post("/api/blogs")
      .set("Authorization", loggedInToken)
      .send(newBlog)
      .expect("Content-Type", /application\/json/)
      .expect(201);

    const response = await api.get("/api/blogs");

    const titles = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(titles).toContain("TDD harms architecture");
  });

  test("blog without content is not added", async () => {
    const newBlog = {
      title: "TDD harms architecture",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", loggedInToken)
      .send(newBlog)
      .expect(400);

    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("deleting a single blog post resource", async () => {
    const newBlog = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", loggedInToken)
      .send(newBlog)
      .expect(201);
    await api
      .delete(`/api/blogs/${response.body.id}`)
      .set("Authorization", loggedInToken)
      .expect(204);
  });

  test("updating the information of an individual blog post", async () => {
    const initialBlog = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", loggedInToken)
      .send(initialBlog)
      .expect(201);

    const initialUpdateBlog = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 5,
    };

    const verifyBlog = {
      ...initialUpdateBlog,
      id: response.body.id,
      user: response.body.user,
    };

    await api
      .put(`/api/blogs/${response.body.id}`)
      .send(initialUpdateBlog)
      .set("Authorization", loggedInToken)
      .expect(200);

    const updateResponse = await api
      .get(`/api/blogs/${response.body.id}`)
      .expect(200);

    expect(verifyBlog).toEqual(updateResponse.body);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
