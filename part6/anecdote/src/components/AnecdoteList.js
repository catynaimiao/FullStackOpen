import { useSelector, useDispatch } from "react-redux";
import { setNotifaction } from "../reducers/notificationReducer";
import { voteById } from "../reducers/anecdoteReducer";

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
    dispatch(voteById(id));
    dispatch(setNotifaction(`you voted "${anecdote.content}"`));
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
