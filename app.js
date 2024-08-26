const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const config = require('./config');
const telegram = require('./api/telegram');

// Middleware setup
app.use(express.json());
app.use(cors());

// Routes setup
app.use('', routes.user);

// Start server
const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
