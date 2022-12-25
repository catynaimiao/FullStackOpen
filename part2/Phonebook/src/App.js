import { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ condition, handleConditionChange }) => {
  return (
    <div>
      filter shown with:
      <input value={condition} onChange={handleConditionChange} />
    </div>
  );
};

const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name}>
          <b>
            {person.name} {person.number}
          </b>
        </p>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [condition, setCondition] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      const persons = response.data;
      setPersons(persons);
    });
  }, []);

  const handleConditionChange = (event) => {
    setCondition(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      alert(`${newName} is already added to Numberbook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
    }
    setNewName("");
    setNewNumber("");
  };

  const persons2show = persons.filter((person) =>
    person.name.includes(condition)
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        condition={condition}
        handleConditionChange={handleConditionChange}
      />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons2show} />
    </div>
  );
};

export default App;
