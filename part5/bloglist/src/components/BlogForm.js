const BlogForm = ({
  addBlog,
  newTitle,
  setNewTitle,
  newAuthor,
  setNewAuthor,
  newUrl,
  setNewUrl,
}) => {
  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <div>
          Title
          <input
            type="text"
            value={newTitle}
            name="Title"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          Url
          <input
            type="text"
            value={newUrl}
            name="Url"
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
