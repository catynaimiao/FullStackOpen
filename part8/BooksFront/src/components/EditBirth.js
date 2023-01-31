import { useField } from "../utils/commonHooks";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR, ALL_AUTHORS } from "../utils/queries";
import { useState } from "react";

const EditBirth = (props) => {
  const [selectName, setSelectName] = useState("");
  const { clearValue: clearBorn, ...born } = useField("number");
  const [editAuthor] = useMutation(EDIT_AUTHOR);

  const selectChanged = (event) => {
    setSelectName(event.target.value);
  };

  const submit = (event) => {
    event.preventDefault();

    console.log("edit Birth");

    editAuthor({
      variables: { name: selectName, setBornTo: Number(born.value) },
      refetchQueries: [{ query: ALL_AUTHORS }],
    });

    setSelectName("");
    clearBorn();
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <label>
            Name
            <select value={selectName} onChange={selectChanged}>
              {props.authors.map((a) => (
                <option value={a.name} key={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          born
          <input {...born} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default EditBirth;
