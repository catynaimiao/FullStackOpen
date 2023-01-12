import { useDispatch } from "react-redux";
import { addAnecdote, getId } from "../reducers/anecdoteReducer";
import { setNotifaction } from "../reducers/notificationReducer";

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
    dispatch(addAnecdote(newObject));
    dispatch(setNotifaction(`you created anecdote "${content}"`));
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
