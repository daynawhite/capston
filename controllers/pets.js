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
  const replacements = ['pet', 'id', req.params.id]
  sql = mysql.format(sql, replacements)

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createPet = (req, res) => {
  // INSERT INTO PETS NAME 
  let sql = 'INSERT INTO ?? (??) VALUES (?)'
  const replacements = ['pets', 'pet_name', req.body.pet_name]
  
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
  const replacements = ['pets', 'pet_name', req.body.pet_name, 'id', selectedPetId]
  sql = mysql.format(sql, replacements)

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deletePetByPetName = (req, res) => {
  // DELETE FROM PETS WHERE PET NAME = <REQ PARAMS PET_NAME>
  let sql = "DELETE FROM ?? WHERE ?? = ?"
  const replacements = ['pets', 'pet_name', req.params.pet_name]
  sql = mysql.format(sql, replacements);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} pet(s)` });
  })
}

module.exports = {
  getAllPets,
  getPetById,
  createPet,
  updatePetById,
  deletePetByPetName
}