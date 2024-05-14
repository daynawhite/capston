const mysql = require("mysql");
const pool = require("../sql/connections.js");
const { handleSQLError } = require("../sql/error");
const argon2 = require("argon2");
const jsonwebtoken = require("jsonwebtoken");

const login = async (req, res) => {
  let { email, password } = req.body;
  let sql = "SELECT * FROM users WHERE email = ?";
  pool.query(sql, [email], async (err, rows) => {
    if (err) return handleSQLError(res, err);
    if (!rows[0]) return res.json("user does not exist");
    else {
      const hash = rows[0].password;
      let match = await argon2.verify(hash, password);
      if (!match) return res.json("email or password is incorrect");
      let token = jsonwebtoken.sign(
        {
          id: rows[0].id,
          first_name: rows[0].first_name,
        },
        process.env.JWT_SECRET,
        { expiresIn: 600 * 100 * 100 * 10 }
      );
      return res.json({ token });
    }
  });
};

const getAllUsers = (req, res) => {
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getUserById = (req, res) => {
  let sql = "SELECT * FROM ?? WHERE ?? = ?";
  const replacements = ["users", "id", req.params.id];
  sql = mysql.format(sql, replacements);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const createUser = async (req, res) => {
  let hash = await argon2.hash(req.body.password);
  let sql = "INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)";
  const replacements = [
    "users",
    "first_name",
    "email",
    "password",
    req.body.first_name,
    req.body.email,
    hash,
  ];

  sql = mysql.format(sql, replacements);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ newId: results.insertId });
  });
};

const updateUserById = (req, res) => {
  const selectedUserId = req.params.id;
  let sql = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?  WHERE ?? = ?";
  const replacements = [
    "users",
    "first_name",
    req.body.first_name,
    "email",
    req.body.email,
    "password",
    req.body.password,
    "id",
    selectedUserId,
  ];
  sql = mysql.format(sql, replacements);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.status(204).json();
  });
};

const deleteUserByFirstName = (req, res) => {
  let sql = "DELETE FROM ?? WHERE ?? = ?";
  const replacements = ["users", "first_name", req.params.first_name];
  sql = mysql.format(sql, replacements);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserByFirstName,
  login
};
