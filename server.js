const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

// MIDDLEWARE (The server configuration filters)
app.use(cors()); // Allows your React app to connect safely
app.use(express.json()); // Allows the server to read JSON data sent by React

// Our temporary backend "database" array
let backendWatchlist = [
  { id: "1", title: "Inception", category: "Movie", status: "Watched" },
  { id: "2", title: "Interstellar", category: "Movie", status: "Plan to Watch" }
];

// ==========================================
// 1. GET ROUTE: Sends the entire list to React
// ==========================================
app.get('/api/watchlist', (req, res) => {
  res.json(backendWatchlist);
});

// ==========================================
// 2. POST ROUTE: Receives a new item and saves it
// ==========================================
app.post('/api/watchlist', (req, res) => {
  const newItem = req.body; // Grabs the movie object sent by React
  backendWatchlist.push(newItem); // Adds it to our server array
  res.status(201).json(newItem); // Responds back saying "Success!"
});

// ==========================================
// 3. DELETE ROUTE: Destroys an item by its ID
// ==========================================
app.delete('/api/watchlist/:id', (req, res) => {
  const { id } = req.params; // Grabs the ID barcode out of the URL path
  backendWatchlist = backendWatchlist.filter(item => item.id !== id);
  res.json({ message: "Item successfully removed from server!" });
});


// STARTING THE ENGINE
app.listen(PORT, () => {
  console.log(`Backend server is firing on cylinders at http://localhost:${PORT}`);
});