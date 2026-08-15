<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import { BizCardImage, BizCardForms  } from '@sf/bizcards'
import BizCardEditor from '../src/BizCardEditor.vue'
//----------------------------------------------------------
const readOnly = ref(true)
const gridSnap = ref(true)
const gridSize = ref(10)
const selected = ref(null)   // holds direct reference to BizCard's internal reactive item
//----------------------------------------------------------
const card_data = ref({
  card_surface: { fill: "#000", stroke: "#fff", stroke_width: 1 },
  elements: [
    { x:80,  y:150, id:"3qSFUn", tag:"first_name",      fill:"white",   text:"BENJAMIN",                           type:"text",  fontSize:35, fontFamily:"Poppins", fontStyle:"italic", fontWeight:"normal", rotation:0 },
    { x:80,  y:195, id:"9dU3ya", tag:"last_name",       fill:"#C1AC80", text:"HALL",                               type:"text",  fontSize:35, fontFamily:"Poppins", fontStyle:"italic", fontWeight:"normal", rotation:0 },
    { x:80,  y:250, id:"EMv6gz", tag:"title_company",   fill:"#777",    text:"CEO Swift Followup",                 type:"text",  fontSize:16, fontFamily:"Poppins", fontStyle:"italic", fontWeight:"normal", rotation:0 },
    { x:350, y:150, id:"iqJmG2", tag:"divider",         fill:"#eee",    type:"line", strokeWidth:3, rotation:0, x2:350, y2:275 },
    { x:370, y:155, id:"7rjjvF", tag:"address",         fill:"#777",    text:"260 Creekside Cir. Danville IN,\nUSA 46122", type:"text", fontSize:12, fontFamily:"Poppins", fontStyle:"italic", fontWeight:"normal", rotation:0 },
    { x:370, y:205, id:"UWvCyZ", tag:"mobile",          fill:"#777",    text:"317.696.8375",                       type:"text",  fontSize:12, fontFamily:"Poppins", fontStyle:"italic", fontWeight:"bold", rotation:0 },
    { x:370, y:230, id:"Gq0LfK", tag:"email_address",   fill:"#777",    text:"ben.hall@swiftfollowup.com",         type:"text",  fontSize:12, fontFamily:"Poppins", fontStyle:"italic", fontWeight:"normal", rotation:0 },
    { x:370, y:255, id:"4pfT53", tag:"web_address",     fill:"#777",    text:"www.swiftfollowup.com",              type:"text",  fontSize:12, fontFamily:"Poppins", fontStyle:"italic", fontWeight:"normal", rotation:0 },
    { x:640, y:20,  id:"5qgS21", tag:"linkedin_logo",   url:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1280px-LinkedIn_icon.svg.png", type:"image", width:32, height:32, rotation:0 }
  ]
})
//----------------------------------------------------------
function handleReadOnly(evt) {
  readOnly.value = !evt.target.checked;
  if(readOnly.value) {
    selected.value = null;
  }
}
//----------------------------------------------------------
function onElementSelected({ id, data }) {
  selected.value = data
}
//----------------------------------------------------------
</script>

<template>
<div>

  <div class="card-demo">
    <div class="d-flex justify-content-between align-items-center">
      <h4>Demo: BizCard</h4>
    </div>

    <div class="demo-canvas">
      <BizCardImage :card-data="card_data" />
    </div>

    <div class="demo-selection" v-if="selected && !readOnly">
      <pre class="selection-data">{{ JSON.stringify(selected, null, 2) }}</pre>
    </div>

  </div>

  <div class="card-editor-demo mt-3">   
    <h4 class="mb-1">Demo: BizCard Editor</h4> 
    <BizCardEditor :card-data="card_data" />
  </div>

</div>
</template>

<style scoped>
.card-demo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

  .demo-controls {
    display: flex;
    gap: 1rem;
    align-items: center;

    .control-toggle {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.875rem;
      cursor: pointer;
    }
  }

  .demo-canvas {
    display: flex;
    justify-content: center;
  }

  .demo-selection {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.875rem;
    background: #f5f5f5;
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    border: solid 1px #ddd;

    .selection-id {
      font-family: monospace;
      color: #0078ff;
      margin-left: 0.4rem;
    }

    .selection-tag {
      font-family: monospace;
      color: #888;
      margin-left: 0.25rem;
    }

    .selection-data {
      margin: 0.25rem 0 0;
      font-size: 0.75rem;
      background: #fff;
      border: solid 1px #e0e0e0;
      border-radius: 0.25rem;
      padding: 0.5rem;
      overflow-x: auto;
      white-space: pre-wrap;
    }
  }
}
</style>
