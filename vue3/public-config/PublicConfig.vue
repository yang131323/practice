<template>
  <div class="public-config">
    <div class="config">
      <ConfigTag title="平台配置" :auto-size="false"></ConfigTag>
      <ConfigTag title="IOS" mode="light" can-input></ConfigTag>
      <CirclePlus class="add-icon" />
      <!-- <span class="add-operate"> -->
      <!-- </span> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref, computed } from "vue";
import ConfigTag from "./ConfigTag.vue";
import { CirclePlus } from "@element-plus/icons-vue";
</script>

<style lang="less" scoped>
.config {
  display: flex;
  align-items: center;
  align-content: center;
}
.add-operate {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  margin-left: 10px;
}
.add-icon {
  margin-left: 10px;
  width: 24px;
  height: 24px;
  color: #409eff;
}
</style>
