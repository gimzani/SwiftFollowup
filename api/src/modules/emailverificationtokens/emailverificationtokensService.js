//--------------------------------------------------------
export default {
  listMyEmailVerificationTokens,
  getEmailVerificationToken,
  createEmailVerificationToken,
  updateEmailVerificationToken,
  deleteEmailVerificationToken
}
//--------------------------------------------------------
export async function listMyEmailVerificationTokens(pg, useraccount_id) {
  return await pg.query('SELECT * FROM emailverificationtoken WHERE useraccount_id = $1', [useraccount_id])
}
//--------------------------------------------------------
export async function getEmailVerificationToken(pg, token) {
  return await pg.query('SELECT * FROM emailverificationtoken WHERE token = $1', [token])
}
//--------------------------------------------------------
export async function createEmailVerificationToken(pg, emailVerificationToken) {
  return await pg.query(
    `INSERT INTO emailverificationtoken (
       useraccount_id,
       token,
       expires_on
     )
     VALUES ($1,$2,$3)
     RETURNING *`,
    [
      emailVerificationToken.useraccount_id,
      emailVerificationToken.token,
      emailVerificationToken.expires_on
    ]
  )
}
//--------------------------------------------------------
export async function updateEmailVerificationToken(pg, emailVerificationToken) {
  return await pg.query(
    `UPDATE emailverificationtoken
     SET useraccount_id = $2,
         token = $3,
         expires_on = $4
     WHERE id = $1
     RETURNING *`,
    [
      emailVerificationToken.id,
      emailVerificationToken.useraccount_id,
      emailVerificationToken.token,
      emailVerificationToken.expires_on
    ]
  )
}
//--------------------------------------------------------
export async function deleteEmailVerificationToken(pg, emailVerificationToken) {
  return await pg.query('DELETE FROM emailverificationtoken WHERE id = $1', [emailVerificationToken.id])
}
