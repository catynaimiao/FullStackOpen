import { useState, useEffect } from "react";
import personService from "./services/phone";

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

const Notification = ({ message, errstate }) => {
  if (message === null) {
    return null;
  }

  return <div className={errstate}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [condition, setCondition] = useState("");
  const [message, setMessage] = useState("some error happened...");
  const [errstate, setErrstate] = useState("");

  useEffect(() => {
    personService.getAll().then((initializePersons) => {
      setPersons(initializePersons);
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

  const setNotation = (message, errstate) => {
    setMessage(message);
    setErrstate(errstate);
  };

  const handleDelete = (id, name) => () => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .delete(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotation(`${name} has been deleted`, "success");
        })
        .catch((err) => {
          setNotation(`${name} has been deleted`, "error");
        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      if (
        window.confirm(
          `${newName} is already added to Numberbook,replace the old number with a new one?`
        )
      ) {
        const newPerson = { name: newName, number: newNumber };
        const id = persons.filter(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        )[0].id;
        personService
          .update(id, newPerson)
          .then((data) => {
            setNotation(
              `You have updated the new person ${newName}`,
              "success"
            );
            setPersons(
              persons.map((person) => (person.id !== id ? person : data))
            );
          })
          .catch((error) => {
            setNotation(`error occured ${error}`, "error");
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      personService.create(newPerson).then((data) => {
        setPersons(persons.concat(data));
        setNewName("");
        setNewNumber("");
        setNotation(`You have added ${newName}`, "success");
      });
    }
  };

  const persons2show = persons.filter((person) =>
    person.name.includes(condition)
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} errstate={errstate} />
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
      <Persons persons={persons2show} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
