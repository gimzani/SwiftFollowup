//--------------------------------------------------------
export default {
  listByDatakey,
  getSystemDataById,
  createSystemData,
  updateSystemData,
  deleteSystemData,
}
//--------------------------------------------------------
export async function listByDatakey(pg, datakey) {
  return await pg.query('SELECT * FROM systemdata WHERE datakey = $1 ORDER BY sort_order', [datakey])
}
//--------------------------------------------------------
export async function getSystemDataById(pg, id) {
  return await pg.query('SELECT * FROM systemdata WHERE id = $1', [id])
}
//--------------------------------------------------------
export async function createSystemData(pg, systemdata) {
  return await pg.query(
    `INSERT INTO systemdata (
      datakey, 
      value, 
      label, 
      sort_order, 
      is_default
    ) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *`,
    [
      systemdata.datakey, 
      systemdata.value, 
      systemdata.label,
      systemdata.sort_order, 
      systemdata.is_default
    ]
  )
}
//--------------------------------------------------------
export async function updateSystemData(pg, systemdata) {
  return await pg.query(
    `UPDATE systemdata SET
      datakey = $1,
      value = $2,
      label = $3,
      sort_order = $4,
      is_default = $5
    WHERE id = $6
    RETURNING *`,
    [
      systemdata.datakey,
      systemdata.value,
      systemdata.label,
      systemdata.sort_order,
      systemdata.is_default,
      systemdata.id
    ]
  )
}
//--------------------------------------------------------
export async function deleteSystemData(pg, systemdata) {
  return await pg.query('DELETE FROM systemdata WHERE id=$1', [systemdata.id])
}