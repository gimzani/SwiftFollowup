//------------------------------------------------------------------------
import { ulid } from 'ulid';
//------------------------------------------------------------------------
export default class ContentRequest {
  
  id = 0;                                   // bigint
  code = ulid();                            // ULID
  useraccount_id = 0;                       // bigint - ref:useraccount
  contact_id = 0;                           // bigint - ref:contact  
  content_type = null;                      // text
  content_code = null;                      // ULID - Ref: Content
  
  created_on = new Date().toISOString();    // timestamp
  viewed_on = null;                         // timestamp

  constructor(options) {
    if(options) {
      this.init(options);
    }
  }
  
  init(options) {
    this.id = parseInt(options.id) || this.id;
    this.useraccount_id = parseInt(options.useraccount_id) || this.useraccount_id;
    this.contact_id = parseInt(options.contact_id) || this.contact_id;
    this.content_type = options.content_type || this.content_type;
    this.content_code = options.content_code || this.content_code;
    
    this.created_on = options.created_on ? new Date(options.created_on).toISOString() : this.created_on;
    this.viewed_on = options.viewed_on ? new Date(options.viewed_on).toISOString() : this.viewed_on;
    
  }

}