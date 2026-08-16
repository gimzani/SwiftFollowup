//--------------------------------------------------------
export default {
  listUserAccounts,
  getUserAccountById,
  getUserAccountByEmail,
  createUserAccount,
  updateUserAccount,
  deleteUserAccount,
  userAuthentication,
  activateUserAccount,
  changePassword
}
//--------------------------------------------------------
export async function listUserAccounts(pg) {
  return await pg.query('SELECT * FROM useraccount')
}
//--------------------------------------------------------
export async function getUserAccountById(pg, id) {
  return await pg.query(`
    SELECT 
      useraccount.id,
      useraccount.code,
      useraccount.email_address,
      useraccount.plan_code,
      useraccount.login_on,
      useraccount.login_count,
      userprofile.first_name,
      userprofile.last_name,
      userprofile.middle_name,
      userprofile.title,
      userprofile.suffix,
      userprofile.company,
      userprofile.job_title,
      userprofile.mailing_address,
      userprofile.web_address,
      userprofile.mobile_number,
      userprofile.avatar_url,
      userprofile.preferences,      
      useraccount.is_active
    FROM useraccount 
    INNER JOIN userprofile ON useraccount.id = userprofile.useraccount_id     
    WHERE useraccount.id = $1
    `, [id])
}
//--------------------------------------------------------
export async function getUserAccountByEmail(pg, emailAddress) {
  return await pg.query('SELECT * FROM useraccount WHERE email_address = $1', [emailAddress])
}
//--------------------------------------------------------
export async function createUserAccount(pg, userAccount) {
  return await pg.query(
    `INSERT INTO useraccount (code, email_address, password_hash, plan_code, source, oauth_id)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      userAccount.code,
      userAccount.email_address,
      userAccount.password_hash,
      userAccount.plan_code,
      userAccount.source,
      userAccount.oauth_id
    ]
  )
}
//--------------------------------------------------------
export async function updateUserAccount(pg, userAccount) {
  return await pg.query(
    `UPDATE useraccount
     SET code = $2,
         email_address = $3,
         password_hash = $4,
         login_on = $5,
         login_count = $6,
         is_active = $7,
         plan_code = $8,
         source = $9,
         oauth_id = $10,
         updated_on = NOW()
     WHERE id = $1
     RETURNING *`,
    [
      userAccount.id,
      userAccount.code,
      userAccount.email_address,
      userAccount.password_hash,
      userAccount.login_on,
      userAccount.login_count,
      userAccount.is_active,
      userAccount.plan_code,
      userAccount.source,
      userAccount.oauth_id
    ]
  )
}
//--------------------------------------------------------
export async function deleteUserAccount(pg, userAccount) {
  return await pg.query('DELETE FROM useraccount WHERE id = $1', [userAccount.id])
}
//---------------------------------------------------
export async function userAuthentication(pg, {emailAddress, password_hash}) {
  return await pg.query(`
    SELECT id,
    code,
    email_address,
    password_hash,
    login_on,
    login_count,
    is_active,
    plan_code,
    source,
    oauth_id,
    created_on,
    updated_on 
    FROM useraccount 
    WHERE email_address=$1 AND password_hash=$2 AND is_active=true`,
    [
      emailAddress,
      password_hash
    ]
  )
}
//---------------------------------------------------
export async function activateUserAccount(pg, useraccount_id) { 
  return await pg.query(
    `UPDATE useraccount
     SET email_verified_on = $2,
      is_active = true 
     WHERE id = $1`,
    [
      useraccount_id,
      new Date()
    ]
  )
}
//---------------------------------------------------
export async function changePassword(pg, {useraccount_id, password}) { 
  return await pg.query(
    `UPDATE useraccount
     SET password_hash = $2
     WHERE id = $1`,
    [
      useraccount_id,
      password
    ]
  )
}