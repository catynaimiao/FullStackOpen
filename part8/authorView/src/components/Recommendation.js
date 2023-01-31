import { useQuery } from "@apollo/client";
import { BOOK_BY_GENRE } from "../utils/queries";

const Recommendation = (props) => {
  const token = localStorage.getItem("books-user-token");
  const result = useQuery(BOOK_BY_GENRE, { skip: !token });

  if (!props.show || result.loading) {
    return null;
  }
  
  const books = result.data.bookByGenre;

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
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendation;
