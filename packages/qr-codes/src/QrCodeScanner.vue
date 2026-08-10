<script setup>
//----------------------------------------------------------
import { onMounted, ref, watchEffect } from 'vue'
import { Html5Qrcode } from "html5-qrcode";
//----------------------------------------------------------
const props = defineProps({
  autoscan: { type: Boolean, default: false }
});
const emit = defineEmits(['code-matched'])
//----------------------------------------------------------
const QR_SCAN_CONFIG = {
  fps: 10,    // Optional, frame per seconds for qr code scanning
  qrbox: { width: 250, height: 250 }  // Optional, if you want bounded box UI
}
const VERBOSE = false;
//----------------------------------------------------------
let html5QrCode = null;
//----------------------------------------------------------
const scannerVideo = ref(null);
const urlResult = ref(null);
//----------------------------------------------------------
async function getCameraId() {
  let cameraId = null;
  let devices = await Html5Qrcode.getCameras();
  if (devices && devices.length) {
    cameraId = devices[0].id;
  }
  return cameraId;
}
//----------------------------------------------------------
async function startScanning(cameraId) {
  html5QrCode = new Html5Qrcode("reader");
  await html5QrCode.start(cameraId, 
      QR_SCAN_CONFIG,
      codeMatched,
      codeNotMatched
    ) 
    .catch((err) => {
      // Start failed, handle it.
    });
}
//----------------------------------------------------------
function codeMatched(decodedText, decodedResult) {
  urlResult.value = decodedText;
  emit('code-matched', decodedText);
  endScan();
}
//----------------------------------------------------------
function codeNotMatched(errorMessage) {
  if(VERBOSE) { console.log('nope', errorMessage) }
}
//----------------------------------------------------------
async function beginScan() {  
  urlResult.value = null;
  let cameraId = await getCameraId();
  if(cameraId) {
    await startScanning(cameraId);
    if(VERBOSE) { console.log("scanning...") }
  } else {
    console.error('bloody hell')
  }    
}
//----------------------------------------------------------
function endScan() {
  html5QrCode.stop().then((ignore) => {
    if(VERBOSE) { console.log("scanning stopped") }
  }).catch((err) => {
    console.log("Can't stop");
  });
}
//----------------------------------------------------------
watchEffect(() => {
  if(props.autoscan) {
    beginScan();
  }
})
//----------------------------------------------------------
</script>
<template>
<div class="qr-code-scanner">
  <div class="scanner-window" v-if="!urlResult">
    <div id="reader"></div>
  </div>
  <div class="url-result" v-if="urlResult">
    <a class="url-result-link" :href="urlResult" target="_blank">Go To Url</a>
    <div class="url-result-text">{{ urlResult }}</div>
  </div>
  <div class="scanner-buttons" v-if="!autoscan">
    <button @click="beginScan(true)">Start Scanning</button>
    <button @click="endScan(true)" v-if="!urlResult">Stop Scanning</button>
  </div>
</div>
</template>