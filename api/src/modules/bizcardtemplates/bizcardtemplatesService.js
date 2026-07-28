//--------------------------------------------------------
export default {
  getAllBizcardtemplates,
  getBizcardtemplateById,
  createBizcardtemplate,
  updateBizcardtemplate,
  deleteBizcardtemplate
}
//--------------------------------------------------------
export async function getAllBizcardtemplates(pg) {
  return await pg.query('SELECT * FROM bizcardtemplate')
}
//--------------------------------------------------------
export async function getBizcardtemplateById(pg, id) {
  return await pg.query('SELECT * FROM bizcardtemplate WHERE id = $1', [id])
}
//--------------------------------------------------------
export async function createBizcardtemplate(pg, bizcardtemplate) {
  return await pg.query(
    `INSERT INTO bizcardtemplate (code, bizcardtemplate_name, bizcardtemplate_description, bizcardtemplate_data)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [bizcardtemplate.code, bizcardtemplate.bizcardtemplate_name, bizcardtemplate.bizcardtemplate_description, bizcardtemplate.bizcardtemplate_data]
  )
}
//--------------------------------------------------------
export async function updateBizcardtemplate(pg, bizcardtemplate) {
  return await pg.query(
    `UPDATE bizcardtemplate
     SET code = $2, bizcardtemplate_name = $3, bizcardtemplate_description = $4, bizcardtemplate_data = $5, updated_on = NOW()
     WHERE id = $1
     RETURNING *`,
    [bizcardtemplate.id, bizcardtemplate.code, bizcardtemplate.bizcardtemplate_name, bizcardtemplate.bizcardtemplate_description, bizcardtemplate.bizcardtemplate_data]
  )
}
//--------------------------------------------------------
export async function deleteBizcardtemplate(pg, bizcardtemplate) {
  return await pg.query('DELETE FROM bizcardtemplate WHERE id = $1', [bizcardtemplate.id])
}