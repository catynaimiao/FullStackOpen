const Header = (props) => <h1>{props.course}</h1>;
// Exercise 1.2
const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

// Exercise 1.1
const Content = (props) => {
  const { exercises } = props;
  return (
    <>
      {exercises.map((exercise, index) => (
        <Part key={index} part={exercise.part} exercise={exercise.exercise} />
      ))}
    </>
  );
};
const Total = (props) => {
  const { exercises } = props;
  return (
    <p>
      Number of exercises{" "}
      {exercises.reduce((accumulator, item) => accumulator + item.exercise, 0)}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const exercises = [
    { part: "Fundamentals of React", exercise: 10 },
    { part: "Using props to pass data", exercise: 10 },
    { part: "State of a component", exercise: 14 },
  ];
  return (
    <div>
      <Header course={course} />
      <Content exercises={exercises} />
      <Total exercises={exercises} />
    </div>
  );
};

export default App;
