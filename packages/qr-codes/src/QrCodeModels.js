//----------------------------------------------------------------------------
// QrCodeModels
//----------------------------------------------------------------------------
//========================================  QrCodeOptions
export class QrCodeOptions {

  width = 300;
  height = 300;
  type = 'svg';                               // 'canvas' | 'SVG
  data = 'https://swiftfollowup.com';
  image = null;
  margin = 10;
  qrOptions =  new QrOptions();
  imageOptions = new QrImageOptions();
  backgroundOptions = new QrBackgroundOptions();
  dotsOptions = new QrDotsOptions();
  cornersSquareOptions = new QrCornersSquareOptions();  
  cornersDotOptions = new QrCornersDotsOptions();

  constructor(options) {
    if(options) { this.init(options); }
  }

  init(options) {
    this.width = options.width || this.width;
    this.height = options.height || this.height;
    this.type = options.type || this.type;
    this.data = options.data || this.data;
    this.image = options.image || this.image;
    this.margin = options.margin || this.margin;

    this.qrOptions = options.qrOptions ? new QrOptions(options.qrOptions) : this.qrOptions;
    this.imageOptions = options.imageOptions ? new QrImageOptions(options.imageOptions) : this.imageOptions;
    this.dotsOptions = options.dotsOptions ? new QrDotsOptions(options.dotsOptions) : this.dotsOptions;
    this.backgroundOptions = options.backgroundOptions ? new QrBackgroundOptions(options.backgroundOptions) : this.backgroundOptions;
    this.cornersSquareOptions = options.cornersSquareOptions ? new QrCornersSquareOptions(options.cornersSquareOptions) : this.cornersSquareOptions;
    this.cornersDotOptions = options.cornersDotOptions ? new QrCornersDotsOptions(options.cornersDotOptions) : this.cornersDotOptions;
  }

}

//========================================  QrOptions
export class QrOptions {
  typeNumber = 0;                                    // 0 - 40
  mode = QR_MODE.BYTE;                               // 'Numeric'|'Alphanumeric'|'Byte'|'Kanji'
  errorCorrectionLevel = ERROR_CORRECTION_LEVEL.L;   // 'L'|'M'|'Q'|'H'
  constructor(options) {
    if(options) { this.init(options); }
  }
  init(options) {
    this.typeNumber = options.typeNumber || this.typeNumber;
    this.mode = options.mode || this.mode;
    this.errorCorrectionLevel = options.errorCorrectionLevel || this.errorCorrectionLevel;
  }
}

//========================================  QrImageOptions
export class QrImageOptions {
  hideBackgroundDots = true;
  imageSize = 0.25;                         // < 0.5
  crossOrigin = 'anonymous';                // 'anonymous'|'use-credentials'
  margin = 2;
  saveAsBlob = true;
  constructor(options) {
    if(options) { this.init(options); }
  }
  init(options) {
    this.typeNumber = options.typeNumber || this.typeNumber;
    this.mode = options.mode || this.mode;
    this.colorSterrorCorrectionLevelops = options.colorSterrorCorrectionLevelops || this.colorSterrorCorrectionLevelops;
  }
}

//========================================  QrDotsOptions
export class QrDotsOptions {
  color = "#000";                         // rgb(a)
  type = DOT_STYLE.SQUARE;                  // 'rounded'|'dots'|'classy'|'classy-rounded'|'square'|'extra-rounded'
  roundSize = true;                         // rounds dots size to int
  gradient = null;
  constructor(options) {
    if(options) { this.init(options); }
  }
  init(options) {
    this.color = options.color || this.color;
    this.type = options.type || this.type;
    this.roundSize = options.roundSize ? Boolean(options.roundSize) : this.roundSize ;
    this.gradient = options.gradient ? new QrCodeGradient(options.gradient) : this.gradient;
  }
}

//========================================  QrBackgroundOptions
export class QrBackgroundOptions {
  color = "#fff";                         // rgb(a)
  gradient = null;
  constructor(options) {
    if(options) { this.init(options); }
  }
  init(options) {
    this.color = options.color || this.color;
    this.gradient = options.gradient ? new QrCodeGradient(options.gradient) : this.gradient;
  }
}

//========================================  QrCornersSquareOptions
export class QrCornersSquareOptions {
  color = "#000";                         // rgb(a)
  type = DOT_STYLE.SQUARE;                  // 'dot'|'square'|'extra-rounded'|'rounded'|'dots'|'classy'|'classy-rounded'
  gradient = null;
  constructor(options) {
    if(options) { this.init(options); }
  }
  init(options) {
    this.color = options.color || this.color;
    this.type = options.type || this.type;
    this.gradient = options.gradient ? new QrCodeGradient(options.gradient) : this.gradient;
  }
}

//========================================  QrCornersDotsOptions
export class QrCornersDotsOptions {
  color = "#000";                         // rgb(a)
  type = DOT_STYLE.SQUARE;                  // 'dot'|'square'|'extra-rounded'|'rounded'|'dots'|'classy'|'classy-rounded'
  gradient = null;
  constructor(options) {
    if(options) { this.init(options); }
  }
  init(options) {
    this.color = options.color || this.color;
    this.type = options.type || this.type;
    this.gradient = options.gradient ? new QrCodeGradient(options.gradient) : this.gradient;
  }
}

//========================================  QrCodeGradient
export class QrCodeGradient {
  type = GRADIENT_TYPE.LINEAR;              // 'linear'|'radial'
  rotation = 0;
  colorStops = [];
  constructor(options) {
    if(options) { this.init(options); }
  }
  init(options) {
    this.type = options.type || this.type;
    this.rotation = options.rotation || this.rotation;
    this.colorStops = options.colorStops ? options.colorStops.map(g => new QrCodeGradientStops(g)) : this.colorStops;
  }
}

//========================================  QrCodeGradientStops
export class QrCodeGradientStops {
  offset = 0;                               // 0 - 1
  color = '#000';                         // rgb(a)
  constructor(options) {
    if(options) { this.init(options); }
  }
  init(options) {
    this.offset = options.offset || this.offset;
    this.color = options.color || this.color;
  }
}

//========================================  constants

export const DOT_STYLE = {
  SQUARE: "square",
  DOTS: "dots",
  ROUNDED: "rounded",
  EXTRA_ROUNDED: "extra-rounded",
  CLASSY: "classy",
  CLASSY_ROUNDED: "classy-rounded"
}

export const CORNER_STYLE = {
  SQUARE: "square",
  DOT: "dot",
  EXTRA_ROUNDED: "extra-rounded"
}

export const CORNER_DOT_STYLE = {
  SQUARE: "square",
  DOT: "dot",
  EXTRA_ROUNDED: "extra-rounded"
}

export const QR_MODE = {
  ALPHANUMERIC: "Alphanumeric",
  BYTE: "Byte",
  KANJI: "Kkanji",
  NUMERIC: "Numeric",
}

export const ERROR_CORRECTION_LEVEL = {
  L: "L",
  M: "M",
  Q: "Q",
  H: "H",
}

export const GRADIENT_TYPE = {
  LINEAR: "linear",
  RADIAL: "radial"
}