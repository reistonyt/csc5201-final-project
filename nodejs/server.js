import express from 'express';
import path from 'path';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();
const __build = path.join(__dirname, 'build');

// Serve static files from the React app build directory
app.use(express.static(__build));

// Handles requests to the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__build, 'index.html'));
});

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// Fetch data from the Flask service
app.get('/api/news/summarize', async (req, res) => {
  try {
    const response = await axios.get('http://flask:5000/api/news/summarize');
    res.json({ message: response.data });
  } catch (error) {
    res.json({ message: 'Error fetching data from Flask service: ' + error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
