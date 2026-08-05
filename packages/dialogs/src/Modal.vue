<script setup>
//-------------------------------------------------------------------------
import { watch, onMounted, onUnmounted } from 'vue'
//-------------------------------------------------------------------------
const props = defineProps({
  show: { type: Boolean, required: true },
  closeButton: { type: Boolean, default: false },
  containerClass: { type: String, default: "default" },
  closeOnMaskClick:{ type: Boolean, default:false },
  closeOnEscapeKey:{ type: Boolean, default:true }
});
const emit = defineEmits(['close']);
//-------------------------------------------------------------------------
watch(() => props.show, (val) => {
  if(val){
    document.body.classList.add("modal-open");
  } else {
    document.body.classList.remove("modal-open");
  }
});
//-------------------------------------------------------------------------
function close() {
  emit('close');
}
//-------------------------------------------------------------------------
function escapeListener(evt) {
  if (props.show && evt.key == 'Escape') {
    close();
  }
}
//-------------------------------------------------------------------------
onMounted(()=> { 
  if (props.closeOnEscapeKey == true) {
    document.addEventListener("keydown", escapeListener);
  }
});
//-------------------------------------------------------------------------
onUnmounted(() => { 
  if (props.closeOnEscapeKey == true) {
    document.removeEventListener("keydown", escapeListener);
  }
});
//-------------------------------------------------------------------------
</script>

<template>  
<transition name="modal">
  <div class="modal-mask" @click="closeOnMaskClick ? close() : null" v-show="show">
    <div class="modal-wrapper">
      <div class="modal-container" :class="[containerClass]" @click.stop>
        <button class="close-button" v-if="closeButton" @click="close">X</button>
        <slot></slot>      
      </div>
    </div>
  </div>
</transition>
</template>