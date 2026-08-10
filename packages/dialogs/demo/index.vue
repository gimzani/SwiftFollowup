<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import { useDialog, useToasts, Modal } from '@sf/dialogs'
//----------------------------------------------------------
import "toastify-js/src/toastify.css";
//----------------------------------------------------------
const dialog = useDialog();
const toasts = useToasts();
//----------------------------------------------------------
const cfg = ref({ title: 'Hello World!', text: 'Welcome to the Dialog.' });
//----------------------------------------------------------
function launchMessage() {
  dialog.message(cfg.value);  
}
//----------------------------------------------------------
async function launchConfirmation() {
  let result = await dialog.confirm({
    title: "Really?",
    text: "You sure you want to do this?"
  });
  console.log(result)
  if(result.isConfirmed) {
    dialog.message({ text: "I dood it." });
  } else {
    dialog.message({ text: "Whew, that was close." });
  }  
}
//----------------------------------------------------------
</script>
<template>
<div class="demo">

  <h4>Demo: Dialogs</h4>

  <div class="demo-group">
    <label>Dialog Title</label>
    <input type="text" class="demo-input" v-model="cfg.title" />
  </div>

  <div class="demo-group">
    <label>Dialog Text</label>
    <input type="text" class="demo-input" v-model="cfg.text" />
  </div>

  <div class="demo-group">
    <button @click="launchMessage">Launch Message</button>
    <button @click="launchConfirmation">Launch Confirm</button>
  </div>

  <h4>Demo: Toasts</h4>

  <button @click="toasts.success('Success - Good job!')">Success Toast</button>
  <button @click="toasts.info('Info - The more you know...')">Info Toast</button>
  <button @click="toasts.warning('Warning - Careful!')">Warning Toast</button>
  <button @click="toasts.error('Error - You messed up!')">Error Toast</button>

</div>
</template>

<style lang="css" scoped>
.demo-group {
  margin: 0.5rem;
}
.demo-input {

  width: 100%; 
  border:solid 1px #ccc; 
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem; 
}

</style>