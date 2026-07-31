//------------------------------------------------------------------------
import { ulid } from 'ulid';
import UserProfile from './UserProfile.js';
//------------------------------------------------------------------------
export default class UserAccount {

  id = 0;                                               // bigint
  code = ulid();                                        // ULID
  email_address = null;                                 // text
  password_hash = null;                                 // text
  login_on = new Date().toISOString();                  // timestamp
  login_count = 0;                                      // int
  plan_code = 'SF_P_FREE';                              // text - default: plan_code
  source = null;                                        // text
  oauth_id = null;                                      // text
  email_verified_on = new Date().toISOString();         // timestamp
  created_on = new Date().toISOString();                // timestamp
  updated_on = new Date().toISOString();                // timestamp
  is_active = true;                                     // boolean

  user_profile = new UserProfile();                     // object - ref:userprofile

  constructor(options) {
    if(options) { this.init(options); }
  }

  
  init(options) {
    this.id = parseInt(options.id) || this.id;
    this.code = options.code || this.code;
    this.email_address = options.email_address || this.email_address;
    this.password_hash = options.password_hash || this.password_hash;
    this.login_on = options.login_on ? new Date(options.login_on).toISOString() : this.login_on;
    this.login_count = parseInt(options.login_count) || this.login_count;
    this.plan_code = options.plan_code || this.plan_code;
    this.source = options.source || this.source;
    this.oauth_id = options.oauth_id || this.oauth_id;
    this.email_verified_on = options.email_verified_on ? new Date(options.email_verified_on).toISOString() : this.email_verified_on;
    this.created_on = options.created_on ? new Date(options.created_on).toISOString() : this.created_on;
    this.updated_on = options.updated_on ? new Date(options.updated_on).toISOString() : this.updated_on;
    this.is_active = [1,true].includes(options.is_active) ? true : false;

    this.user_profile = new UserProfile(options.user_profile) || this.user_profile;
  }

}