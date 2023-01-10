const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce(
    (allLikes, blog, currentIndex, array) => allLikes + blog.likes,
    0
  );
};

const favoriteBlog = (blogs) => {
  const { title, author, likes } = blogs.sort(
    (preblog, blog) => blog.likes - preblog.likes
  )[0];
  return {
    title,
    author,
    likes,
  };
};

const mostBlogs = (blogs) => {
  const authors = new Map();
  blogs.forEach((blog) => {
    const blogsCount = authors.has(blog.author)
      ? authors.get(blog.author) + 1
      : 1;
    authors.set(blog.author, blogsCount);
  });
  let author = { author: null, blogs: 0 };
  authors.forEach((value, key) => {
    if (value >= author.blogs) {
      author.author = key;
      author.blogs = value;
    }
  });
  return author;
};

const mostLikes = (blogs) => {
  const authors = new Map();
  blogs.forEach((blog) => {
    const likesCount = authors.has(blog.author)
      ? authors.get(blog.author) + blog.likes
      : blog.likes;
    authors.set(blog.author, likesCount);
  });
  let author = { author: null, likes: 0 };
  authors.forEach((value, key) => {
    if (value >= author.likes) {
      author.author = key;
      author.likes = value;
    }
  });
  return author;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
