//----------------------------------------------------------------------------
// BizCard Models
//----------------------------------------------------------------------------
import api from 'src/code/app/ServerApis.js'
import { getKeyCode } from 'src/code/app/CodeGen.js'
import * as bizCardTools from 'src/code/tools/BizCardDataTools.js'
//----------------------------------------------------------------------------
/** BizCardEntity is the root level class for BizCards and BizCardTemplates */
export class BizCardEntity {

  bizCardName = null;
  bizCardDescription = null;
  bizCardData = new BizCardData();

  //-------------------------------------------------
  toRaw() {
    return JSON.parse(JSON.stringify(this));
  }  
  //-------------------------------------------------
  getUrl(root, userAccountCode, bizCardCode, side = 'front') {
    return getBizCardUrl(root, userAccountCode, bizCardCode, side);
  }
  //-------------------------------------------------
}
//----------------------------------------------------------------------------
//#region BizCard Classes
//----------------------------------------------------------------------------
/**
 * BizCard Db record
 */
export class BizCardDbRecord extends BizCardEntity {

  bizCardId = 0;
  userAccountId = 0;
  bizCardCode = getKeyCode(16);

  bizCardLinks = [];
  isDefault = false;

  constructor(options) {
    super(options);
    if (options) { this.init(options); }
  }

  init(options) {
    this.bizCardId = parseInt(options.bizCardId) || this.bizCardId;
    this.userAccountId = parseInt(options.userAccountId) || this.userAccountId;
    this.bizCardCode = options.bizCardCode || this.bizCardCode;

    this.bizCardName = options.bizCardName || this.bizCardName;
    this.bizCardDescription = options.bizCardDescription || this.bizCardDescription;
    this.bizCardData = new BizCardData(options.bizCardData) || this.bizCardData;

    this.bizCardLinks = options.bizCardLinks || this.bizCardLinks;
    this.isDefault = !!options.isDefault ? Boolean(options.isDefault) : this.isDefault;
  }

  reKey() {
    this.bizCardCode = getKeyCode(16);
  }

}
//----------------------------------------------------------------------------
/** 
 * BizCard Db record
*/
export class BizCardTemplateDbRecord extends BizCardEntity {

  bizCardTemplateId = 0;
  bizCardTemplateCode = getKeyCode(16);

  constructor(options) {
    super(options);
    if (options) { this.init(options); }
  }

  init(options) {
    this.bizCardTemplateId = parseInt(options.bizCardTemplateId) || this.bizCardTemplateId;
    this.bizCardTemplateCode = options.bizCardTemplateCode || this.bizCardTemplateCode;

    this.bizCardName = options.bizCardName || this.bizCardName;
    this.bizCardDescription = options.bizCardDescription || this.bizCardDescription;
    this.bizCardData = new BizCardData(options.bizCardData) || this.bizCardData;
  }

  reKey() {
    this.bizCardTemplateCode = getKeyCode(16);
  }

}
//----------------------------------------------------------------------------
/**
 * BizCard draw-data
 */
export class BizCardData {

  front = [new KonvaLayer()];         // [KonvaLayer]
  back = [new KonvaLayer()];          // [KonvaLayer]

  fonts = ["Calibri"];                // font names
  vars = [];                          // variable name-value pairs (for replacement)

  constructor(options) {
    if (options) { this.init(options); }
  }

  init(options) {

    this.front = options.front ? options.front.map(i => new KonvaLayer(i)) : this.front;
    this.back = options.back ? options.back.map(i => new KonvaLayer(i)) : this.back;

    this.fonts = options.fonts || this.fonts;
    this.vars = options.vars || this.vars;
  }

  //-------------------------------------------------
  extractTags() {
    return bizCardTools.extractBizCardTags(this);
  }

  //-------------------------------------------------
  extractFonts() {
    let fontsList = bizCardTools.extractBizCardDataFonts(this);
    this.fonts = fontsList;
    return fontsList;
  }
  //-------------------------------------------------
  findElement(id, side='front') {
    for(const layer of this[side]) {
      let element = layer.layerData.find(e => e.id===id);
      if(element) {
        return element;
      } 
    }  
  }
  //-------------------------------------------------
  addElement(layerid, element) {
    let result = bizCardTools.findLayerById(this, layerid);
    this[result.side][result.index].layerData.push(element);
    this.extractFonts(this);
  }
  //-------------------------------------------------
  updateElement(element) {
    let result = bizCardTools.findElementById(this, element.id);
    this[result.side][result.layerIndex].layerData[result.elementIndex] = element;
    this.extractFonts(this);
  }
  //-------------------------------------------------
  removeElement(element) {
    let result = bizCardTools.findElementById(this, element.id);
    const filteredElements = this[result.side][result.layerIndex].layerData.filter(e => e.id !== element.id);
    this[result.side][result.layerIndex].layerData = filteredElements;
    this.extractFonts(this);
  }  
  //-------------------------------------------------
  setActiveLayer(side, layerId) {
    let data = bizCardTools.setActiveLayer(this, side, layerId);
    Object.assign(this, data);
  }
  //-------------------------------------------------
  addLayer(side, layerName) {
    let layer = new KonvaLayer({ name: layerName });
    this[side].push(layer);
    return layer.id;
  }
  //-------------------------------------------------
  updateLayer(layer) {
    let result = bizCardTools.findLayer(this, layer);
    this[result.side][result.index] = layer;
  }
  //-------------------------------------------------
  removeLayer(layer) {
    let result = bizCardTools.findLayer(this, layer);
    this[result.side] = this[result.side].filter(l => l.id !== layer.id);
  }
  //-------------------------------------------------
  mergeData(tagData) {                           // KVP tags
    let data = bizCardTools.mergeBizcardData(this, tagData);
    Object.assign(this, data);
  }
  //-------------------------------------------------
  toRaw() {
    return JSON.parse(JSON.stringify(this));
  }

}
//----------------------------------------------------------------------------
/**
 * BizCard draw-layer
 */
export class KonvaLayer {

  id = getKeyCode(8);
  name = "Background";
  layerData = [];             // [KonvaElement]

  constructor(options) {
    if (options) { this.init(options); }
  }

  init(options) {
    this.id = options.id || this.id;
    this.name = options.name || this.name;
    this.layerData = options.layerData || this.layerData;
  }

}
//----------------------------------------------------------------------------
// #endregion
//----------------------------------------------------------------------------
//#region BizCard Core Functions
//----------------------------------------------------------------------------
/**
 * Creates URL for a BizCard.
 * @param {string} root - The root URL of the server.
 * @param {string} userAccountCode - The userAccount Id Code.
 * @param {string} bizCardCode - The bizCard Id Code.
 * @param {string} side - The 'front' or 'back' side of the card.
 * @return {string} - The url string that points to the BizCard.
 */
export function getBizCardUrl(root, userAccountCode, bizCardCode, side = 'front') {
  return `${root}/user-data/${userAccountCode}/bc/C_${bizCardCode}_${side}.png`;
}
//----------------------------------------------------------------------------
/**
 * Saves the BizCard data and image file
 * @param {BizCardDbRecord} bizCard 
 * @param {Blob} blob - Blob data to upload
 * @param {string} side - The 'front' or 'back' side of the card.
 * @returns {AppResult} Result Object
 */
//----------------------------------------------------------------------------
export async function saveBizCardAndImage(bizCard, userAccountCode, blob, side = 'front') {
  return await saveCardDataAndImage('bizCards', bizCard, userAccountCode, bizCard.bizCardCode, blob, side);
}
//----------------------------------------------------------------------------
/**
 * Saves the BizCardTemplate data and image file
 * @param {BizCardTemplateDbRecord} bizCard 
 * @param {Blob} blob - Blob data to upload
 * @param {string} side - The 'front' or 'back' side of the card.
 * @returns {AppResult} Result Object
 */
//----------------------------------------------------------------------------
export async function saveBizCardTemplateAndImage(bizCardTemplate, userAccountCode, blob, side = 'front') {
  return await saveCardDataAndImage('bizCardTemplates', bizCardTemplate, userAccountCode, bizCardTemplate.bizCardTemplateCode, blob, side);
}
//----------------------------------------------------------------------------
/**
 * Saves the BizCard or BizCardTemplate data and image file
 * @param {BizCardDbRecord | BizCardTemplateDbRecord} bizCard 
 * @param {Blob} blob - Blob data to upload
 * @param {string} side - The 'front' or 'back' side of the card.
 * @returns {AppResult} Result Object
 */
export async function saveCardDataAndImage(endpoint, cardData, userAccountCode, bizCardCode, blob, side = 'front') {
  let updateResult;
  if(cardData.bizCardId===0 || cardData.bizCardTemplateId===0) {
    updateResult = await api[endpoint].create(cardData);
    let initResult = await _newDefaultBizCardImages(userAccountCode, bizCardCode);
    if(!initResult.success) {
      return initResult;
    }
  } else {
    updateResult = await api[endpoint].update(cardData);
  }
  if (updateResult.success) {
    return await saveBizCardImage(blob, userAccountCode, bizCardCode, side);
  } else {
    return updateResult;
  }
}
//----------------------------------------------------------------------------
/**
 * Saves default images for newly created cards.
 * @param {string} userAccountCode 
 * @param {string} bizCardCode 
 * @returns 
 */
async function _newDefaultBizCardImages(userAccountCode, bizCardCode) {
  return await api.utils.bizcardSetup({
    userAccountCode: userAccountCode,
    bizcardCode: bizCardCode
  });
}
//----------------------------------------------------------------------------
/**
 * Uploads image of BizCard
 * @param {blob} blob - Blob data to upload
 * @param {string} userAccountCode - The userAccount Id Code.
 * @param {string} bizCardCode - The bizCard Id Code.
 * @param {string} side The 'front' or 'back' side of the card.
 * @returns {AppResult} Result Object
 */
export async function saveBizCardImage(blob, userAccountCode, bizCardCode, side = 'front') {
  const fileName = `C_${bizCardCode}_${side}.png`;
  const res = await api.utils.upload(blob, {
    fileName: fileName,
    userAccountCode: userAccountCode,
    subfolder: 'bc'
  });
  return res;
}
//----------------------------------------------------------------------------
/**
 * Creates a blank BizCard Template (for editor)
 * @returns Blank BizCard Template
 */
export async function blankBizCardTemplate(name) {
  let data = await fetch('/json/BlankBizCardData.json').then(r => r.json()); 
  return new BizCardTemplateDbRecord({
    bizCardName: name || "Blank Template",
    bizCardData: new BizCardData(data)
  });
}
//----------------------------------------------------------------------------
//#endregion
//----------------------------------------------------------------------------