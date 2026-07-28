//------------------------------------------------------------------------
export default class BizCardTemplate {

  constructor(options) {

    this.id = 0;                            // bigint
    this.bizcard_name = null;               // text
    this.bizcard_description = null;        // text
    this.bizcard_data = null;               // json
    this.bizcard_links = null;              // json
    this.is_default = false;                // boolean
    this.updated_on = null;

    if(options) {
      this.init(options);
    }
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
    this.updated_on = new Date(options.updated_on) || this.updated_on;
  }

}