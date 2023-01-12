import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdote";

export const getId = () => (100000 * Math.random()).toFixed(0);

const initialState = []; //anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    voteById: (state, action) => {
      const id = action.payload;
      const newState = state
        .map((anecdote) => {
          if (anecdote.id === id) {
            return { ...anecdote, votes: anecdote.votes + 1 };
          } else {
            return anecdote;
          }
        })
        .sort((a, b) => b.votes - a.votes);
      return newState;
    },
    addAnecdote: (state, action) => {
      return state.concat(action.payload).sort((a, b) => b.votes - a.votes);
    },
    appendAnecdote: (state, action) => {
      const anecdotes = action.payload;
      anecdotes.forEach((anecdote) => {
        state.push(anecdote);
      });
    },
    appendOneAnecdote: (state, action) => {
      const anecdote = action.payload;
      state.push(anecdote);
    },
    setAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const {
  voteById,
  addAnecdote,
  appendAnecdote,
  appendOneAnecdote,
  setAnecdotes,
} = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const notes = await anecdoteService.getAll();
    dispatch(setAnecdotes(notes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newNote = await anecdoteService.createNew(content);
    dispatch(appendOneAnecdote(newNote));
  };
};

export const voteById2Backend = (newObject) => {
  return async (dispatch) => {
    await anecdoteService.updateById(newObject);
    dispatch(voteById(newObject.id));
  };
};

export default anecdoteSlice.reducer;
