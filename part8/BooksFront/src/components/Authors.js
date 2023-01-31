import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../utils/queries";
import EditBirth from "../components/EditBirth";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const token = localStorage.getItem("books-user-token");

  if (!props.show || result.loading) {
    return null;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token ? <EditBirth authors={authors} /> : null}
    </div>
  );
};

export default Authors;
