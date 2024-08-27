const { pool } = require("../config");

async function createUser({ id, first_name, last_name, username }) {
  const user = await getUserById(id);

  if (!user.length) {
    const query = {
      text: `INSERT INTO public.user (id, first_name, last_name, username) VALUES ($1, $2, $3, $4)`,
      values: [id, first_name, last_name, username]
    };
    await pool.query(query);
  }
}

async function getUserById(id) {
  const query = {
    text: `SELECT FROM public.user WHERE id=$1`,
    values: [id],
  };
  const user = await pool.query(query);

  return user.rows;
};

module.exports = { createUser, getUserById };
