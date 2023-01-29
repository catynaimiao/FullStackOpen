const Book = require("../models/Book");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const Author = require("../models/Author");
const User = require("../models/User");
const { SECRET } = require("../utils/config");

const Query = {
  allBooks: async (root, args) => {
    return Book.find({});
  },
  allAuthors: async (root, args) => {
    return Author.find({});
  },
  bookCount: async (root, args) => {
    const counts = await Book.collection.countDocuments();
    return counts;
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
  Author: {
    bookCount: async (root, args) => {
      const count = await Book.find({ author: root.id });
      return count.length;
    },
  },
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
};

module.exports = resolvers;