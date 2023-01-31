import { useState } from "react";
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../utils/queries";
import { useMutation } from "@apollo/client";
import { useField } from "../utils/commonHooks";

const NewBook = (props) => {
  const { clearValue: clearTitle, ...title } = useField("text");
  const { clearValue: clearAuthor, ...author } = useField("text");
  const { clearValue: clearPublished, ...published } = useField("number");
  const { clearValue: clearGenre, ...genre } = useField("text");
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK);

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    console.log("add book...");

    addBook({
      variables: {
        title: title.value,
        author: author.value,
        published: Number(published.value),
        genres: genres,
      },
      refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
      update: (cache, response) => {
        console.log(response.data);
      },
    });

    clearTitle();
    clearAuthor();
    clearPublished();
    clearGenre();
    setGenres([]);
  };

  const addGenre = () => {
    setGenres(genres.concat(genre.value));
    clearGenre();
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input {...title} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          published
          <input {...published} />
        </div>
        <div>
          <input {...genre} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
