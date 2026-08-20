//--------------------------------------------------------
export default {
  listPublicPlans,
  listPlans,
  getPlanByCode,
  createPlan,
  updatePlan,
  deletePlan
}
//--------------------------------------------------------
export async function listPublicPlans(pg) {
  return await pg.query('SELECT * FROM plan WHERE is_public = true')
}
//--------------------------------------------------------
export async function listPlans(pg) {
  return await pg.query('SELECT * FROM plan')
}
//--------------------------------------------------------
export async function getPlanByCode(pg, code) {
  return await pg.query('SELECT * FROM plan WHERE code = $1', [code])
}
//--------------------------------------------------------
export async function createPlan(pg, plan) {
  return await pg.query(
    `INSERT INTO plan (code, plan_name, plan_cost, plan_description, is_public)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [plan.code, plan.plan_name, plan.plan_cost, plan.plan_description, plan.is_public]
  )
}
//--------------------------------------------------------
export async function updatePlan(pg, plan) {
  return await pg.query(
    `UPDATE plan
     SET plan_name = $2, plan_cost = $3, plan_description = $4, is_public = $5
     WHERE code = $1
     RETURNING *`,
    [plan.code, plan.plan_name, plan.plan_cost, plan.plan_description, plan.is_public]
  )
}
//--------------------------------------------------------
export async function deletePlan(pg, plan) {
  return await pg.query('DELETE FROM plan WHERE code=$1', [plan.code])
}