//--------------------------------------------------------
export default {
  listMyContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
}
//--------------------------------------------------------
export async function listMyContacts(pg, useraccount_id) {
  return await pg.query('SELECT * FROM contact WHERE useraccount_id = $1', [useraccount_id])
}
//--------------------------------------------------------
export async function getContactById(pg, id) {
  return await pg.query('SELECT * FROM contact WHERE id = $1', [id])
}
//--------------------------------------------------------
export async function createContact(pg, contact) {
  return await pg.query(
    `INSERT INTO contact (
       code,
       useraccount_id,
       relationship,
       tags,
       first_name,
       last_name,
       middle_name,
       title,
       suffix,
       company,
       job_title,
       web_address,
       mobile_number
     )
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
     RETURNING *`,
    [
      contact.code,
      contact.useraccount_id,
      contact.relationship,
      contact.tags,
      contact.first_name,
      contact.last_name,
      contact.middle_name,
      contact.title,
      contact.suffix,
      contact.company,
      contact.job_title,
      contact.web_address,
      contact.mobile_number
    ]
  )
}
//--------------------------------------------------------
export async function updateContact(pg, contact) {
  return await pg.query(
    `UPDATE contact
     SET code = $2,
         useraccount_id = $3,
         relationship = $4,
         tags = $5,
         first_name = $6,
         last_name = $7,
         middle_name = $8,
         title = $9,
         suffix = $10,
         company = $11,
         job_title = $12,
         web_address = $13,
         mobile_number = $14,
         updated_on = NOW()
     WHERE id = $1
     RETURNING *`,
    [
      contact.id,
      contact.code,
      contact.useraccount_id,
      contact.relationship,
      contact.tags,
      contact.first_name,
      contact.last_name,
      contact.middle_name,
      contact.title,
      contact.suffix,
      contact.company,
      contact.job_title,
      contact.web_address,
      contact.mobile_number
    ]
  )
}
//--------------------------------------------------------
export async function deleteContact(pg, contact) {
  return await pg.query('DELETE FROM contact WHERE id = $1', [contact.id])
}