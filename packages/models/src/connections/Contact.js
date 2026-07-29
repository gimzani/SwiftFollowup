//------------------------------------------------------------------------
import { ulid } from 'ulid';
//------------------------------------------------------------------------
export default class Contact {

  id = 0;                                       // bigint
  code = ulid();                                // ULID
  useraccount_id = 0;                           // bigint - ref:useraccount
  relationship = null;                          // text
  tags = null;                                  // text
  first_name = null;                            // text
  last_name = null;                             // text
  middle_name = null;                           // text
  title = null;                                 // text
  suffix = null;                                // text
  company = null;                               // text
  job_title = null;                             // text
  web_address = null;                           // text
  mobile_number = null;                         // text
  created_on = new Date().toISOString();        // timestamp
  updated_on = new Date().toISOString();        // timestamp


  constructor(options) {
    if(options) {
      this.init(options);
    }
  }
  
  init(options) {
    this.id = parseInt(options.id) || this.id;
    this.code = options.code || this.code;
    this.useraccount_id = parseInt(options.useraccount_id) || this.useraccount_id;
    this.relationship = options.relationship || this.relationship;
    this.tags = options.tags || this.tags;
    this.first_name = options.first_name || this.first_name;
    this.last_name = options.last_name || this.last_name;
    this.middle_name = options.middle_name || this.middle_name;
    this.title = options.title || this.title;
    this.suffix = options.suffix || this.suffix;
    this.company = options.company || this.company;
    this.job_title = options.job_title || this.job_title;
    this.web_address = options.web_address || this.web_address;
    this.mobile_number = options.mobile_number || this.mobile_number;
    this.created_on = new Date(options.created_on).toISOString() || this.created_on;
    this.updated_on = new Date(options.updated_on).toISOString() || this.updated_on;
  }

}