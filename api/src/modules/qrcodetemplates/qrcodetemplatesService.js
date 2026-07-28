//--------------------------------------------------------
export default {
  getAllQrcodetemplates,
  getQrcodetemplateById,
  createQrcodetemplate,
  updateQrcodetemplate,
  deleteQrcodetemplate
}
//--------------------------------------------------------
export async function getAllQrcodetemplates(pg) {
  return await pg.query('SELECT * FROM qrcodetemplate')
}
//--------------------------------------------------------
export async function getQrcodetemplateById(pg, id) {
  return await pg.query('SELECT * FROM qrcodetemplate WHERE id = $1', [id])
}
//--------------------------------------------------------
export async function createQrcodetemplate(pg, qrcodetemplate) {
  return await pg.query(
    `INSERT INTO qrcodetemplate (qrcode_name, qrcode_description, qrcode_data)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [qrcodetemplate.qrcode_name, qrcodetemplate.qrcode_description, qrcodetemplate.qrcode_data]
  )
}
//--------------------------------------------------------
export async function updateQrcodetemplate(pg, qrcodetemplate) {
  return await pg.query(
    `UPDATE qrcodetemplate
     SET qrcode_name = $2, qrcode_description = $3, qrcode_data = $4, updated_on = NOW()
     WHERE id = $1
     RETURNING *`,
    [qrcodetemplate.id, qrcodetemplate.qrcode_name, qrcodetemplate.qrcode_description, qrcodetemplate.qrcode_data]
  )
}
//--------------------------------------------------------
export async function deleteQrcodetemplate(pg, qrcodetemplate) {
  return await pg.query('DELETE FROM qrcodetemplate WHERE id = $1', [qrcodetemplate.id])
}