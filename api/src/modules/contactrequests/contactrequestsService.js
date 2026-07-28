//--------------------------------------------------------
export default {
  getAllContactrequests,
  getContactrequestById,
  createContactrequest,
  updateContactrequest,
  deleteContactrequest
}
//--------------------------------------------------------
export async function getAllContactrequests(pg, useraccount_id) {
  return await pg.query('SELECT * FROM contentrequest WHERE useraccount_id = $1', [useraccount_id])
}
//--------------------------------------------------------
export async function getContactrequestById(pg, id) {
  return await pg.query('SELECT * FROM contentrequest WHERE id = $1', [id])
}
//--------------------------------------------------------
export async function createContactrequest(pg, contactrequest) {
  return await pg.query(
    `INSERT INTO contentrequest (
       useraccount_id,
       contact_id,
       content_type,
       content_code,
       viewed_on
     )
     VALUES ($1,$2,$3,$4,$5)
     RETURNING *`,
    [
      contactrequest.useraccount_id,
      contactrequest.contact_id,
      contactrequest.content_type,
      contactrequest.content_code,
      contactrequest.viewed_on
    ]
  )
}
//--------------------------------------------------------
export async function updateContactrequest(pg, contactrequest) {
  return await pg.query(
    `UPDATE contentrequest
     SET useraccount_id = $2,
         contact_id = $3,
         content_type = $4,
         content_code = $5,
         viewed_on = $6
     WHERE id = $1
     RETURNING *`,
    [
      contactrequest.id,
      contactrequest.useraccount_id,
      contactrequest.contact_id,
      contactrequest.content_type,
      contactrequest.content_code,
      contactrequest.viewed_on
    ]
  )
}
//--------------------------------------------------------
export async function deleteContactrequest(pg, contactrequest) {
  return await pg.query('DELETE FROM contentrequest WHERE id = $1', [contactrequest.id])
}