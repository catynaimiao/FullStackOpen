import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Container,
  Box,
  Typography,
  Chip,
  Divider,
  Tooltip,
  IconButton,
  Badge,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import blogsService from "../../services/blogs";
import { updateBlog, removeBlog } from "../../reducers/blog/blogReducer";

import BlogcomponentForm from "./Blogcomponents";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 4,
    top: 32,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const style = {
  py: 1,
  px: 2,
};

const BlogComments = (props) => {
  const comments = props.comments;

  return (
    <List>
      {comments.map((item, id) => (
        <ListItem key={id}>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );
};

const BlogInfo = (props) => {
  const navigate = useNavigate();
  const blog = props;
  const dispatch = useDispatch();

  const handleLike = async () => {
    const newBlog = { ...blog, likes: blog.likes + 1 };
    const likedBlog = await blogsService.update(newBlog, blog.id);
    dispatch(updateBlog(likedBlog));
  };

  const handleRemove = async () => {
    const id = blog.id;
    await blogsService.deleteBlog(id);
    dispatch(removeBlog(id));
    navigate("/blogs");
  };

  return (
    <Box>
      <Box>
        <Typography variant="h4">
          {blog.title}
          <Tooltip title="Delete">
            <IconButton onClick={handleRemove}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Like">
            <StyledBadge badgeContent={blog.likes} color="primary">
              <IconButton onClick={handleLike}>
                <ThumbUpIcon />
              </IconButton>
            </StyledBadge>
          </Tooltip>
        </Typography>
        <Divider />
      </Box>
      <Box sx={{ py: 2 }}>
        <Typography variant="body1">{blog.url}</Typography>
        <Chip label={blog.author} />
      </Box>
    </Box>
  );
};

const Blog = (props) => {
  const blog = props.blog;

  return (
    <Box>
      <Container sx={{ mt: 2 }}>
        <Paper sx={style}>{blog ? <BlogInfo {...blog} /> : null}</Paper>
        <BlogcomponentForm blog={blog} />
        <Paper sx={style}>{blog ? <BlogComments {...blog} /> : null}</Paper>
      </Container>
    </Box>
  );
};

export default Blog;
