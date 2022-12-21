import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [mostVote, setMostVote] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const nextAnecdote = () => {
    const length = anecdotes.length;
    const selected = Math.floor(Math.random() * length);
    setSelected(selected);
  };

  const vote = () => {
    const temppoints = [...points];
    temppoints[selected] += 1;
    const mostVote = temppoints.indexOf(Math.max(...temppoints));
    setMostVote(mostVote);
    setPoints(temppoints);
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <button onClick={vote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[mostVote]}</div>
    </div>
  );
};

export default App;
