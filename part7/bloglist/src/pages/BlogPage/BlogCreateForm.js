import {
  Box,
  Typography,
  Paper,
  TextField,
  Stack,
  ButtonGroup,
  Button,
  Switch,
  Fade,
} from "@mui/material";
import { useState } from "react";
import { useField } from "../../hooks/utils/index";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../reducers/blog/blogReducer";
import blogsService from "../../services/blogs";
import {
  setNotification,
  clearNotification,
  setTimeId,
} from "../../reducers/notification/notificationReducer";

const BlogCreateFrom = () => {
  const dispatch = useDispatch();
  const user = useSelector((data) => data.login);
  const { timeId } = useSelector((data) => data.notification);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const { clearValue: clearUrl, ...url } = useField("text");
  const { clearValue: clearAuthor, ...author } = useField("text");
  const { clearValue: clearTitle, ...title } = useField("text");

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
    const newblog = await blogsService.create({
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0,
    });
    showNotification("success", `${user.name} added new blog ${newblog.title}`);
    dispatch(createBlog(newblog));
    clearUrl();
    clearAuthor();
    clearTitle();
  };

  const handleReset = (event) => {
    event.preventDefault();
    clearUrl();
    clearAuthor();
    clearTitle();
  };

  return (
    <Box sx={{ my: 2, p: 2 }} component={Paper}>
      <Typography variant="h4">
        Create New
        <Switch checked={open} onChange={handleOpen} />
      </Typography>

      {open ? (
        <Fade in={open}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            onReset={handleReset}
            sx={{ my: 2 }}
          >
            <Stack spacing={2}>
              <TextField label="title" variant="outlined" {...title} />
              <TextField label="author" variant="outlined" {...author} />
              <TextField label="url" variant="outlined" {...url} />
              <ButtonGroup>
                <Button variant="outlined" type="submit">
                  Add
                </Button>
                <Button variant="outlined" type="reset">
                  Clear
                </Button>
              </ButtonGroup>
            </Stack>
          </Box>
        </Fade>
      ) : null}
    </Box>
  );
};

export default BlogCreateFrom;
