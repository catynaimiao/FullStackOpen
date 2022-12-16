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
  const { parts } = props;
  return (
    <>
      {parts.map((item, index) => (
        <Part key={index} part={item.name} exercise={item.exercises} />
      ))}
    </>
  );
};

const Total = (props) => {
  const { parts } = props;
  return (
    <p>
      Number of exercises{" "}
      {parts.reduce((accumulator, item) => accumulator + item.exercises, 0)}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
