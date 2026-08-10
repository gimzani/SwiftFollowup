<script setup>
//----------------------------------------------------------
import { ref, computed, toRaw, useSlots } from 'vue'
//----------------------------------------------------------
const props = defineProps({
  headers: { type: Array },
  items: { type: Array },
  selectable: { type: Boolean, default: true },
});
const emit = defineEmits(["row-selected", "col-selected"]);
//--------------------------------------------------------------
const slots = useSlots();
//----------------------------------------------------------
const canExpand = computed(() => Object.keys(slots).includes("expansion"));
//--------------------------------------------------------------
function columnSelect(h) {
  emit("col-selected", toRaw(h));
}
//--------------------------------------------------------------
function rowSelect(item) {
  if (props.selectable) {
    emit("row-selected", toRaw(item));
  }
}
//----------------------------------------------------------
</script>
<template>
  <table class="data-grid">
    <thead>
      <tr class="data-grid-header">
        <th v-if="canExpand">
          &nbsp;
        </th>
        <th
          :class="[h.cssClass]"
          v-for="h in headers"
          @click="columnSelect(h)"
        >
          <slot :name="`header-${h.tag}`" :item="h">{{ h.label }}</slot>
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-for="i in items">
        <tr
          class="data-grid-data-row"
          :class="{ 'selectable': selectable }"
          @click.stop="rowSelect(i)"
        >
          <td
            class="expansion-column"
            v-if="canExpand"
            @click="i.expanded = !i.expanded"
          >
            <button
              class="btn-collapse btn-collapse-sm"
              :class="{ expanded: i.expanded }"
            >
              <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path fill="currentColor" d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path>
              </svg>  
            </button>
          </td>

          <td v-for="h in headers">
            <slot :name="`body-${h.tag}`" :item="i">{{ i[h.tag] }}</slot>
          </td>
        </tr>

        <tr v-if="canExpand && i.expanded">
          <td class="expansion-row" :colspan="colSpan">
            <slot name="expansion" :item="i"></slot>
          </td>
        </tr>
      </template>
    </tbody>

  </table>
</template>

<style>
@import './data-grid.css';
</style>