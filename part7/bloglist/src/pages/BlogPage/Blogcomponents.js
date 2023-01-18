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
import blogsService from "../../services/blogs";
import { updateBlog } from "../../reducers/blog/blogReducer";
import {
  setNotification,
  clearNotification,
  setTimeId,
} from "../../reducers/notification/notificationReducer";

const BlogcomponentForm = ({ blog }) => {
  const dispatch = useDispatch();
  const { timeId } = useSelector((data) => data.notification);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const { clearValue: clearComment, ...comment } = useField("text");

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
    const newBlog = { ...blog, comments: blog.comments.concat(comment.value) };
    const updatedBlog = await blogsService.update(newBlog, newBlog.id);
    console.log(updatedBlog);
    dispatch(updateBlog(updatedBlog));
    showNotification("success", "success comment");
  };

  const handleReset = (event) => {
    event.preventDefault();
    clearComment();
  };

  return (
    <Box sx={{ my: 2, p: 2 }} component={Paper}>
      <Typography variant="h4">
        say sth.
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
              <TextField label="comment" variant="outlined" {...comment} />
              <ButtonGroup>
                <Button variant="outlined" type="submit">
                  submit
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

export default BlogcomponentForm;
