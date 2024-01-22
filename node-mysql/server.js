// Import required modules
const express = require('express');
const cors = require('cors');

const app = express();

var corsOptions = {
  origin: 'http://localhost:5173',
};

// mideleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
const router = require('./routes/productRoutes.js');
app.use('/api/products', router);



//  testing route for the server
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to bezkoder application.' });
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;

//server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}.`);
});
