import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Container,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import BlogCreateFrom from "./BlogCreateForm";

const Blogs = () => {
  const blogs = useSelector((data) => data.blogs);

  return (
    <Box>
      <Container sx={{ mt: 2 }}>
        <BlogCreateFrom />

        <Box component={Paper}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h4">Blog list</Typography>
          </Box>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">url</TableCell>
                  <TableCell align="right">likes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blogs.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Link to={`/blogs/${row.id}`}>{row.title}</Link>
                    </TableCell>
                    <TableCell align="right">{row.url}</TableCell>
                    <TableCell align="right">{row.likes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Box>
  );
};

const BlogPage = () => {
  //const user = useSelector((data) => data.login);
  return <Blogs />;
};

export default BlogPage;
