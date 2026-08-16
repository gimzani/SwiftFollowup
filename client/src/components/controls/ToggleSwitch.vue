<script setup>
//-----------------------------------------
import { computed } from 'vue'
//-----------------------------------------
const props = defineProps({
  modelValue: { type: Boolean, required: true }
});
const emit = defineEmits(['update:modelValue', 'change']);
//-----------------------------------------
const indicatorStyles = computed(() => {
  return { transform: props.modelValue ? 'translateX(26px)' : 'translateX(0)' };
});
//-----------------------------------------
function toggle() {
  emit('update:modelValue', !props.modelValue);
  emit('change');
}
</script>

<template>
<span
  class="toggle-switch"
  :class="{ 'active': props.modelValue }"
  role="checkbox"
  :aria-checked="modelValue.toString()"
  tabindex="0"
  @click="toggle"
  @keydown.space.prevent="toggle"
>
  <span class="toggle-background"></span>
  <span class="toggle-thumb" :style="indicatorStyles"></span>

</span>
</template>