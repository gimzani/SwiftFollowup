//----------------------------------------------------------
export default class Permission {

  permission_name = null;       // text
  permission_label = null;      // text
  
  constructor(options) {
    if(options) {
      this.init(options);
    }
  }
  
  init(options) {
    this.permission_name = options.permission_name || this.permission_name;
    this.permission_label = options.permission_label || this.permission_label;
  }

}