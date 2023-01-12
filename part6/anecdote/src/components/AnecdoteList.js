import { useSelector, useDispatch } from "react-redux";
import {
  setNotification,
  clearNotification,
  setTimeId,
} from "../reducers/notificationReducer";
import { voteById2Backend } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const state = useSelector((state) => ({
    allAnecdotes: state.anecdotes,
    filter: state.filter,
    notificationTimeId: state.notification.timeId,
  }));
  const { allAnecdotes, filter, notificationTimeId } = state;

  const anecdotes = allAnecdotes.filter((anecdote) => {
    return anecdote.content.includes(filter);
  });

  const dispatch = useDispatch();

  const vote = (id) => {
    const anecdote = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(voteById2Backend(anecdote));
    dispatch(setNotification(`you voted "${anecdote.content}"`));

    if (!notificationTimeId) {
      let timeId = setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
      dispatch(setTimeId(timeId));
    } else {
      clearTimeout(notificationTimeId);
      let timeId = setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
      dispatch(setTimeId(timeId));
    }
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
