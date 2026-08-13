<script setup>
//----------------------------------------------------------
import { computed } from 'vue'
import { ColorPickerInput } from '@sf/color-picker-input'
import { GoogleFontsSelect } from '@sf/google-fonts'
import { BIZCARD_DATATYPE } from './models.js'
//----------------------------------------------------------
const props = defineProps({
  cardSurface: { type: Object },
  modelValue: { type: Object, default: null }
})
const emit = defineEmits(['update:cardSurface', 'update:modelValue'])
//----------------------------------------------------------
const type = computed(() => props.modelValue?.type ?? null)
//----------------------------------------------------------
function updateSurface(key, value) {
  if (!props.cardSurface) return
  props.cardSurface[key] = value
  emit('update:cardSurface', props.cardSurface)
}
//----------------------------------------------------------
function update(key, value) {
  if (!props.modelValue) return
  props.modelValue[key] = value
  emit('update:modelValue', props.modelValue)
}
//----------------------------------------------------------
</script>

<template>

  <div class="bizcard-forms">

    <!-- ── Card Surface ──────────────────────────────────── -->
    <div class="form-section-header">Card Surface</div>
    <div class="form-section">
      <div class="form-group">
        <label>Background</label>
        <ColorPickerInput
          :modelValue="cardSurface.fill"
          @update:modelValue="updateSurface('fill', $event)"
        />
      </div>
      <div class="form-row">
        <div class="form-group" style="flex: 2">
          <label>Border Color</label>
          <ColorPickerInput
            :modelValue="cardSurface.stroke"
            @update:modelValue="updateSurface('stroke', $event)"
          />
        </div>
        <div class="form-group">
          <label>Border Width</label>
          <input
            type="number"
            :value="cardSurface.stroke_width"
            @input="updateSurface('stroke_width', +$event.target.value)"
            :min="0"
          />
        </div>
      </div>
    </div>

    <!-- ── Selected element ──────────────────────────────── -->
    <template v-if="modelValue">

      <div class="form-type-label">
        <span class="type-badge">{{ type }}</span>
        <span class="type-tag" v-if="modelValue.tag">{{ modelValue.tag }}</span>
      </div>

      <!-- ── Base fields (all types) ────────────────────── -->
      <div class="form-section">
        <div class="form-group">
          <label>Tag</label>
          <input
            type="text"
            :value="modelValue.tag"
            @input="update('tag', $event.target.value)"
          />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>X</label>
            <input
              type="number"
              :value="modelValue.x"
              @input="update('x', +$event.target.value)"
            />
          </div>
          <div class="form-group">
            <label>Y</label>
            <input
              type="number"
              :value="modelValue.y"
              @input="update('y', +$event.target.value)"
            />
          </div>
          <div class="form-group">
            <label>Rotation</label>
            <input
              type="number"
              :value="modelValue.rotation"
              @input="update('rotation', +$event.target.value)"
            />
          </div>
        </div>
      </div>

      <!-- ── TEXT ───────────────────────────────────────── -->
      <template v-if="type === BIZCARD_DATATYPE.TEXT">
        <div class="form-section">
          <div class="form-group">
            <label>Text</label>
            <textarea
              :value="modelValue.text"
              @input="update('text', $event.target.value)"
            ></textarea>
          </div>
          <div class="form-group">
            <label>Fill Color</label>
            <ColorPickerInput
              :modelValue="modelValue.fill"
              @update:modelValue="update('fill', $event)"
            />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Font Size</label>
              <input
                type="number"
                :value="modelValue.fontSize"
                @input="update('fontSize', +$event.target.value)"
              />
            </div>
            <div class="form-group">
              <label>Font Family</label>
              <GoogleFontsSelect 
                :modelValue="modelValue.fontFamily"
                @input="update('fontFamily', $event.target.value)"
              >
              </GoogleFontsSelect>
            </div>
          </div>


          <div class="form-row">
            <div class="form-group">
              <label>Font Style</label>
              <select :value="modelValue.fontStyle" @change="update('fontStyle', $event.target.value)">
                <option value="normal">Normal</option>
                <option value="italic">Italic</option>
              </select>
            </div>
            <div class="form-group">
              <label>Font Weight</label>
              <select :value="modelValue.fontWeight" @change="update('fontWeight', $event.target.value)">
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
              </select>
            </div>
          </div>



        </div>
      </template>

      <!-- ── IMAGE ──────────────────────────────────────── -->
      <template v-else-if="type === BIZCARD_DATATYPE.IMAGE">
        <div class="form-section">
          <div class="form-group">
            <label>URL</label>
            <input
              type="text"
              :value="modelValue.url"
              @input="update('url', $event.target.value)"
            />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Width</label>
              <input
                type="number"
                :value="modelValue.width"
                @input="update('width', +$event.target.value)"
              />
            </div>
            <div class="form-group">
              <label>Height</label>
              <input
                type="number"
                :value="modelValue.height"
                @input="update('height', +$event.target.value)"
              />
            </div>
          </div>
        </div>
      </template>

      <!-- ── RECTANGLE ──────────────────────────────────── -->
      <template v-else-if="type === BIZCARD_DATATYPE.RECTANGLE">
        <div class="form-section">
          <div class="form-row">
            <div class="form-group">
              <label>Width</label>
              <input
                type="number"
                :value="modelValue.width"
                @input="update('width', +$event.target.value)"
              />
            </div>
            <div class="form-group">
              <label>Height</label>
              <input
                type="number"
                :value="modelValue.height"
                @input="update('height', +$event.target.value)"
              />
            </div>
          </div>
          <div class="form-group">
            <label>Fill Color</label>
            <ColorPickerInput
              :modelValue="modelValue.fill"
              @update:modelValue="update('fill', $event)"
            />
          </div>
          <div class="form-group">
            <label>Stroke Color</label>
            <ColorPickerInput
              :modelValue="modelValue.stroke"
              @update:modelValue="update('stroke', $event)"
            />
          </div>
          <div class="form-group">
            <label>Stroke Width</label>
            <input
              type="number"
              :value="modelValue.strokeWidth"
              @input="update('strokeWidth', +$event.target.value)"
            />
          </div>
        </div>
      </template>

      <!-- ── LINE ───────────────────────────────────────── -->
      <template v-else-if="type === BIZCARD_DATATYPE.LINE">
        <div class="form-section">
          <div class="form-row">
            <div class="form-group">
              <label>X2</label>
              <input
                type="number"
                :value="modelValue.x2"
                @input="update('x2', +$event.target.value)"
              />
            </div>
            <div class="form-group">
              <label>Y2</label>
              <input
                type="number"
                :value="modelValue.y2"
                @input="update('y2', +$event.target.value)"
              />
            </div>
          </div>
          <div class="form-group">
            <label>Color</label>
            <ColorPickerInput
              :modelValue="modelValue.fill ?? modelValue.stroke"
              @update:modelValue="update('fill', $event)"
            />
          </div>
          <div class="form-group">
            <label>Stroke Width</label>
            <input
              type="number"
              :value="modelValue.strokeWidth"
              @input="update('strokeWidth', +$event.target.value)"
            />
          </div>
        </div>
      </template>

      <!-- ── PATH ───────────────────────────────────────── -->
      <template v-else-if="type === BIZCARD_DATATYPE.PATH">
        <div class="form-section">
          <div class="form-group">
            <label>Path Data (d)</label>
            <textarea
              :value="modelValue.pathData"
              @input="update('pathData', $event.target.value)"
            ></textarea>
          </div>
          <div class="form-group">
            <label>Fill Color</label>
            <ColorPickerInput
              :modelValue="modelValue.fill"
              @update:modelValue="update('fill', $event)"
            />
          </div>
          <div class="form-group">
            <label>Stroke Color</label>
            <ColorPickerInput
              :modelValue="modelValue.stroke"
              @update:modelValue="update('stroke', $event)"
            />
          </div>
          <div class="form-group">
            <label>Stroke Width</label>
            <input
              type="number"
              :value="modelValue.strokeWidth"
              @input="update('strokeWidth', +$event.target.value)"
            />
          </div>
        </div>
      </template>

      <!-- ── SHAPE ──────────────────────────────────────── -->
      <template v-else-if="type === BIZCARD_DATATYPE.SHAPE">
        <div class="form-section">
          <div class="form-group">
            <label>Shape Data</label>
            <textarea
              :value="modelValue.shapeData"
              @input="update('shapeData', $event.target.value)"
            ></textarea>
          </div>
          <div class="form-group">
            <label>Stroke Width</label>
            <input
              type="number"
              :value="modelValue.strokeWidth"
              @input="update('strokeWidth', +$event.target.value)"
            />
          </div>
        </div>
      </template>

    </template>

  </div>

</template>

<style scoped>
.bizcard-forms {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: 0.8rem;

  .form-section-header {
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #888;
    padding-bottom: 0.25rem;
    border-bottom: solid 1px #ddd;
  }

  .form-type-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: solid 1px #ccc;

    .type-badge {
      background: #333;
      color: #fff;
      font-size: 0.7rem;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 0.15rem 0.45rem;
      border-radius: 0.25rem;
    }

    .type-tag {
      color: #888;
      font-family: monospace;
      font-size: 0.75rem;
    }
  }

  .form-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-row {
    display: flex;
    gap: 0.5rem;

    .form-group {
      flex: 1;
    }
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    label {
      font-size: 0.7rem;
      font-weight: 600;
      color: #555;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    input[type="text"],
    input[type="number"] {
      width: 100%;
      padding: 0.3rem 0.4rem;
      border: solid 1px #ccc;
      border-radius: 0.25rem;
      font-size: 0.8rem;
      background: #fff;
      box-sizing: border-box;

      &:focus {
        outline: none;
        border-color: #5599ff;
        box-shadow: 0 0 0 2px rgba(85, 153, 255, 0.2);
      }
    }

    textarea {
      width: 100%;
      min-height: 4rem;
      padding: 0.3rem 0.4rem;
      border: solid 1px #ccc;
      border-radius: 0.25rem;
      font-size: 0.8rem;
      font-family: monospace;
      resize: vertical;
      box-sizing: border-box;

      &:focus {
        outline: none;
        border-color: #5599ff;
        box-shadow: 0 0 0 2px rgba(85, 153, 255, 0.2);
      }
    }
  }
}
</style>
