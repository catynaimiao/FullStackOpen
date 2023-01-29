const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { MONGODB_URI } = require("./utils/config");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./utils/typeDefs");
const resolvers = require("./utils/resolvers");
const { SECRET } = require("./utils/config");
const User = require("./models/User");

async function startApolloServer(typeDefs, resolvers) {
  await mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("connected to MongoDB");
    })
    .catch((error) => {
      console.log("error connection to MongoDB:", error.message);
    });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith("bearer ")) {
        const decodedToken = jwt.verify(auth.substring(7), SECRET);
        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      }
    },
  });

  const { url } = await server.listen();
  console.log(`🚀 Server ready at ${url}`);
}

startApolloServer(typeDefs, resolvers);
