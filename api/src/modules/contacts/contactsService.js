//--------------------------------------------------------
export default {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
}
//--------------------------------------------------------
export async function getAllContacts(pg, useraccount_id) {
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
       contact_useraccount_id,
       relationship,
       tags,
       first_name,
       last_name,
       middle_name,
       title,
       suffix,
       date_of_birth,
       sex,
       company,
       job_title,
       web_address,
       mobile_number
     )
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
     RETURNING *`,
    [
      contact.code,
      contact.useraccount_id,
      contact.contact_useraccount_id,
      contact.relationship,
      contact.tags,
      contact.first_name,
      contact.last_name,
      contact.middle_name,
      contact.title,
      contact.suffix,
      contact.date_of_birth,
      contact.sex,
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
         contact_useraccount_id = $4,
         relationship = $5,
         tags = $6,
         first_name = $7,
         last_name = $8,
         middle_name = $9,
         title = $10,
         suffix = $11,
         date_of_birth = $12,
         sex = $13,
         company = $14,
         job_title = $15,
         web_address = $16,
         mobile_number = $17,
         updated_on = NOW()
     WHERE id = $1
     RETURNING *`,
    [
      contact.id,
      contact.code,
      contact.useraccount_id,
      contact.contact_useraccount_id,
      contact.relationship,
      contact.tags,
      contact.first_name,
      contact.last_name,
      contact.middle_name,
      contact.title,
      contact.suffix,
      contact.date_of_birth,
      contact.sex,
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