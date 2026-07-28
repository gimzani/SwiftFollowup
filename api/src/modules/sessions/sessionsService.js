//--------------------------------------------------------
export default {
  getAllSessions,
  getSessionById,
  getSessionByToken,
  createSession,
  updateSession,
  deleteSession,
  deleteUseraccountSessions,
  deleteSessionByToken
}
//--------------------------------------------------------
export async function getAllSessions(pg, useraccount_id) {
  return await pg.query('SELECT * FROM session WHERE useraccount_id = $1', [useraccount_id])
}
//--------------------------------------------------------
export async function getSessionById(pg, id) {
  return await pg.query('SELECT * FROM session WHERE id = $1', [id])
}
//--------------------------------------------------------
export async function getSessionByToken(pg, token) {
  return await pg.query('SELECT * FROM session WHERE session_token = $1', [token])
}
//--------------------------------------------------------
export async function createSession(pg, session) {
  return await pg.query(
    `INSERT INTO session (
       useraccount_id,
       session_token,
       ip_address,
       user_agent,
       expires_on
     )
     VALUES ($1,$2,$3,$4,$5)
     RETURNING *`,
    [
      session.useraccount_id,
      session.session_token,
      session.ip_address,
      session.user_agent,
      session.expires_on
    ]
  )
}
//--------------------------------------------------------
export async function updateSession(pg, session) {
  return await pg.query(
    `UPDATE session
     SET useraccount_id = $2,
         session_token = $3,
         ip_address = $4,
         user_agent = $5,
         expires_on = $6,
         updated_on = NOW()
     WHERE id = $1
     RETURNING *`,
    [
      session.id,
      session.useraccount_id,
      session.session_token,
      session.ip_address,
      session.user_agent,
      session.expires_on
    ]
  )
}
//--------------------------------------------------------
export async function deleteSession(pg, session) {
  return await pg.query('DELETE FROM session WHERE id = $1', [session.id])
}

//--------------------------------------------------------
export async function deleteUseraccountSessions(pg, useraccount_id) {
  return await pg.query('DELETE FROM session WHERE useraccount_id = $1', [useraccount_id])
}
//--------------------------------------------------------
export async function deleteSessionByToken(pg, token) {
  return await pg.query('DELETE FROM session WHERE session_token = $1', [token])
}
//--------------------------------------------------------
export async function deleteExpiredSessions(pg) {
  return await pg.query('DELETE FROM session WHERE expires_on < NOW()')
}