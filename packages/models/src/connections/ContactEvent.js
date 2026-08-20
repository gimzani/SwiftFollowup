//------------------------------------------------------------------------
import { ulid } from 'ulid';
//------------------------------------------------------------------------
export default class ContactEvent {
  
  id = 0;                                   // bigint
  contact_id = 0;                           // bigint - ref:contact  
  contentrequest_id = 0;                    // bigint - ref:contentrequest
  event_name = null;                        // text: 
  event_type = null;                        // text - request, connection, referral, change...
  event_value = null;                       // text
  event_action = null;                      // text - if event_type='change': change what?
                                            // ...  - if event_type='referral': refer whom?
  constructor(options) {
    if(options) {
      this.init(options);
    }
  }
  
  init(options) {
    this.id = parseInt(options.id) || this.id;
    this.contact_id = parseInt(options.contact_id) || this.contact_id;
    this.contentrequest_id = parseInt(options.contentrequest_id) || this.contentrequest_id;
    this.event_name = options.event_name || this.event_name;
    this.event_type = options.event_type || this.event_type;
    this.event_value = options.event_value || this.event_value;
    this.event_action = options.event_action || this.event_action;
  }

}