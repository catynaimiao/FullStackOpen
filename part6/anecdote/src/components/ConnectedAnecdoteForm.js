import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  clearNotification,
  setTimeId,
} from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const newObject = {
      content,
      votes: 0,
    };
    props.createAnecdote(newObject);
    props.setNotification(`you created anecdote "${content}"`);

    if (!props.timeId) {
      let timeId = setTimeout(() => {
        props.clearNotification();
      }, 5000);
      console.log(timeId);
      props.setTimeId(timeId);
    } else {
      clearTimeout(props.timeId);
      let timeId = setTimeout(() => {
        props.clearNotification();
      }, 5000);
      props.setTimeId(timeId);
    }
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

const mapStateToProps = (state) => ({
  timeId: state.notification.timeId,
});

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
  clearNotification,
  setTimeId,
};

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm);
export default ConnectedAnecdoteForm;
