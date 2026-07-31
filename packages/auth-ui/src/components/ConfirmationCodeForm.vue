<script setup>
//----------------------------------------------------------
import { ref, computed } from 'vue'
//----------------------------------------------------------
const emit = defineEmits(['submit']);
//----------------------------------------------------------
const code = ref(['','','','','','']);
//----------------------------------------
const d1 = ref(null);
const d2 = ref(null);
const d3 = ref(null);
const d4 = ref(null);
const d5 = ref(null);
const d6 = ref(null);
const btn = ref(null);
//----------------------------------------
const focusElements = [d1,d2,d3,d4,d5,d6,btn];
const isValid = computed(() => code.value.join('').length===6 );
//----------------------------------------------------------
function handleKeyDown(evt, ind) {
  if (evt.key === 'Tab') {
    return;
  }

  if (evt.key === 'Enter') {
    evt.preventDefault();
    if (isValid.value) {
      btn.value.focus();
      confirm();
    }
    return;
  }

  if (/^\d$/.test(evt.key)) {
    evt.preventDefault();
    code.value[ind] = evt.key;
    if (ind < 5) {
      focusElements[ind + 1].value.focus();
    } else {
      btn.value.focus();
    }
    return;
  }

  if (evt.key === 'Delete') {
    evt.preventDefault();
    code.value[ind] = '';
    return;
  }

  if (evt.key === 'Backspace') {
    evt.preventDefault();
    if (code.value[ind]) {
      code.value[ind] = '';
      return;
    }

    if (ind > 0) {
      code.value[ind - 1] = '';
      focusElements[ind - 1].value.focus();
    }
    return;
  }

  if (evt.key === 'ArrowLeft' && ind > 0) {
    evt.preventDefault();
    focusElements[ind - 1].value.focus();
    return;
  }

  if (evt.key === 'ArrowRight' && ind < 5) {
    evt.preventDefault();
    focusElements[ind + 1].value.focus();
    return;
  }

  if (evt.key.length === 1) {
    evt.preventDefault();
  }
}
//----------------------------------------------------------
function confirm() {
  emit('submit', code.value.join(''))
}
//----------------------------------------------------------
</script>
<template>
<div class="panel w-100">  
  <div class="h3 mb-3">Confrimation Code</div>
  <div class="confirmation-code">
    <input ref="d1" type="text" inputmode="numeric" maxlength="1" :value="code[0]" @keydown="handleKeyDown($event, 0)" />
    <input ref="d2" type="text" inputmode="numeric" maxlength="1" :value="code[1]" @keydown="handleKeyDown($event, 1)" />
    <input ref="d3" type="text" inputmode="numeric" maxlength="1" :value="code[2]" @keydown="handleKeyDown($event, 2)" />
    <input ref="d4" type="text" inputmode="numeric" maxlength="1" :value="code[3]" @keydown="handleKeyDown($event, 3)" />
    <input ref="d5" type="text" inputmode="numeric" maxlength="1" :value="code[4]" @keydown="handleKeyDown($event, 4)" />
    <input ref="d6" type="text" inputmode="numeric" maxlength="1" :value="code[5]" @keydown="handleKeyDown($event, 5)" />
  </div>
  <div class="d-flex justify-content-between mt-3">
    <div class="ps-2">
    </div>
    <div>
      <button ref="btn" class="btn btn-primary" @click="confirm" :disabled="!isValid">Confirm</button>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.confirmation-code {
  display: flex;
  justify-content: center;

  input[type=text] {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    caret-color: transparent;
    text-align: center;
    font-size: 3rem;
    margin: 0 3px;
    padding: 0;
    width: 50px;
  }
}
</style>