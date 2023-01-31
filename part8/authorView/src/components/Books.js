import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../utils/queries";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState(null);

  if (!props.show || result.loading) {
    return null;
  }

  const books = result.data.allBooks;
  const genres = Array.from(new Set(books.map((b) => b.genres).flat()).keys());
  const showBooks = genre
    ? books.filter((b) => b.genres.includes(genre))
    : books;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {showBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => {
              setGenre(g);
            }}
          >
            {g}
          </button>
        ))}
        <button
          onClick={() => {
            setGenre(null);
          }}
        >
          all genres
        </button>
      </div>
    </div>
  );
};

export default Books;
