import express from 'express';
import path from 'path';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the React app build directory
app.use(express.static("./build"));

// Handles any requests that don't match the ones above
app.get('/', (req, res) => {
  res.sendFile(path.join("./build/index.html"));
});

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// make request to flask service
app.get('/api/flask', (req, res) => {
  axios.get('http://flask:5000/api/hello')
    .then(response => {
      res.json({ message: "Hello from flask service" });
    })
    .catch(error => {
      res.json({ message: 'Error fetching data from Flask service' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
