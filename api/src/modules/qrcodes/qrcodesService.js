//--------------------------------------------------------
export default {
  listMyQrcodes,
  getQrcodeById,
  getQrcodeByCode,
  createQrcode,
  updateQrcode,
  deleteQrcode
}
//--------------------------------------------------------
export async function listMyQrcodes(pg, useraccount_id) {
  return await pg.query('SELECT * FROM qrcode WHERE useraccount_id = $1 ORDER BY qrcode_name ASC', [useraccount_id])
}
//--------------------------------------------------------
export async function getQrcodeById(pg, id) {
  return await pg.query('SELECT * FROM qrcode WHERE id = $1', [id])
}
//--------------------------------------------------------
export async function getQrcodeByCode(pg, code) {
  return await pg.query('SELECT * FROM qrcode WHERE code = $1', [code])
}
//--------------------------------------------------------
export async function createQrcode(pg, qrcode) {
  return await pg.query(
    `INSERT INTO qrcode (
       useraccount_id,
       code,
       qrcode_name,
       qrcode_description,
       qrcode_data
     )
     VALUES ($1,$2,$3,$4,$5)
     RETURNING *`,
    [
      qrcode.useraccount_id,
      qrcode.code,
      qrcode.qrcode_name,
      qrcode.qrcode_description,
      qrcode.qrcode_data
    ]
  )
}
//--------------------------------------------------------
export async function updateQrcode(pg, qrcode) {
  return await pg.query(
    `UPDATE qrcode
     SET useraccount_id = $2,
         code = $3,
         qrcode_name = $4,
         qrcode_description = $5,
         qrcode_data = $6,
         updated_on = NOW()
     WHERE id = $1
     RETURNING *`,
    [
      qrcode.id,
      qrcode.useraccount_id,
      qrcode.code,
      qrcode.qrcode_name,
      qrcode.qrcode_description,
      qrcode.qrcode_data
    ]
  )
}
//--------------------------------------------------------
export async function deleteQrcode(pg, qrcode) {
  return await pg.query('DELETE FROM qrcode WHERE id = $1', [qrcode.id])
}
