const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const taskRoutes = require('./routes/tasks');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));  // To support PUT, PATCH, and DELETE via forms
app.use(express.static('public'));   // For serving static files like CSS

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/api/tasks', taskRoutes);

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
