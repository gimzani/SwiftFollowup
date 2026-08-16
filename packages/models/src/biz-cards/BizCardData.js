//-------------------------------------------------------------  todo: prefer this to the bizcard-models in the bizcards package
export const BIZCARD_DATATYPE = {
  TEXT: 'text',
  PATH: 'path',
  RECTANGLE: 'rectangle',
  IMAGE: 'image',
  SHAPE: 'shape',
  LINE: 'line'
}
//-------------------------------------------------------------
const a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
const array = a.split('');
//-------------------------------------------------------------
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//-------------------------------------------------------------
export function getCode(num) {
  let code = "";
  for (let i = 0; i < num; i++) {
    code += array[getRandomIntInclusive(0, array.length - 1)];
  }
  return code;
}
//-------------------------------------------------------------
//-------------------------------------------------------------
export default class BizCardData {

  constructor(options) {
    this.id = getCode(6);
    this.type = null;
    this.tag = null;
    this.x = 0;
    this.y = 0;
    this.rotation = 0;

    if(options) {
      this.root(options)
    }
  }

  root(options) {
    this.id = options.id || this.id;
    this.tag = options.tag || this.tag;
    this.x = parseInt(options.x) || this.x;
    this.y = parseInt(options.y) || this.y;
    this.rotation = parseFloat(options.rotation) || this.rotation;
  }

}

//-------------------------------------------------------------
//-------------------------------------------------------------
export class Text extends BizCardData {

  constructor(options) {
    super(options);

    this.type = BIZCARD_DATATYPE.TEXT;
    this.text = null;
    this.fill = null;

    this.fontSize = 12;
    this.fontFamily = null;
    this.fontStyle = 'normal';
    this.fontWeight = 'normal';

    if(options) {
      this.root(options);
      this.init(options)
    }
  }

  init(options) {
    this.text = options.text || this.text;
    this.fill = options.fill || this.fill;
    this.fontSize = options.fontSize || this.fontSize;
    this.fontFamily = options.fontFamily || this.fontFamily;
    this.fontStyle = options.fontStyle || this.fontStyle;
    this.fontWeight = options.fontWeight || this.fontWeight;
  }

}

//-------------------------------------------------------------
export class Image extends BizCardData {

  constructor(options) {
    super(options);
    this.type = BIZCARD_DATATYPE.IMAGE;
    this.url = '';
    this.width = 0;
    this.height = 0;

    if(options) {
      this.root(options);
      this.init(options)
    }
  }

  init(options) {
    this.url = options.url || this.url;
    this.width = parseInt(options.width) || this.width;
    this.height = parseInt(options.height) || this.height;
  }

}

//-------------------------------------------------------------
export class Rectangle extends BizCardData {

  constructor(options) {
    super(options);

    this.type = BIZCARD_DATATYPE.RECTANGLE;
    this.strokeWidth = 0;
    this.width = 0;
    this.height = 0;

    if(options) {
      this.root(options);
      this.init(options)
    }
  }

  init(options) {
    this.strokeWidth = parseFloat(options.strokeWidth) || this.strokeWidth;
    this.width = parseInt(options.width) || this.width;
    this.height = parseInt(options.height) || this.height;
  }

}

//-------------------------------------------------------------
export class Line extends BizCardData {

  constructor(options) {
    super(options);

    this.type = BIZCARD_DATATYPE.LINE;
    this.strokeWidth = 0;
    this.x2 = 0;
    this.y2 = 0;

    if(options) {
      this.root(options);
      this.init(options)
    }
  }

  init(options) {
    this.strokeWidth = parseFloat(options.strokeWidth) || this.strokeWidth;
    this.x2 = parseInt(options.x2) || this.x2;
    this.y2 = parseInt(options.y2) || this.y2;
  }

}

//-------------------------------------------------------------
//-------------------------------------------------------------
export class Path extends BizCardData {

  constructor(options) {
    super(options);

    this.type = BIZCARD_DATATYPE.PATH;
    this.strokeWidth = 0;
    this.pathData = '';

    if(options) {
      this.root(options);
      this.init(options)
    }
  }

  init(options) {
    this.strokeWidth = parseFloat(options.strokeWidth) || this.strokeWidth;
    this.pathData = options.pathData || this.pathData;
  }

}

//-------------------------------------------------------------
export class Shape extends BizCardData {

  constructor(options) {
    super(options);

    this.type = BIZCARD_DATATYPE.SHAPE;
    this.strokeWidth = 0;
    this.shapeData = '';

    if(options) {
      this.root(options);
      this.init(options)
    }
  }

  init(options) {
    this.strokeWidth = parseFloat(options.strokeWidth) || this.strokeWidth;
    this.shapeData = options.shapeData || this.shapeData;
  }

}
//-------------------------------------------------------------