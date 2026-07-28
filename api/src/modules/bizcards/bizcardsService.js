//--------------------------------------------------------
export default {
  getAllBizcards,
  getBizcardById,
  createBizcard,
  updateBizcard,
  deleteBizcard
}
//--------------------------------------------------------
export async function getAllBizcards(pg, useraccount_id) {
  return await pg.query('SELECT * FROM bizcard WHERE useraccount_id = $1', [useraccount_id])
}
//--------------------------------------------------------
export async function getBizcardById(pg, id) {
  return await pg.query('SELECT * FROM bizcard WHERE id = $1', [id])
}
//--------------------------------------------------------
export async function createBizcard(pg, bizcard) {
  return await pg.query(
    `INSERT INTO bizcard (
       useraccount_id,
       code,
       bizcard_name,
       bizcard_description,
       bizcard_data,
       bizcard_links,
       is_default
     )
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING *`,
    [
      bizcard.useraccount_id,
      bizcard.code,
      bizcard.bizcard_name,
      bizcard.bizcard_description,
      bizcard.bizcard_data,
      bizcard.bizcard_links,
      bizcard.is_default
    ]
  )
}
//--------------------------------------------------------
export async function updateBizcard(pg, bizcard) {
  return await pg.query(
    `UPDATE bizcard
     SET useraccount_id = $2,
         code = $3,
         bizcard_name = $4,
         bizcard_description = $5,
         bizcard_data = $6,
         bizcard_links = $7,
         is_default = $8,
         updated_on = NOW()
     WHERE id = $1
     RETURNING *`,
    [
      bizcard.id,
      bizcard.useraccount_id,
      bizcard.code,
      bizcard.bizcard_name,
      bizcard.bizcard_description,
      bizcard.bizcard_data,
      bizcard.bizcard_links,
      bizcard.is_default
    ]
  )
}
//--------------------------------------------------------
export async function deleteBizcard(pg, bizcard) {
  return await pg.query('DELETE FROM bizcard WHERE id = $1', [bizcard.id])
}
