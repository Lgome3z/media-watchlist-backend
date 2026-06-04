const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Middleware to allow your frontend to talk to the backend safely
app.use(cors());
app.use(express.json());

// Your fully updated data array with all media categories matching the frontend exactly
let watchlist = [
  { id: "1", title: "Inception", category: "Movie", status: "Watched" },
  { id: "2", title: "Interstellar", category: "Movie", status: "Want to Watch" },
  { id: "3", title: "Edward Tulane", category: "Audiobook", status: "Want to Watch" },
  { id: "4", title: "Project Hail Mary", category: "Soundtrack", status: "Watched" }
];

// 1. GET ROUTE: Sends the entire array back to your React frontend on load
app.get('/api/watchlist', (req, res) => {
  res.json(watchlist);
});

// 2. POST ROUTE: Receives a new item from your frontend "Add" button and saves it
app.post('/api/watchlist', (req, res) => {
  const newItem = req.body;
  watchlist.push(newItem); // Adds it to the server list
  res.json(watchlist);    // Sends back the updated list so the screen updates instantly
});

// Start the server listening on port 5001
app.listen(PORT, () => {
  console.log(`🚀 Backend server is running perfectly on http://localhost:${PORT}`);

  app.delete('/api/watchlist/:id', (req, res) => {
  const { id } = req.params;
  // Filter out the item with the matching ID
  watchlist = watchlist.filter(item => item.id !== id);
  res.json(watchlist); // Send back the updated list
});
});