import { useDispatch } from "react-redux";
import { AddAnecdote, getId } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    const newObject = {
      content,
      id: getId(),
      votes: 0,
    };
    dispatch(AddAnecdote(newObject));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
