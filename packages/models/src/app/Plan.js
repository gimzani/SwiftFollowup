//----------------------------------------------------------
export default class Plan {

  plan_name = null;                     // text
  code = null;                          // text
  plan_cost = 0.0;                      // decimal
  plan_description = null;              // text
  plan_details = null;                  // json
  permissions = null;                   // text
  sort_order = 0;                       // int
  is_public = true;                     // boolean

  constructor(options) {
    if(options) {
      this.init(options);
    }
  }
  
  init(options) {
    this.plan_name = options.plan_name || this.plan_name;
    this.code = options.code || this.code;
    this.plan_cost = parseFloat(options.plan_cost) || this.plan_cost;
    this.plan_description = options.plan_description || this.plan_description;
    this.plan_details = options.plan_details || this.plan_details;
    this.permissions = options.permissions || this.permissions;
    this.sort_order = parseInt(options.sort_order) || this.sort_order;
    this.is_public = [1,true].includes(options.is_public) ? true : false;
  }

}