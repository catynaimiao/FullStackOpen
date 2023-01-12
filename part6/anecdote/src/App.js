import AnecdoteList from "./components/AnecdoteList";
import ConnectedNotification from "./components/ConnectedNotification";
import ConnectedFilter from "./components/ConnectedFilter";
import ConnectedAnecdoteForm from "./components/ConnectedAnecdoteForm";

import { initializeAnecdotes } from "./reducers/anecdoteReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <ConnectedNotification />
      <ConnectedFilter />
      <AnecdoteList />
      <ConnectedAnecdoteForm />
    </div>
  );
};

export default App;
