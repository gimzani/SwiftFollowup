//------------------------------------------------------------------------
import QrCodeData from './QrCodeData.js'
//------------------------------------------------------------------------
export default class QrCodeTemplate {
  
  id = 0;                                   // bigint
  qrcode_name = 'My New Qr Code';           // text
  qrcode_description = null;                // text
  qrcode_data = new QrCodeData();           // json
  created_on = new Date().toISOString();      // timestamp
  updated_on = new Date().toISOString();      // timestamp
  
  constructor(options) {
    if(options) { this.init(options); }
  }

  init(options) {
    this.id = parseInt(options.id) || this.id;
    this.qrcode_name = options.qrcode_name || this.qrcode_name;
    this.qrcode_description = options.qrcode_description || this.qrcode_description;
    this.qrcode_data = new QrCodeData(options.qrcode_data) || this.qrcode_data;
    this.created_on = options.created_on ? new Date(options.created_on).toISOString() : this.created_on;
    this.updated_on = options.updated_on ? new Date(options.updated_on).toISOString() : this.updated_on;
  }

}