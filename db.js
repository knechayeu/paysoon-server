const { Pool } = require("pg");

// The secret connection string you copied earlier
const connectionString =
  "postgresql://postgres:stdLxgHLhILbgiQDdrhXAIvICNrVjvxM@autorack.proxy.rlwy.net:47654/railway";

const pool = new Pool({
  connectionString,
});

module.exports = pool;