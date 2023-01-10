require("dotenv").config();

const PORT = process.env.PORT;

let _URI = "";
switch (process.env.NODE_ENV) {
  case "test":
    _URI = process.env.TEST_MONGODB_URI;
    break;
  case "development":
    _URI = process.env.DEVELOPMENT_MONGODB_URI;
    break;
  case "production":
    _URI = process.env.MONGODB_URI;
    break;
}
const MONGODB_URI = _URI;

const loginJson = {
  username: process.env.TEST_USERNAME,
  password: process.env.TEST_PASSWORD,
};

module.exports = {
  MONGODB_URI,
  PORT,
  loginJson,
};
