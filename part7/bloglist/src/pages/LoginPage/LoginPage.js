import { useField } from "../../hooks/utils/index";
import { login, logout } from "../../reducers/login/loginReducer";
import {
  setNotification,
  clearNotification,
  setTimeId,
} from "../../reducers/notification/notificationReducer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import loginService from "../../services/login";
import blogsService from "../../services/blogs";
import {
  TextField,
  Box,
  Button,
  ButtonGroup,
  Stack,
  Paper,
  Alert,
  Container,
} from "@mui/material";

const LoginPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((data) => data.login);
  const navigate = useNavigate();

  const { clearValue: clearUsername, ...username } = useField("text");
  const { clearValue: clearPassword, ...password } = useField("password");

  const { timeId } = useSelector((data) => data.notification);
  const showNotification = (type, text) => {
    if (timeId) {
      clearTimeout(timeId);
    }
    dispatch(setNotification({ type, text }));
    let newTimeid = setTimeout(() => {
      dispatch(clearNotification());
      dispatch(setTimeId(null));
    }, 3000);
    dispatch(setTimeId(newTimeid));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = await loginService.login({
      username: username.value,
      password: password.value,
    });
    blogsService.setToken(user.token);
    dispatch(login(user));
    showNotification("success", `${username.value} has logged in`);
    navigate("/");
    if (window) {
      window.localStorage.setItem("user", JSON.stringify(user));
    }
    //console.log(`username :[${username.value}] password :[${password.value}]`);
  };

  const handleReset = (event) => {
    event.preventDefault();
    clearUsername();
    clearPassword();
  };

  const handleLogout = (event) => {
    event.preventDefault();
    if (window) {
      window.localStorage.removeItem("user");
    }
    showNotification("success", `${username.value} has logout`);
    dispatch(logout());
  };

  return (
    <Box>
      <Container>
        <Paper
          elevation={3}
          sx={{
            mx: "auto",
            mt: "2em",
            p: 4,
          }}
        >
          {!user ? (
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
              onReset={handleReset}
            >
              <Stack spacing={2}>
                <TextField label="username" variant="outlined" {...username} />
                <TextField label="password" variant="outlined" {...password} />
                <ButtonGroup>
                  <Button variant="outlined" type="submit">
                    Login
                  </Button>
                  <Button variant="outlined" type="reset">
                    reset
                  </Button>
                </ButtonGroup>
              </Stack>
            </Box>
          ) : (
            <Box>
              <Alert severity="success">{user.name} logged in</Alert>
              <Button variant="contained" sx={{ mt: 2 }} onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
