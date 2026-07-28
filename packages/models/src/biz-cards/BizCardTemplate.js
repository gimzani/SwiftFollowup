//------------------------------------------------------------------------
export default class BizCardTemplate {

  id = 0;                                     // bigint
  bizcard_name = null;                        // text
  bizcard_description = null;                 // text
  bizcard_data = null;                        // json
  bizcard_links = null;                       // json
  is_default = false;                         // boolean
  updated_on = new Date().toISOString();      // timestamp

  constructor(options) {
    if(options) {this.init(options);}
  }

  init(options) {
    this.id = parseInt(options.id) || this.id;
    this.bizcard_name = options.bizcard_name || this.bizcard_name;
    this.bizcard_description = options.bizcard_description || this.bizcard_description;
    this.bizcard_data = options.bizcard_data || this.bizcard_data;
    this.bizcard_links = options.bizcard_links || this.bizcard_links;
    this.is_default = [1,true].includes(options.is_default) ? true : false;
    this.updated_on = new Date(options.updated_on).toISOString() || this.updated_on;
  }

}