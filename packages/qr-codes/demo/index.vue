<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
//----------------------------------------------------------
import { QrCodeEditor, QrCodeScanner } from '@sf/qr-codes';
import { QrCodeData } from '@sf/models';
import '@sf/qr-codes/css';
import { JsonEditor } from '@sf/json-tools';
//----------------------------------------------------------
const qrOptions = ref(new QrCodeData(
  {
    "width": 300,
    "height": 300,
    "type": "svg",
    "data": "https://devbudo.com",
    "image": null,
    "margin": 10,
    "qrOptions": {
      "typeNumber": 0,
      "mode": "Byte",
      "errorCorrectionLevel": "L"
    },
    "imageOptions": {
      "hideBackgroundDots": true,
      "imageSize": 0.25,
      "crossOrigin": "anonymous",
      "margin": 2,
      "saveAsBlob": true
    },
    "backgroundOptions": {
      "color": "#fff",
      "gradient": null
    },
    "dotsOptions": {
      "color": "#0a114f",
      "type": "square",
      "roundSize": true,
      "gradient": null
    },
    "cornersSquareOptions": {
      "color": "#100436",
      "type": "extra-rounded",
      "gradient": null
    },
    "cornersDotOptions": {
      "color": "#100436",
      "type": "extra-rounded",
      "gradient": null
    }
  }
));
const showDownload = ref(false);
//----------------------------------------------------------
function saveDataDemo(data) {
  console.log('DATA:', data);
  qrOptions.value = data;
}
//----------------------------------------------------------
function codeMatched(decoded) {
  console.log('decoded', decoded);
  alert(decoded)
}
//----------------------------------------------------------
</script>
<template>
<div class="demo">

  <h4>Demo: QrCodeEditor and QrCode</h4>
  
  <div style="padding: 1rem 0;">
    <label style="cursor: pointer;">
      <input type="checkbox" v-model="showDownload" /> Show Download Features
    </label>
  </div>

  <div class="row g-2">
    <div class="col-md-8">
      <QrCodeEditor 
        :options="qrOptions" 
        :minSize="100"
        :maxSize="800"
        :showDownload="showDownload" 
        @save-data="saveDataDemo"
      />
    </div>
    <div class="col-md-4">
      <JsonEditor v-model="qrOptions" />
    </div>
  </div>

  <h4>Demo: QrCodeScanner</h4>

  <QrCodeScanner @code-matched="codeMatched" />

</div>
</template>