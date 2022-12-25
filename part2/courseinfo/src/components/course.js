const Header = (props) => <h2>{props.course}</h2>;

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

const Content = (props) => {
  const { parts } = props;
  return (
    <>
      {parts.map((item) => (
        <Part key={item.id} part={item.name} exercise={item.exercises} />
      ))}
    </>
  );
};

const Total = (props) => {
  const { parts } = props;
  return (
    <p>
      <b>
        Total of exercises{" "}
        {parts.reduce((accumulator, item) => accumulator + item.exercises, 0)}
      </b>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
