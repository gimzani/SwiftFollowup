//---------------------------------------------------------------
import Plan from '@models/models/Plan'
import plansService from "./plansService.js"; 
import { ok, serverError, notFound } from "../../utils/apiResponses.js"; 
//---------------------------------------------------------------
/**
 * Encapsulates the plans routes
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
export default async function routes (fastify) {

  //-------------------------------------------------------- LIST
  fastify.get('/api/plans', async (request, reply) => {
    try {
      let result;
      const listAll = Boolean(request.query.all)
      if(listAll===true) {
        result = await plansService.getAllPlans(fastify.pg);
      } else {
        result = await plansService.getPublicPlans(fastify.pg);
      }
      ok(reply, result.rows, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  });
  //-------------------------------------------------------- GET
  fastify.get('/api/plan/:code', async (request, reply) => {
    try {
      let result = await plansService.getPlanByCode(fastify.pg, request.params.code)
      ok(reply, result.rows[0] || null, result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  });
  //-------------------------------------------------------- CREATE
  fastify.post('/api/plans', async (request, reply) => {   
    try {
      const plan = new Plan(request.body)
      let result = await plansService.createPlan(fastify.pg, plan)
      ok(reply, result.rows[0], result.rowCount)
    } catch(err) {
      serverError(reply, err)
    }
  });
  //-------------------------------------------------------- UPDATE
  fastify.put('/api/plan/:code', async (request, reply) => {    
    try {      
      let exists = await plansService.getPlanByCode(fastify.pg, request.params.code)
      if(exists.rows.length===1) {
        const plan = new Plan(request.body)
        let result = await plansService.updatePlan(fastify.pg, plan)
        ok(reply, result.rows[0], result.rowCount)
      } else {        
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  });
  //-------------------------------------------------------- DELETE
  fastify.delete('/api/plan/:code', async (request, reply) => {
    try {
      let exists = await plansService.getPlanByCode(fastify.pg, request.params.code)
      if(exists.rows.length===1) {
        const plan = new Plan(exists.rows[0])
        let result = await plansService.deletePlan(fastify.pg, plan)
        ok(reply, result.rows, result.rowCount)
      } else {
        await notFound(reply)
      }
    } catch(err) {
      serverError(reply, err)
    }
  });
}