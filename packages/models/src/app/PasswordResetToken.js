//------------------------------------------------------------------------
export default class PasswordResetToken {
    
  id = 0;                             // bigint
  useraccount_id = 0;                 // bigint - ref:useraccount
  token = null;                       // text
  expires_on = null;                  // expiration date/time - ISO 8601 string

  constructor(options) {
    if(options) {
      this.init(options);
    }
  }
  
  init(options) {
    this.id = parseInt(options.id) || this.id;
    this.useraccount_id = parseInt(options.useraccount_id) || this.useraccount_id;
    this.token = options.token || this.token;    
    this.expires_on = options.expires_on ? new Date(options.expires_on).toISOString() : null;
  }

}