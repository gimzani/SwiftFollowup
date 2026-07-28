//--------------------------------------------------------
export default {
  getAllPasswordResetTokens,
  getPasswordResetTokenById,
  getPasswordResetToken,
  createPasswordResetToken,
  updatePasswordResetToken,
  deletePasswordResetToken
}
//--------------------------------------------------------
export async function getAllPasswordResetTokens(pg, useraccount_id) {
  return await pg.query('SELECT * FROM passwordresettoken WHERE useraccount_id = $1', [useraccount_id])
}
//--------------------------------------------------------
export async function getPasswordResetTokenById(pg, id) {
  return await pg.query('SELECT * FROM passwordresettoken WHERE id = $1', [id])
}
//--------------------------------------------------------
export async function getPasswordResetToken(pg, token) {
  return await pg.query('SELECT * FROM passwordresettoken WHERE token = $1', [token])
}
//--------------------------------------------------------
export async function createPasswordResetToken(pg, passwordResetToken) {
  return await pg.query(
    `INSERT INTO passwordresettoken (
       useraccount_id,
       token,
       expires_on
     )
     VALUES ($1,$2,$3)
     RETURNING *`,
    [
      passwordResetToken.useraccount_id,
      passwordResetToken.token,
      passwordResetToken.expires_on
    ]
  )
}
//--------------------------------------------------------
export async function updatePasswordResetToken(pg, passwordResetToken) {
  return await pg.query(
    `UPDATE passwordresettoken
     SET useraccount_id = $2,
         token = $3,
         expires_on = $4
     WHERE id = $1
     RETURNING *`,
    [
      passwordResetToken.id,
      passwordResetToken.useraccount_id,
      passwordResetToken.token,
      passwordResetToken.expires_on
    ]
  )
}
//--------------------------------------------------------
export async function deletePasswordResetToken(pg, token) {
  return await pg.query('DELETE FROM passwordresettoken WHERE token = $1', [token])
}