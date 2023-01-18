import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
  Container,
  Typography,
} from "@mui/material";

const User = ({ user }) => {
  const blogs = user.blogs;
  return (
    <Box>
      <Container sx={{ mt: 2 }}>
        <Box component={Paper}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h4">{user.name}</Typography>
          </Box>
          <List>
            {blogs.map((blog) => (
              <ListItem key={blog.id}>
                <ListItemText primary={blog.title} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </Box>
  );
};

export default User;
