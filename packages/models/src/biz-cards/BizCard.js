//------------------------------------------------------------------------
import { ulid } from 'ulid';
//------------------------------------------------------------------------
export default class BizCard {

  id = 0;                                     // bigint
  useraccount_id = 0;                         // bigint - ref:useraccount
  code = ulid();                              // ULID
  bizcard_name = null;                        // text
  bizcard_description = null;                 // text
  bizcard_data = [];                          // json
  bizcard_links = [];                         // json
  is_default = false;                         // boolean
  created_on = new Date().toISOString();      // timestamp
  updated_on = new Date().toISOString();      // timestamp

  constructor(options) {
    if(options) { this.init(options); }
  }

  init(options) {    
    this.id = parseInt(options.id) || this.id;
    this.useraccount_id = parseInt(options.useraccount_id) || this.useraccount_id;
    this.code = options.code || this.code;
    this.bizcard_name = options.bizcard_name || this.bizcard_name;
    this.bizcard_description = options.bizcard_description || this.bizcard_description;
    this.bizcard_data = options.bizcard_data || this.bizcard_data;
    this.bizcard_links = options.bizcard_links || this.bizcard_links;
    this.is_default = [1,true].includes(options.is_default) ? true : false;
    this.created_on = options.created_on ? new Date(options.created_on).toISOString() : this.created_on;
    this.updated_on = options.updated_on ? new Date(options.updated_on).toISOString() : this.updated_on;
  }

}