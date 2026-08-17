<script setup>
//-------------------------------------------------------------------
import { ref, watch, onMounted } from 'vue'
import { useGoogleFonts } from '@sf/google-fonts'
//-------------------------------------------------------------------
const CARD_W = 700
const CARD_H = 400
//-------------------------------------------------------------------
const googleFonts = useGoogleFonts()
//-------------------------------------------------------------------
const props = defineProps({
  cardData: { type: Object, default: () => ({ elements: [] }) }
})
//-------------------------------------------------------------------
const items = ref(props.cardData.elements.map(el => ({ ...el })))
//-------------------------------------------------------------------
function getFontsList() {
  const fonts = new Set()
  for (const el of items.value) {
    if (el.fontFamily) fonts.add(el.fontFamily)
  }
  return Array.from(fonts)
}
//-------------------------------------------------------------------
function handleFonts() {
  googleFonts.setGoogleFontsHeaderTags(getFontsList())
}
//-------------------------------------------------------------------
function elementTransform(item) {
  const x   = item.x ?? 0
  const y   = item.y ?? 0
  const rot = item.rotation ?? 0
  if (rot === 0) return `translate(${x}, ${y})`
  const cx = (item.width  ?? 0) / 2
  const cy = (item.height ?? 0) / 2
  return `translate(${x}, ${y}) rotate(${rot}, ${cx}, ${cy})`
}
//-------------------------------------------------------------------
function textLines(text) {
  return String(text ?? '').split('\n')
}
//-------------------------------------------------------------------
function lineHeight(item) {
  return `${(item.fontSize ?? 16) * 1.2}pt`
}
//-------------------------------------------------------------------
watch(
  () => props.cardData,
  (val) => {
    if(val) {
      items.value = val.elements.map(el => ({ ...el }))
      handleFonts()
    }
  },
  { deep: true }
)
watch(items, handleFonts, { deep: true })
//-------------------------------------------------------------------
onMounted(handleFonts)
//-------------------------------------------------------------------
</script>

<template>
  <svg
    :width="CARD_W"
    :height="CARD_H"
    xmlns="http://www.w3.org/2000/svg"
    class="biz-card"
    v-if="cardData && cardData.card_surface"
  >
    <!-- Card background -->
    <rect
      x="0"
      y="0"
      :width="CARD_W"
      :height="CARD_H"
      :fill="cardData.card_surface.fill"
      :stroke="cardData.card_surface.stroke"
      :stroke-width="cardData.card_surface.stroke_width"
    />

    <!-- Elements -->
    <g
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :transform="elementTransform(item)"
      class="biz-card-el"
    >
      <!-- text -->
      <text
        v-if="item.type === 'text'"
        x="0"
        y="0"
        dominant-baseline="text-before-edge"
        :fill="item.fill ?? '#000'"
        :font-size="`${item.fontSize ?? 16}pt`"
        :font-family="item.fontFamily ?? 'sans-serif'"
        :font-style="item.fontStyle ?? 'normal'"
        :font-weight="item.fontWeight ?? 'normal'"
      >
        <tspan
          v-for="(line, i) in textLines(item.text)"
          :key="i"
          x="0"
          :dy="i === 0 ? 0 : lineHeight(item)"
        >{{ line }}</tspan>
      </text>

      <!-- rectangle -->
      <rect
        v-else-if="item.type === 'rectangle'"
        x="0"
        y="0"
        :width="item.width   ?? 100"
        :height="item.height ?? 50"
        :fill="item.fill         ?? 'none'"
        :stroke="item.stroke     ?? 'none'"
        :stroke-width="item.strokeWidth ?? 0"
      />

      <!-- line -->
      <line
        v-else-if="item.type === 'line'"
        x1="0"
        y1="0"
        :x2="item.x2 != null ? item.x2 - item.x : (item.width  ?? 100)"
        :y2="item.y2 != null ? item.y2 - item.y : (item.lineY2 ?? 0)"
        :stroke="item.fill ?? item.stroke ?? '#000'"
        :stroke-width="item.strokeWidth ?? 1"
      />

      <!-- image -->
      <image
        v-else-if="item.type === 'image'"
        x="0"
        y="0"
        :href="item.url ?? item.src ?? item.href ?? ''"
        :width="item.width   ?? 100"
        :height="item.height ?? 100"
        preserveAspectRatio="xMidYMid meet"
      />

      <!-- path -->
      <path
        v-else-if="item.type === 'path'"
        :d="item.d ?? ''"
        :fill="item.fill         ?? 'none'"
        :stroke="item.stroke     ?? '#000'"
        :stroke-width="item.strokeWidth ?? 1"
      />
    </g>

  </svg>
</template>

<style scoped>
.biz-card {
  display: block;
  user-select: none;
}

.biz-card-el {
  pointer-events: none;
}
</style>
