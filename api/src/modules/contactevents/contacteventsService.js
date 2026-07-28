//--------------------------------------------------------
export default {
  getAllContactevents,
  getContacteventById,
  createContactevent,
  updateContactevent,
  deleteContactevent
}
//--------------------------------------------------------
export async function getAllContactevents(pg, contact_id) {
  return await pg.query('SELECT * FROM contactevent WHERE contact_id = $1', [contact_id])
}
//--------------------------------------------------------
export async function getContacteventById(pg, id) {
  return await pg.query('SELECT * FROM contactevent WHERE id = $1', [id])
}
//--------------------------------------------------------
export async function createContactevent(pg, contactevent) {
  return await pg.query(
    `INSERT INTO contactevent (
       contact_id,
       event_name,
       event_type,
       event_value,
       event_action
     )
     VALUES ($1,$2,$3,$4,$5)
     RETURNING *`,
    [
      contactevent.contact_id,
      contactevent.event_name,
      contactevent.event_type,
      contactevent.event_value,
      contactevent.event_action
    ]
  )
}
//--------------------------------------------------------
export async function updateContactevent(pg, contactevent) {
  return await pg.query(
    `UPDATE contactevent
     SET contact_id = $2,
         event_name = $3,
         event_type = $4,
         event_value = $5,
         event_action = $6
     WHERE id = $1
     RETURNING *`,
    [
      contactevent.id,
      contactevent.contact_id,
      contactevent.event_name,
      contactevent.event_type,
      contactevent.event_value,
      contactevent.event_action
    ]
  )
}
//--------------------------------------------------------
export async function deleteContactevent(pg, contactevent) {
  return await pg.query('DELETE FROM contactevent WHERE id = $1', [contactevent.id])
}