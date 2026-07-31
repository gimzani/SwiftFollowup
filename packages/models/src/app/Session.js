//------------------------------------------------------------------------
import { ulid } from 'ulid';
//------------------------------------------------------------------------
export default class Session {
  
  id = 0;                                     // bigint
  useraccount_id = 0;                         // bigint - ref:useraccount
  session_token = null;                       // text
  ip_address = null;                          // text
  user_agent = null;                          // text  
  created_on = new Date().toISOString();      // timestamp
  expires_on = null;                          // expiration date/time - ISO 8601 string

  constructor(options) {
    if(options) {
      this.init(options);
    }
  }
  
  init(options) {
    this.id = parseInt(options.id) || this.id;
    this.useraccount_id = parseInt(options.useraccount_id) || this.useraccount_id;
    this.session_token = options.session_token || this.session_token;
    this.ip_address = options.ip_address || this.ip_address;
    this.user_agent = options.user_agent || this.user_agent;
    this.created_on = options.created_on ? new Date(options.created_on).toISOString() : this.created_on;
    this.expires_on = options.expires_on ? new Date(options.expires_on).toISOString() : null;
  }

}