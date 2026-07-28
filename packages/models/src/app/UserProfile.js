//----------------------------------------------------------
export default class UserProfile {

  useraccount_id = 0;             // bigint - ref:useraccount
  first_name = null;              // text
  last_name = null;               // text
  middle_name = null;             // text
  title = null;                   // text
  suffix = null;                  // text
  company = null;                 // text
  job_title = null;               // text
  web_address = null;             // text
  mobile_number = null;           // text
  avatar_url = null;              // text
  preferences = null;             // json
  is_default = null;              // text
  
  constructor(options) {
    if(options) {
      this.init(options);
    }
  }
  
  init(options) {
    this.useraccount_id = parseInt(options.useraccount_id) || this.useraccount_id;
    this.first_name = options.first_name || this.first_name;
    this.last_name = options.last_name || this.last_name;
    this.middle_name = options.middle_name || this.middle_name;
    this.title = options.title || this.title;
    this.suffix = options.suffix || this.suffix;
    this.company = options.company || this.company;
    this.job_title = options.job_title || this.job_title;
    this.web_address = options.web_address || this.web_address;
    this.mobile_number = options.mobile_number || this.mobile_number;
    this.avatar_url = options.avatar_url || this.avatar_url;
    this.preferences = options.preferences || this.preferences;
    this.is_default = [1,true].includes(options.is_default) ? true : false;
  }

}