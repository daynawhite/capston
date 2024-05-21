const mysql = require('mysql')
const pool = require('../sql/connections')
const { handleSQLError } = require('../sql/error')

const getAllPets = (req, res) => {

  pool.query("SELECT * FROM pets", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getPetById = (req, res) => {
  let sql = 'SELECT * FROM ?? WHERE ?? = ?'
  const replacements = ['pet_info', 'id', req.params.id]
  sql = mysql.format(sql, replacements)

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getPetsByUserId = (req, res) => {
  let sql = 'SELECT * FROM ?? WHERE ?? = ?'
  const replacements = ['pet_info', 'user_id', req.user_id]
  sql = mysql.format(sql, replacements)
console.log(sql)
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createPet = (req, res) => {
  // INSERT INTO PETS NAME 
  let sql = 'INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)'
  const replacements = ['pet_info', 'user_id', 'pet_name', 'animal_type', req.user_id, req.body.pet_name, req.body.animal_type]
  
  sql = mysql.format(sql, replacements)

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updatePetById = (req, res) => {
  // UPDATE PET NAME WHERE ID = <REQ PARAMS ID>
  const selectedPetId = req.params.id;
  let sql = "UPDATE ?? SET ?? = ?, ?? = ?  WHERE ?? = ?"
  const replacements = ['pet_info', 'pet_name', req.body.pet_name, 'id', selectedPetId]
  sql = mysql.format(sql, replacements)

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deletePetByPetName = (req, res) => {
  // DELETE FROM PETS WHERE PET NAME = <REQ PARAMS PET_NAME>
  let sql = "DELETE FROM ?? WHERE ?? = ?"
  const replacements = ['pet_info', 'pet_name', req.params.pet_name]
  sql = mysql.format(sql, replacements);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} pet(s)` });
  })
}

module.exports = {
  getAllPets,
  getPetById,
  getPetsByUserId,
  createPet,
  updatePetById,
  deletePetByPetName
}