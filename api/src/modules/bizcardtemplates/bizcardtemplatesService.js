//--------------------------------------------------------
export default {
  listBizcardtemplates,
  getBizcardtemplateById,
  createBizcardtemplate,
  updateBizcardtemplate,
  deleteBizcardtemplate
}
//--------------------------------------------------------
export async function listBizcardtemplates(pg) {
  return await pg.query('SELECT * FROM bizcardtemplate ORDER BY bizcard_name ASC')
}
//--------------------------------------------------------
export async function getBizcardtemplateById(pg, id) {
  return await pg.query('SELECT * FROM bizcardtemplate WHERE id = $1', [id])
}
//--------------------------------------------------------
export async function createBizcardtemplate(pg, bizcardtemplate) {
  return await pg.query(
    `INSERT INTO bizcardtemplate (
      bizcard_name, 
      bizcard_description, 
      bizcard_data
    )
     VALUES ($1, $2, $3)
     RETURNING *`,
    [ bizcardtemplate.bizcard_name, bizcardtemplate.bizcard_description, bizcardtemplate.bizcard_data]
  )
}
//--------------------------------------------------------
export async function updateBizcardtemplate(pg, bizcardtemplate) {
  return await pg.query(
    `UPDATE bizcardtemplate
     SET 
      bizcard_name = $2, 
      bizcard_description = $3, 
      bizcard_data = $4, 
      updated_on = NOW()
     WHERE id = $1
     RETURNING *`,
    [bizcardtemplate.id, bizcardtemplate.bizcard_name, bizcardtemplate.bizcard_description, bizcardtemplate.bizcard_data]
  )
}
//--------------------------------------------------------
export async function deleteBizcardtemplate(pg, bizcardtemplate) {
  return await pg.query('DELETE FROM bizcardtemplate WHERE id = $1', [bizcardtemplate.id])
}