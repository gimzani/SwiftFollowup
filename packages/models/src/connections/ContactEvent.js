//------------------------------------------------------------------------
import { ulid } from 'ulid';
//------------------------------------------------------------------------
export default class ContactEvent {
  
  id = 0;                                   // bigint
  contact_id = 0;                           // bigint - ref:contact  
  event_name = null;                        // text: 
  event_type = null;                        // text
  event_value = null;                       // text
  event_action = null;                      // text

  constructor(options) {
    if(options) {
      this.init(options);
    }
  }
  
  init(options) {
    this.id = parseInt(options.id) || this.id;
    this.contact_id = parseInt(options.contact_id) || this.contact_id;
    this.event_name = options.event_name || this.event_name;
    this.event_type = options.event_type || this.event_type;
    this.event_value = options.event_value || this.event_value;
    this.event_action = options.event_action || this.event_action;
  }

}