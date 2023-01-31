const Book = require("../models/Book");
const jwt = require("jsonwebtoken");
const { UserInputError, AuthenticationError } = require("apollo-server");
const Author = require("../models/Author");
const User = require("../models/User");
const { SECRET } = require("../utils/config");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const Query = {
  allBooks: async (root, args) => {
    return Book.find({});
  },
  allAuthors: async (root, args) => {
    const authors = await Author.find({});
    const books = await Book.find({}).populate("author");
    const allAuthors = authors.map((a) => {
      a.bookCount = books.filter((b) => b.author.name === a.name).length;
      return a;
    });
    return allAuthors;
  },
  bookCount: async (root, args) => {
    const counts = await Book.collection.countDocuments();
    return counts;
  },
  bookByGenre: async (root, args, context) => {
    if (!context.currentUser) {
      throw new AuthenticationError("not authenticated");
    }
    return Book.find({ genres: context.currentUser.favouriteGenre });
  },
  me: (root, args, context) => {
    return context.currentUser;
  },
};

const Mutation = {
  addBook: async (root, args, context) => {
    const currentUser = context.currentUser;
    if (!currentUser) {
      throw new AuthenticationError("not authenticated");
    }

    try {
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author, born: null });
        author = await author.save();
      }
      let newBook = new Book({ ...args, author });
      newBook = await newBook.save();

      pubsub.publish("BOOK_ADDED", { bookAdded: newBook });

      return newBook;
    } catch (error) {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      });
    }
  },
  editAuthor: async (root, args, context) => {
    const currentUser = context.currentUser;
    if (!currentUser) {
      throw new AuthenticationError("not authenticated");
    }

    const updateAuthor = await Author.findOne({ name: args.name });
    try {
      updateAuthor.born = args.setBornTo;
      await updateAuthor.save();
    } catch (error) {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      });
    }
    return updateAuthor;
  },
  createUser: async (root, args) => {
    const user = new User({
      username: args.username,
      favouriteGenre: args.favouriteGenre,
    });

    return user.save().catch((error) => {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      });
    });
  },
  login: async (root, args) => {
    const user = await User.findOne({ username: args.username });

    if (!user || args.password !== "secret") {
      throw new UserInputError("wrong credentials");
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    return { value: jwt.sign(userForToken, SECRET) };
  },
};

const resolvers = {
  Query,
  Mutation,
  Book: {
    author: async (root, args) => {
      let author = await Author.findById(root.author);
      if (!author) {
        author = new Author({ name: args.author, born: null });
        author = await author.save();
      }
      const count = await Book.find({ author: author._id });
      return {
        id: author._id,
        bookCount: count.length,
        name: author.name,
        born: author.born,
      };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
