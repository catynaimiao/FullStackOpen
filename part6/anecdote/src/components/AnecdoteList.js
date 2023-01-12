import { useSelector, useDispatch } from "react-redux";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";
import { voteById2Backend } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const state = useSelector((state) => ({
    allAnecdotes: state.anecdotes,
    filter: state.filter,
  }));
  const { allAnecdotes, filter } = state;

  const anecdotes = allAnecdotes.filter((anecdote) => {
    return anecdote.content.includes(filter);
  });

  const dispatch = useDispatch();

  const vote = (id) => {
    const anecdote = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(voteById2Backend(anecdote));
    dispatch(setNotification(`you voted "${anecdote.content}"`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
