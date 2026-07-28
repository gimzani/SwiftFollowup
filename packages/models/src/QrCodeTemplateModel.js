//----------------------------------------------------------------------------
import { QrCodeData } from './QrCodeModels.js'
//----------------------------------------------------------------------------
export class QrCodeTemplateModel {
  qrCodeTemplateId = 0;
  qrCodeName = 'Qr Code Template';
  qrCodeDescription = null;
  qrCodeData = new QrCodeData();
  
  constructor(options) {
    if(options) { this.init(options); }
  }

  init(options) {
    this.qrCodeId = parseInt(options.qrCodeId) || this.qrCodeId;
    this.qrCodeName = options.qrCodeName || this.qrCodeName;
    this.qrCodeDescription = options.qrCodeDescription || this.qrCodeDescription;
    this.qrCodeData = new QrCodeData(options.qrCodeData) || this.qrCodeData;
  }

}