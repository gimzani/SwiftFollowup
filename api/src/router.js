
//---------------------------------------------------------------
import bizcardsApi from './modules/bizcards/bizcardsApi.js'
import bizcardtemplatesApi from './modules/bizcardtemplates/bizcardtemplatesApi.js'
import contactsApi from './modules/contacts/contactsApi.js'
import contacteventsApi from './modules/contactevents/contacteventsApi.js'
import contentrequestsApi from './modules/contentrequests/contentrequestsApi.js'
import emailverificationtokensApi from './modules/emailverificationtokens/emailverificationtokensApi.js'
import passwordresettokensApi from './modules/passwordresettokens/passwordresettokensApi.js'
import plansApi from './modules/plans/plansApi.js'
import qrcodesApi from './modules/qrcodes/qrcodesApi.js'
import qrcodetemplatesApi from './modules/qrcodetemplates/qrcodetemplatesApi.js'
import sessionsApi from './modules/sessions/sessionsApi.js'
import systemdataApi from './modules/systemdata/systemdataApi.js'
import useraccountsApi from './modules/useraccounts/useraccountsApi.js'
import userprofilesApi from './modules/userprofiles/userprofilesApi.js'
import utilsApi from './modules/utilsApi.js'
//---------------------------------------------------------------
/**
 * router.js is responsible for initializing all the routes in the system. 
 *   It imports the individual route modules and registers them with the Fastify instance.
 * @param {*} fastify 
 */
export function initializeRoutes (fastify) {
  bizcardsApi(fastify);
  bizcardtemplatesApi(fastify);
  contactsApi(fastify);
  contacteventsApi(fastify);
  contentrequestsApi(fastify);
  emailverificationtokensApi(fastify);
  passwordresettokensApi(fastify);
  plansApi(fastify);
  qrcodesApi(fastify);
  qrcodetemplatesApi(fastify);
  sessionsApi(fastify);
  systemdataApi(fastify);
  useraccountsApi(fastify);
  userprofilesApi(fastify);
  utilsApi(fastify);
}