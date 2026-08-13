<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import BizCardSurface from './BizCardSurface.vue';
import BizCardForms from './BizCardForms.vue';
//----------------------------------------------------------
const props = defineProps({
  cardData: { type: Object }
});
const emit = defineEmits([]);
//----------------------------------------------------------
const readOnly = ref(false)
const gridSnap = ref(true)
const gridSize = ref(10)
const selected = ref(null)   // holds direct reference to BizCard's internal reactive item
//----------------------------------------------------------
function onElementSelected({ id, data }) {
  selected.value = data
}
//----------------------------------------------------------
</script>
<template>
<div class="bizcard-editor">

  <div class="bizcard-editor-controls">
    <div class="d-flex align-items-center">
      <span>
        <label class="control-toggle">
          <input type="checkbox" :checked="gridSnap" @change="gridSnap = $event.target.checked" />
          <label>Grid Snap</label>
        </label>        
      </span>
      <span class="px-2 text-muted">|</span>
      <span>
        <label class="me-1">Grid Size</label>
        <input type="number" style="width:65px" :step="5" :min="5" :max="50" v-model.number="gridSize" />
      </span>
    </div>
    <div>
      <button title="select previous element">&lt;</button>
      <button title="select next element">&gt;</button>
      <button title="remove element">-</button>
      <button title="add element">+</button>
    </div>

  </div>

  <div class="bizcard-display-area">    
    <BizCardSurface
      :card-data="cardData"
      :read-only="readOnly"
      :grid-snap="gridSnap"
      :grid-size="gridSize"
      @element-selected="onElementSelected"
    />
  </div>
  <div class="bizcard-form-area"> 
    <BizCardForms
      v-model:cardSurface="cardData.card_surface"
      v-model="selected"
    />
  </div>

</div>
</template>

<style scoped>
.bizcard-editor {  
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;  
  background-color: #efefef;
  border: solid 1px #333;
  border-radius: 1rem;

  .bizcard-editor-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    .control-toggle {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      cursor: pointer;
    }
  }

  .bizcard-display-area {
    display: flex;
    justify-content: center;
    background-color: #fff;
    background-image:
      linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%),
      linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%);
    background-size: 20px 20px;
    background-position: 0 0, 10px 10px;
    border-radius: 0.5rem;
    padding: 1.5rem;
    border: solid 1px #ccc;
  }

  .bizcard-form-area {
    padding: 0.5rem;
  }

}
</style>