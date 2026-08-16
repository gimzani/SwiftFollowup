//--------------------------------------------------------
export default {
  listContacteventsByContentRequestId,
  listContacteventsByContactId,
  getContacteventById,
  createContactevent,
  updateContactevent,
  deleteContactevent
}
//--------------------------------------------------------
export async function listContacteventsByContentRequestId(pg, contentrequest_id) {
  return await pg.query('SELECT * FROM contactevent WHERE contentrequest_id = $1', [contentrequest_id])
}
//--------------------------------------------------------
export async function listContacteventsByContactId(pg, contact_id) {
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
       contentrequest_id,
       event_name,
       event_type,
       event_value,
       event_action
     )
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING *`,
    [
      contactevent.contact_id,
      contactevent.contentrequest_id,
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
         contentrequest_id = $3,
         event_name = $4,
         event_type = $5,
         event_value = $6,
         event_action = $7
     WHERE id = $1
     RETURNING *`,
    [
      contactevent.id,
      contactevent.contact_id,
      contactevent.contentrequest_id,
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