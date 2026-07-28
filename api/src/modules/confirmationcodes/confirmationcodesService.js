//--------------------------------------------------------
export default {
  getAllConfirmationcodes,
  getConfirmationcodeByCode,
  createConfirmationcode,
  updateConfirmationcode,
  deleteConfirmationcode
}
//--------------------------------------------------------
export async function getAllConfirmationcodes(pg, useraccount_id) {
  return await pg.query('SELECT * FROM confirmationcode WHERE useraccount_id = $1', [useraccount_id])
}
//--------------------------------------------------------
export async function getConfirmationcodeByCode(pg, code) {
  return await pg.query('SELECT * FROM confirmationcode WHERE code = $1', [code])
}
//--------------------------------------------------------
export async function createConfirmationcode(pg, confirmationcode) {
  return await pg.query(
    `INSERT INTO confirmationcode (code, useraccount_id, expires)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [confirmationcode.code, confirmationcode.useraccount_id, confirmationcode.expires]
  )
}
//--------------------------------------------------------
export async function updateConfirmationcode(pg, confirmationcode) {
  return await pg.query(
    `UPDATE confirmationcode
     SET useraccount_id = $2, expires = $3
     WHERE code = $1
     RETURNING *`,
    [confirmationcode.code, confirmationcode.useraccount_id, confirmationcode.expires]
  )
}
//--------------------------------------------------------
export async function deleteConfirmationcode(pg, confirmationcode) {
  return await pg.query('DELETE FROM confirmationcode WHERE code = $1', [confirmationcode.code])
}