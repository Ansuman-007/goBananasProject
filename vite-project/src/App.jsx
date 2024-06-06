import React, { useState, useEffect } from 'react';
import axios from 'axios';



import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';




import './App.css'; // Import the App.css file

const App = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">GoBananas App</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" style={{ marginTop: '20px' }}>
        <TextField
          label="Search Posts"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          fullWidth
          style={{ marginBottom: '20px' }}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Body</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.body}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default App;