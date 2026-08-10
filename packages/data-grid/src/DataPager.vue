<script setup>
//----------------------------------------------------------
import { reactive, computed, watch, toRaw } from 'vue'
//----------------------------------------------------------
const props = defineProps({
  items: { type: Array },
  pageSize: { type: Number, default: 5 },
  total: { type: Number, default: 0 },
  showPaging: { type: Boolean, default: true },
  showRange: { type: Boolean, default: false }
});
const emit = defineEmits(['changed']);
//----------------------------------------------------------
const pagerState = reactive({
  page: 1,
  pageSize: props.pageSize,
  total: props.total
});
//----------------------------------------------------------
const totalPages = computed(() => {
  if(!props.items || props.items.length===0) return 0;
  pagerState.total = props.items.length;
  return Math.ceil(pagerState.total / pagerState.pageSize);
});
//----------------------------------------------------------
const currentRange = computed(() => {
  let records = (pagerState.pageSize < pagerState.total) ? pagerState.pageSize : pagerState.total;
  let start = parseInt((pagerState.page-1) * records)+1;
  let end = (start + records) - 1;
  if(end>pagerState.total) {
    end = pagerState.total;
  }
  return `${start}-${end}`
});
//---------------------------------------------------------------------
function changePage(cmd) {
  switch(cmd) {
    case "firstPage": pagerState.page = 1;
    break;
    case "previousPage": pagerState.page > 1 ? pagerState.page-- : pagerState.page;
    break;
    case "nextPage": pagerState.page < totalPages.value ? pagerState.page++ : pagerState.page;
    break;
    case "lastPage": pagerState.page = totalPages.value;
    break;
  }
  emit('changed', toRaw(pagerState));
}
//----------------------------------------------------------
watch(() => props.items, () => {
  pagerState.page = 1;
  emit('changed', toRaw(pagerState));
}, { immediate: true });
//----------------------------------------------------------
watch(() => props.pageSize, (val) => {
  pagerState.pageSize = val ? val : 0;
}, { immediate: true });
//----------------------------------------------------------
watch(() => props.total, (val) => {
  pagerState.total = val ? val : 0;
}, { immediate: true });
//----------------------------------------------------------
</script>
<template>
<div class="data-pager">

  <div v-if="showPaging">
    <span v-if="totalPages>0">Page {{ pagerState.page }} of {{ totalPages }}</span>
    <span v-else>--</span>    
  </div>

  <div v-if="showRange">
    <span v-if="totalPages>0">Showing {{ currentRange }}</span>
    <span v-else>--</span>    
  </div>

  <div>
    <div v-if="totalPages>0">
      <button class="pager-icon" title="go to first page" @click="changePage('firstPage')" :disabled="pagerState.page === 1">
        <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"></path>
        </svg>
      </button>
      <button class="pager-icon" title="go to previous page" @click="changePage('previousPage')" :disabled="pagerState.page === 1">          
        <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path fill="currentColor" d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path>
        </svg>
      </button>
      <span class="page-number" :title="`page ${pagerState.page}`">{{pagerState.page}}</span>
      <button class="pager-icon" title="go to next page" @click="changePage('nextPage')" :disabled="pagerState.page === totalPages">
        <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path fill="currentColor" d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path>
        </svg>     
      </button>
      <button class="pager-icon" title="go to last page" @click="changePage('lastPage')" :disabled="pagerState.page === totalPages">          
        <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"></path>
        </svg>
      </button>
    </div>
  </div>

</div>
</template>

<style>
@import './data-grid.css';
</style>