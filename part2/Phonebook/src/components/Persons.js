const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name}>
          <b>
            {person.name} {person.number}
          </b>{" "}
          <button onClick={handleDelete(person.id, person.name)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
