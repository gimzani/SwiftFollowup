//------------------------------------------------------------------------
export default class BizCardTemplate {

  id = 0;                                     // bigint
  bizcard_name = null;                        // text
  bizcard_description = null;                 // text
  bizcard_data = null;                        // json
  created_on = new Date().toISOString();      // timestamp
  updated_on = new Date().toISOString();      // timestamp

  constructor(options) {
    if(options) {this.init(options);}
  }

  init(options) {
    this.id = parseInt(options.id) || this.id;
    this.bizcard_name = options.bizcard_name || this.bizcard_name;
    this.bizcard_description = options.bizcard_description || this.bizcard_description;
    this.bizcard_data = options.bizcard_data || this.bizcard_data;
    this.created_on = options.created_on ? new Date(options.created_on).toISOString() : this.created_on;
    this.updated_on = options.updated_on ? new Date(options.updated_on).toISOString() : this.updated_on;
  }

}