<script setup>
//----------------------------------------------------------
import { ref, reactive, computed, watch, nextTick, onMounted } from 'vue'
import { useGoogleFonts } from '@sf/google-fonts'
//----------------------------------------------------------
const CARD_W = 700
const CARD_H = 400
const MAX_HANDLE_SIZE = 50
const HANDLES = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w']
//----------------------------------------------------------
const googleFonts = useGoogleFonts();
//----------------------------------------------------------
const props = defineProps({
  cardData:          { type: Object,   default: () => { elements: [] } },
  readOnly:          { type: Boolean, default: false },
  gridSnap:          { type: Boolean, default: true },
  gridSize:          { type: Number,  default: 10 },
  handleSize:        { type: Number,  default: 10 },
  handleRotateHeight:{ type: Number,  default: 30 },
  selectionColor:    { type: String,  default: '#5599ff' }
})

const emit = defineEmits(['element-selected'])
//----------------------------------------------------------
// ── State ─────────────────────────────────────────────────

const svgRef     = ref(null)
const items      = ref(props.cardData.elements.map(el => ({ ...el })))
const selectedId = ref(null)
const interaction = ref(null) // { mode, handle, startX, startY, origX, origY, origW, origH, origRot, item }
const bboxMap    = reactive({})  // keyed by item.id → { x, y, width, height }
const groupRefs  = {}            // keyed by item.id → SVG <g> DOM element

// Clamped handle size
const hs = computed(() => Math.min(Math.max(props.handleSize, 1), MAX_HANDLE_SIZE))

// Dynamic cursor on root SVG
const svgCursor = computed(() => {
  if (!interaction.value) return 'default'
  const m = interaction.value.mode
  if (m === 'drag')   return 'grabbing'
  if (m === 'rotate') return 'ew-resize'
  if (m === 'resize') return `${interaction.value.handle}-resize`
  return 'default'
})

// Selected item object
const selectedItem = computed(() =>
  selectedId.value ? (items.value.find(i => i.id === selectedId.value) ?? null) : null
)

// Bounding box of selected item in its local coordinate space
const selectedBBox = computed(() =>
  selectedItem.value ? getItemBBox(selectedItem.value) : null
)

// Rotation transform center for selected item (local coords)
const selectedCenter = computed(() => {
  const b = selectedBBox.value
  if (!b) return { cx: 0, cy: 0 }
  return { cx: b.x + b.width / 2, cy: b.y + b.height / 2 }
})
//----------------------------------------------------------
// ── Watch external element changes ───────────────────────

watch(
  () => props.cardData,
  val => {
    clearSelections()
    items.value = val.elements.map(el => ({ ...el }))
    nextTick(updateBBoxes)
  },
  { deep: true }
)

// fires whenever an element property is changed in-place via the editor form
watch(items, handleFonts, { deep: true })
//----------------------------------------------------------
//----------------------------------------------------------
function getFontsList() {
  const fontsList = new Set();
  for(const el of items.value) {
    if(el.fontFamily) {
      fontsList.add(el.fontFamily);
    }
  }
  return Array.from(fontsList);
}
//----------------------------------------------------------
function handleFonts() {
  const fontsList = getFontsList();
  googleFonts.setGoogleFontsHeaderTags(fontsList);
}
//----------------------------------------------------------
// ── Ref registration ──────────────────────────────────────

function registerRef(id, el) {
  if (el) groupRefs[id] = el
  else    delete groupRefs[id]
}
//----------------------------------------------------------
// ── BBox management ───────────────────────────────────────

function getItemBBox(item) {
  switch (item.type) {
    case 'text':
    case 'path':
      return bboxMap[item.id] ?? { x: 0, y: 0, width: 60, height: 20 }

    case 'rectangle':
      return { x: 0, y: 0, width: item.width ?? 100, height: item.height ?? 50 }

    case 'image':
      return { x: 0, y: 0, width: item.width ?? 100, height: item.height ?? 100 }

    case 'line': {
      const lx2 = item.x2 != null ? (item.x2 - item.x) : (item.width  ?? 100)
      const ly2 = item.y2 != null ? (item.y2 - item.y) : (item.lineY2 ?? 0)
      const sw  = (item.strokeWidth ?? 1) / 2
      return {
        x:      Math.min(0, lx2) - sw,
        y:      Math.min(0, ly2) - sw,
        width:  Math.abs(lx2) + sw * 2,
        height: Math.abs(ly2) + sw * 2
      }
    }

    default:
      return { x: 0, y: 0, width: 100, height: 50 }
  }
}

function refreshBBox(item) {
  if (item.type !== 'text' && item.type !== 'path') return
  const g = groupRefs[item.id]
  if (!g) return
  try {
    const b = g.getBBox()
    bboxMap[item.id] = { x: b.x, y: b.y, width: b.width, height: b.height }
  } catch (_) {}
}

function updateBBoxes() {
  items.value.forEach(refreshBBox)
}

onMounted(() => nextTick(() => { updateBBoxes(); handleFonts() }))
//----------------------------------------------------------
// ── Transform helpers ─────────────────────────────────────

function elementTransform(item) {
  const bbox = getItemBBox(item)
  const cx   = bbox.x + bbox.width  / 2
  const cy   = bbox.y + bbox.height / 2
  const rot  = item.rotation ?? 0
  const x    = item.x ?? 0
  const y    = item.y ?? 0
  if (rot === 0) return `translate(${x}, ${y})`
  return `translate(${x}, ${y}) rotate(${rot}, ${cx}, ${cy})`
}
//----------------------------------------------------------
// ── Text helpers ──────────────────────────────────────────

function textLines(text) {
  return String(text ?? '').split('\n')
}

function lineHeight(item) {
  return `${(item.fontSize ?? 16) * 1.2}pt`
}
//----------------------------------------------------------
// ── SVG coordinate helpers ────────────────────────────────

function svgPoint(e) {
  const pt = svgRef.value.createSVGPoint()
  pt.x = e.clientX
  pt.y = e.clientY
  return pt.matrixTransform(svgRef.value.getScreenCTM().inverse())
}

function snap(v) {
  if (!props.gridSnap) return Math.round(v)
  return Math.round(v / props.gridSize) * props.gridSize
}
//----------------------------------------------------------
// ── Handle positions ──────────────────────────────────────

function handlePositions(bbox) {
  const { x, y, width: w, height: h } = bbox
  return {
    nw: { x: x,         y: y },
    n:  { x: x + w / 2, y: y },
    ne: { x: x + w,     y: y },
    e:  { x: x + w,     y: y + h / 2 },
    se: { x: x + w,     y: y + h },
    s:  { x: x + w / 2, y: y + h },
    sw: { x: x,         y: y + h },
    w:  { x: x,         y: y + h / 2 }
  }
}

//----------------------------------------------------------
watch(() => props.readOnly, () => {
  clearSelections();
})


//----------------------------------------------------------
// ── Interaction ───────────────────────────────────────────

function clearSelections() {
  selectedId.value  = null
  interaction.value = null
}

function onSvgClick(e) {
  if (props.readOnly) return
  // Only clear if clicking on the root card surface (not on an element)
  if (e.target === svgRef.value || e.target.id === 'card_surface') {
    clearSelections();
  }
}

function onElementPointerDown(e, item) {
  if (props.readOnly) return
  e.stopPropagation()
  e.preventDefault()

  const wasSelected = selectedId.value === item.id

  if (!wasSelected) {
    selectedId.value = item.id
    nextTick(() => {
      refreshBBox(item)
      emit('element-selected', {
        id:      item.id,
        element: groupRefs[item.id],
        data:    item
      })
    })
  }

  const pt = svgPoint(e)
  interaction.value = {
    mode:  'drag',
    startX: pt.x,
    startY: pt.y,
    origX:  item.x ?? 0,
    origY:  item.y ?? 0,
    item
  }
}

function onHandlePointerDown(e, handle) {
  if (props.readOnly) return
  e.stopPropagation()
  e.preventDefault()

  const item = selectedItem.value
  if (!item) return
  const bbox = selectedBBox.value
  const pt   = svgPoint(e)

  if (handle === 'rotate') {
    interaction.value = {
      mode:    'rotate',
      startX:  pt.x,
      origRot: item.rotation ?? 0,
      item
    }
  } else {
    interaction.value = {
      mode:   'resize',
      handle,
      startX:  pt.x,
      startY:  pt.y,
      origX:   item.x ?? 0,
      origY:   item.y ?? 0,
      origW:   bbox.width,
      origH:   bbox.height,
      item,
      bbox:    { ...bbox }
    }
  }
}

function onSvgPointerMove(e) {
  if (!interaction.value) return
  const pt = svgPoint(e)
  const { mode, item } = interaction.value

  if (mode === 'drag') {
    const dx = pt.x - interaction.value.startX
    const dy = pt.y - interaction.value.startY
    item.x = snap(interaction.value.origX + dx)
    item.y = snap(interaction.value.origY + dy)
    if (item.type === 'text' || item.type === 'path') {
      nextTick(() => refreshBBox(item))
    }
  } else if (mode === 'rotate') {
    const dx = pt.x - interaction.value.startX
    item.rotation = Math.round(interaction.value.origRot + dx) % 360
  } else if (mode === 'resize') {
    doResize(pt)
  }
}

function onSvgPointerUp() {
  interaction.value = null
}

// ── Resize math ───────────────────────────────────────────

function doResize(pt) {
  const { handle, startX, startY, origX, origY, origW, origH, item } = interaction.value

  // Convert mouse delta to element-local coordinates (inverse rotation)
  const angle = ((item.rotation ?? 0) * Math.PI) / 180
  const cos   = Math.cos(angle)
  const sin   = Math.sin(angle)
  const dxRoot = pt.x - startX
  const dyRoot = pt.y - startY
  const dx =  dxRoot * cos + dyRoot * sin
  const dy = -dxRoot * sin + dyRoot * cos

  let newX = origX, newY = origY
  let newW = origW, newH = origH

  if (handle.includes('n')) { newY = origY + dy; newH = origH - dy }
  if (handle.includes('s')) { newH = origH + dy }
  if (handle.includes('e')) { newW = origW + dx }
  if (handle.includes('w')) { newX = origX + dx; newW = origW - dx }

  // Minimum size guard
  if (newW < 2) { newW = 2; if (handle.includes('w')) newX = origX + origW - 2 }
  if (newH < 2) { newH = 2; if (handle.includes('n')) newY = origY + origH - 2 }

  item.x = snap(newX)
  item.y = snap(newY)

  const rw = Math.max(2, Math.round(newW))
  const rh = Math.max(2, Math.round(newH))

  if (item.type === 'rectangle' || item.type === 'image') {
    item.width  = rw
    item.height = rh
    bboxMap[item.id] = getItemBBox(item)
  } else if (item.type === 'line') {
    if (item.x2 != null) {
      item.x2 = Math.round(item.x + rw)
      item.y2 = Math.round(item.y + rh)
    } else {
      item.width = rw
    }
    bboxMap[item.id] = getItemBBox(item)
  } else if (item.type === 'path') {
    item.width  = rw
    item.height = rh
  }
}
//----------------------------------------------------------
</script>

<template>
  <svg
    ref="svgRef"
    :width="CARD_W"
    :height="CARD_H"
    xmlns="http://www.w3.org/2000/svg"
    class="biz-card"
    :style="{ cursor: svgCursor }"
    @click.self="onSvgClick"
    @pointermove="onSvgPointerMove"
    @pointerup="onSvgPointerUp"
    @pointerleave="onSvgPointerUp"
  >

    <!-- ── Card background ──────────────────────────────── -->
    <rect
      id="card_surface"
      x="0"
      y="0"
      :width="CARD_W"
      :height="CARD_H"
      :fill="cardData.card_surface.fill"
      :stroke="cardData.card_surface.stroke"
      :stroke-width="cardData.card_surface.stroke_width"
      @click="onSvgClick"
    />

    <!-- ── Element layer ────────────────────────────────── -->
    <g
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :ref="el => registerRef(item.id, el)"
      :transform="elementTransform(item)"
      class="biz-card-el"
      :class="{ 'is-editable': !readOnly, 'is-selected': selectedId === item.id }"
      @pointerdown="!readOnly && onElementPointerDown($event, item)"
    >

      <!-- text ─────────────────────────────────────────── -->
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

      <!-- rectangle ────────────────────────────────────── -->
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

      <!-- line ─────────────────────────────────────────── -->
      <line
        v-else-if="item.type === 'line'"
        x1="0"
        y1="0"
        :x2="item.x2 != null ? item.x2 - item.x : (item.width  ?? 100)"
        :y2="item.y2 != null ? item.y2 - item.y : (item.lineY2 ?? 0)"
        :stroke="item.fill ?? item.stroke ?? '#000'"
        :stroke-width="item.strokeWidth ?? 1"
      />

      <!-- image ────────────────────────────────────────── -->
      <image
        v-else-if="item.type === 'image'"
        x="0"
        y="0"
        :href="item.url ?? item.src ?? item.href ?? ''"
        :width="item.width   ?? 100"
        :height="item.height ?? 100"
        preserveAspectRatio="xMidYMid meet"
      />

      <!-- path ─────────────────────────────────────────── -->
      <path
        v-else-if="item.type === 'path'"
        :d="item.d ?? ''"
        :fill="item.fill         ?? 'none'"
        :stroke="item.stroke     ?? '#000'"
        :stroke-width="item.strokeWidth ?? 1"
      />

    </g>

    <!-- ── Selection overlay ────────────────────────────── -->
    <g
      v-if="selectedItem && selectedBBox"
      :transform="elementTransform(selectedItem)"
      class="selection-overlay"
    >
      <!-- Bounding rect -->
      <rect
        :x="selectedBBox.x - 1"
        :y="selectedBBox.y - 1"
        :width="selectedBBox.width + 2"
        :height="selectedBBox.height + 2"
        fill="none"
        :stroke="selectionColor"
        stroke-width="1"
        stroke-dasharray="4 2"
        pointer-events="none"
      />

      <!-- Origin handle (rotation center) -->
      <circle
        :cx="selectedCenter.cx"
        :cy="selectedCenter.cy"
        :r="hs / 2"
        fill="white"
        :stroke="selectionColor"
        stroke-width="1.5"
        pointer-events="none"
      />

      <!-- Rotation connector line -->
      <line
        :x1="selectedCenter.cx"
        :y1="selectedBBox.y - 1"
        :x2="selectedCenter.cx"
        :y2="selectedBBox.y - handleRotateHeight"
        :stroke="selectionColor"
        stroke-width="1"
        pointer-events="none"
      />

      <!-- Rotation handle -->
      <circle
        :cx="selectedCenter.cx"
        :cy="selectedBBox.y - handleRotateHeight"
        :r="hs / 2"
        fill="white"
        :stroke="selectionColor"
        stroke-width="1.5"
        class="handle-rotate"
        @pointerdown.stop.prevent="onHandlePointerDown($event, 'rotate')"
      />

      <!-- Resize handles (skipped for text) -->
      <template v-if="selectedItem.type !== 'text'">
        <rect
          v-for="dir in HANDLES"
          :key="dir"
          :x="handlePositions(selectedBBox)[dir].x - hs / 2"
          :y="handlePositions(selectedBBox)[dir].y - hs / 2"
          :width="hs"
          :height="hs"
          fill="white"
          :stroke="selectionColor"
          stroke-width="1.5"
          rx="1"
          :class="`handle-resize handle-${dir}`"
          @pointerdown.stop.prevent="onHandlePointerDown($event, dir)"
        />
      </template>
    </g>

  </svg>
</template>

<style scoped>
.biz-card {
  display: block;
  user-select: none;
  touch-action: none;
}

/* ── Element groups ────────────────────────────────────── */
.biz-card-el {
  cursor: default;
  pointer-events: bounding-box;

  &.is-editable {
    cursor: grab;

    &:active {
      cursor: grabbing;
    }

    &:hover {
      filter: drop-shadow(0 0 3px rgba(85, 153, 255, 0.5));
    }
  }
}

/* ── Selection overlay ─────────────────────────────────── */
.selection-overlay {
  pointer-events: none;
}

/* Resize handles */
.handle-resize {
  pointer-events: all;
  cursor: grab;
}

.handle-nw { cursor: nw-resize; }
.handle-n  { cursor: n-resize;  }
.handle-ne { cursor: ne-resize; }
.handle-e  { cursor: e-resize;  }
.handle-se { cursor: se-resize; }
.handle-s  { cursor: s-resize;  }
.handle-sw { cursor: sw-resize; }
.handle-w  { cursor: w-resize;  }

/* Rotation handle */
.handle-rotate {
  pointer-events: all;
  cursor: grab;
}
</style>