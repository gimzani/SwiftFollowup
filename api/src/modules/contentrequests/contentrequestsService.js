//--------------------------------------------------------
export default {
  listMyContentrequests,
  getContentrequestById,
  createContentrequest,
  updateContentrequest,
  deleteContentrequest
}
//--------------------------------------------------------
export async function listMyContentrequests(pg, useraccount_id) {
  return await pg.query('SELECT * FROM contentrequest WHERE useraccount_id = $1 ORDER BY created_on DESC', [useraccount_id])
}
//--------------------------------------------------------
export async function getContentrequestById(pg, id) {
  return await pg.query('SELECT * FROM contentrequest WHERE id = $1', [id])
}
//--------------------------------------------------------
export async function createContentrequest(pg, contentrequest) {
  return await pg.query(
    `INSERT INTO contentrequest (
       useraccount_id,
       contact_id,
       content_type,
       content_code,
       created_on,
       viewed_on
     )
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING *`,
    [
      contentrequest.useraccount_id,
      contentrequest.contact_id,
      contentrequest.content_type,
      contentrequest.content_code,
      contentrequest.created_on,
      contentrequest.viewed_on
    ]
  )
}
//--------------------------------------------------------
export async function updateContentrequest(pg, contentrequest) {
  return await pg.query(
    `UPDATE contentrequest
     SET useraccount_id = $2,
         contact_id = $3,
         content_type = $4,
         content_code = $5,
         created_on = $6,
         viewed_on = $7
     WHERE id = $1
     RETURNING *`,
    [
      contentrequest.id,
      contentrequest.useraccount_id,
      contentrequest.contact_id,
      contentrequest.content_type,
      contentrequest.content_code,
      contentrequest.created_on,
      contentrequest.viewed_on
    ]
  )
}
//--------------------------------------------------------
export async function deleteContentrequest(pg, contentrequest) {
  return await pg.query('DELETE FROM contentrequest WHERE id = $1', [contentrequest.id])
}