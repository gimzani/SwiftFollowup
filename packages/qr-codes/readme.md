# QR Codes

**@sf/qr-codes** has a dependency on [qr-code-styling](https://qr-code-styling.com/) - which is the engine behind the QR Code image generation.

The **@sf/qr-codes** package consists of two Components.

1. QrCode
2. QrCodeEditor

### QrCode

The **QrCode** component is the component that generates the Qr Code image.

**Props:**

Prop | type | description |
|----|----|----|
| options | object | data that defines the qr-code. (called a qrCodeOptions object. See [qr-code-styling documentation](https://github.com/kozakdenys/qr-code-styling)) |
| downloadQrCode({name, extension}) | function | exposed function for downloading QrCodes 


**Usage:**

```js
import { QrCode } from '@sf/qr-codes';     // components
import '@sf/qr-codes/css';                 // stylesheet
```

```html
<QrCode :options="qrDocdeData" />
```

### QrCodeEditor

The **QrCodeEditor** component is a fully encapsulated editor for the Qr Code Generation, with the ability to save and download QrCode images.

**Props:**

Prop | type | description |
|----|----|----|
| options | object | the data for the QrCode |
| minSize | number | the minimum size for the QrCode [default: 200] |
| maxSize | number | the maximum size for the QrCode [default: 600] |
| showDownload | boolean | show/hide download tools |
| @save-data | object | returns QrCode options data - (you implement) |
| @download-data | object | returns QrCode options data and file data for saving via NodeJS or Browser - (you implement) |


**Usage:**

```js
import { QrCodeEditor } from '@sf/qr-codes';
```

```html
<QrCodeEditor 
  :options="options" 
  :minSize="100"
  :maxSize="800"
  :showDownload="showDownload" 
  @save-data="saveDataDemo"
/>
```

### QrCodeScanner

The **QrCodeScanner** is a fully encapsulated scanner for Qr Codes. It takes NO input props, but enables the device camera to scan QR codes.

**Props:**
Prop | type | description |
|----|----|----|
| @code-matched | string | returns the QrCode data - (you implement) |
