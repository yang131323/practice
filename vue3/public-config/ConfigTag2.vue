<template>
  <div class="config-tag">
    <!-- <input
      v-if="showInput"
      ref="inputRef"
      v-model="tagText"
      class="tag-input"
      :style="tagStyle"
      @blur="onInputEnd"
    /> -->
    <el-tag
      @click="onTagClick"
      class="tag"
      size="large"
      :effect="effect"
      :style="tagStyle"
      :closable="closable"
    >
      {{ title }}
    </el-tag>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick } from "vue";

const props = defineProps({
  effect: {
    validator(value) {
      return ["dark", "light", "plain"].includes(value);
    },
    default: "dark",
  },
  closable: {
    type: Boolean,
    default: false,
  },
  autoSize: {
    type: Boolean,
    default: true,
  },
  canInput: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["change"]);

const inputRef = ref();
const tagText = ref(props.title);
const isInput = ref(false);
const showInput = computed(() => {
  return props.canInput && isInput.value;
});

const tagStyle = props.autoSize
  ? {}
  : {
      width: "128px",
    };

function onTagClick() {
  if (!props.canInput) return;
  isInput.value = !isInput.value;
  nextTick(() => {
    inputRef.value.focus();
  });
}

function onInputEnd() {
  // isInput.value = false;
  emit("change", tagText);
}
</script>

<style lang="less" scoped>
.config-tag {
  display: inline-block;
}

.tag,
.tag-input {
  min-width: 56px;
}
</style>
