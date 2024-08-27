const { Pool } = require("pg");

const connectionString =
  "postgresql://postgres:stdLxgHLhILbgiQDdrhXAIvICNrVjvxM@autorack.proxy.rlwy.net:47654/railway";
const pool = new Pool({
  connectionString,
});
const port = process.env.PORT || 3001;

module.exports = { pool, port };
