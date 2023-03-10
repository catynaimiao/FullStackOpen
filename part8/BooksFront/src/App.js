import { useEffect, useState } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Recommendation from "./components/Recommendation";
import Login from "./components/Login";
import { BOOK_ADDED, ALL_BOOKS } from "./utils/queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const bookAdded = data.data.bookAdded;
      window.alert(`book ${bookAdded.title} has been added!`);
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(bookAdded),
        };
      });
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  useEffect(() => {
    const token = localStorage.getItem("books-user-token");
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommendation")}>
              recommendation
            </button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommendation show={page === "recommendation"} />

      <Login setToken={setToken} show={page === "login"} setPage={setPage} />
    </div>
  );
};

export default App;
