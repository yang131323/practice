<template>
  <span
    ref="inputRef"
    @click="onTagClick"
    @blur="onInputEnd"
    :class="tagClasses"
    :style="tagStyle"
    :contenteditable="showInput"
  >
    {{ title }}
    <CircleClose v-show="showClose" class="close" />
  </span>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick } from "vue";
import { CircleClose } from "@element-plus/icons-vue";

const props = defineProps({
  mode: {
    validator(value) {
      return ["dark", "light"].includes(value);
    },
    default: "dark",
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

const tagStyle = props.autoSize
  ? {}
  : {
      width: "128px",
    };

const tagClasses = computed(() => {
  const classes = ["tag"];
  if (props.canInput) classes.push("input");
  if (isInput.value) classes.push("is-input");
  if (props.mode) classes.push(props.mode);
  return classes;
});
const showInput = computed(() => {
  return props.canInput && isInput.value;
});
const showClose = computed(() => {
  return props.canInput && !isInput.value;
});

function onTagClick() {
  if (!props.canInput || isInput.value) return;
  isInput.value = !isInput.value;
  nextTick(() => {
    inputRef.value.focus();
  });
}

function onInputEnd(event) {
  isInput.value = false;
  tagText.value = event.target.textContent;
  emit("change", tagText);
}
</script>

<style lang="less" scoped>
.tag {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  font-size: 14px;
  border-radius: 3px;
  border: 1px solid;
  min-width: 56px;
  padding: 0 10px;
  height: 32px;
  line-height: 1;
}

.light {
  color: #409eff;
  background-color: rgba(236, 245, 255);
}

.dark {
  color: #fff;
  border: none;
  background-color: #409eff;
}

.close {
  position: absolute;
  margin-top: -8px;
  right: 10px;
  top: 50%;
  width: 16px;
  height: 16px;
}

.is-input {
  background-color: #fff;
  border-color: #eee;
  outline: none;
}

.input {
  padding-right: 30px;
}

.tag:nth-of-type(n + 2) {
  margin-left: 24px;
}
</style>
