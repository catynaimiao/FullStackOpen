import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (num) => () => {
    if (num === -1) {
      setBad(bad + 1);
    }
    if (num === 0) {
      setNeutral(neutral + 1);
    }
    if (num === 1) {
      setGood(good + 1);
    }
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleClick(1)} text="good" />
      <Button handleClick={handleClick(0)} text="neutral" />
      <Button handleClick={handleClick(-1)} text="bad" />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  const sign = text === "positive" ? "%" : "";
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value}
        {sign}
      </td>
    </tr>
  );
};
//<StatisticLine text="good" value ={...} />

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / (good + neutral + bad);
  const positive = good / (good + neutral + bad);
  if (all > 0)
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    );
  return (
    <>
      <p>No feedback given</p>
    </>
  );
};

export default App;
