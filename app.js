const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const config = require('./config');

// Middleware setup
app.use(express.json({ limit: '500mb' })); 
app.use(cors());

// Routes setup
app.use('', routes.user);
app.use('', routes.room);
app.use('', routes.vision);

const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
