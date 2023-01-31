import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/queries";
import { useField } from "../utils/commonHooks";

const Login = (props) => {
  const { clearValue: clearUsername, ...username } = useField("text");
  const { clearValue: clearPassword, ...password } = useField("password");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      props.setToken(token);
      localStorage.setItem("books-user-token", token);
    }
  }, [result.data]); // eslint-disable-line

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    login({
      variables: { username: username.value, password: password.value },
    });
    props.setPage("authors");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input {...username} />
        </div>
        <div>
          password
          <input {...password} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
