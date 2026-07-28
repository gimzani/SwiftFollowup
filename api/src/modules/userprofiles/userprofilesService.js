//--------------------------------------------------------
export default {
  getUserProfiles,
  getUserProfileById,
  createUserProfile,
  updateUserProfile,
  deleteUserProfile
}
//--------------------------------------------------------
export async function getUserProfiles(pg, useraccount_id) {
  return await pg.query('SELECT * FROM userprofile WHERE useraccount_id = $1', [useraccount_id])
}
//--------------------------------------------------------
export async function getUserProfileById(pg, useraccount_id) {
  return await pg.query('SELECT * FROM userprofile WHERE useraccount_id = $1', [useraccount_id])
}
//--------------------------------------------------------
export async function createUserProfile(pg, userProfile) {
  return await pg.query(
    `INSERT INTO userprofile (
       useraccount_id,
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
       mobile_number,
       avatar_url,
       preferences,
       is_default
     )
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
     RETURNING *`,
    [
      userProfile.useraccount_id,
      userProfile.first_name,
      userProfile.last_name,
      userProfile.middle_name,
      userProfile.title,
      userProfile.suffix,
      userProfile.date_of_birth,
      userProfile.sex,
      userProfile.company,
      userProfile.job_title,
      userProfile.web_address,
      userProfile.mobile_number,
      userProfile.avatar_url,
      userProfile.preferences,
      userProfile.is_default
    ]
  )
}
//--------------------------------------------------------
export async function updateUserProfile(pg, userProfile) {
  return await pg.query(
    `UPDATE userprofile
     SET first_name = $2,
         last_name = $3,
         middle_name = $4,
         title = $5,
         suffix = $6,
         date_of_birth = $7,
         sex = $8,
         company = $9,
         job_title = $10,
         web_address = $11,
         mobile_number = $12,
         avatar_url = $13,
         preferences = $14,
         is_default = $15
     WHERE useraccount_id = $1
     RETURNING *`,
    [
      userProfile.useraccount_id,
      userProfile.first_name,
      userProfile.last_name,
      userProfile.middle_name,
      userProfile.title,
      userProfile.suffix,
      userProfile.date_of_birth,
      userProfile.sex,
      userProfile.company,
      userProfile.job_title,
      userProfile.web_address,
      userProfile.mobile_number,
      userProfile.avatar_url,
      userProfile.preferences,
      userProfile.is_default
    ]
  )
}
//--------------------------------------------------------
export async function deleteUserProfile(pg, userProfile) {
  return await pg.query('DELETE FROM userprofile WHERE useraccount_id = $1', [userProfile.useraccount_id])
}
