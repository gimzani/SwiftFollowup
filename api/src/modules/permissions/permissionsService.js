//--------------------------------------------------------
export default {
  getAllPermissions,
  getPermissionByName,
  createPermission,
  updatePermission,
  deletePermission
}
//--------------------------------------------------------
export async function getAllPermissions(pg) {
  return await pg.query('SELECT * FROM permission')
}
//--------------------------------------------------------
export async function getPermissionByName(pg, permission_name) {
  return await pg.query('SELECT * FROM permission WHERE permission_name = $1', [permission_name])
}
//--------------------------------------------------------
export async function createPermission(pg, permission) {
  return await pg.query(
    `INSERT INTO permission (permission_name, permission_label)
     VALUES ($1, $2)
     RETURNING *`,
    [permission.permission_name, permission.permission_label]
  )
}
//--------------------------------------------------------
export async function updatePermission(pg, permission) {
  return await pg.query(
    `UPDATE permission
     SET permission_label = $2
     WHERE permission_name = $1
     RETURNING *`,
    [permission.permission_name, permission.permission_label]
  )
}
//--------------------------------------------------------
export async function deletePermission(pg, permission) {
  return await pg.query('DELETE FROM permission WHERE permission_name = $1', [permission.permission_name])
}
