const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (password.length < 3) {
    response
      .status(401)
      .json({ error: "The password length needs to be more than 3 " });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const userInDb = await User.findOne({ username });

  const unique = userInDb ? !(username === userInDb.username) : true;

  if (!unique) {
    response.status(401).json({ error: "The username is not unique" });
  }

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
    id: 1,
  });
  response.json(users);
});

module.exports = usersRouter;
