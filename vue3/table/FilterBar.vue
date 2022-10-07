<template>
  <div class="fitler">
    <el-tree-select
      ref="organizeTreeRef"
      class="filter-ele"
      v-model="organizes"
      :data="data"
      placeholder="请选择或者搜索"
      node-key="value"
      show-checkbox
      multiple
      @check-change="onOrganizeCheck"
      size="large"
    />
    <el-select
      class="filter-ele"
      v-model="organizeChangeStatus"
      placeholder="组织变更处理状态"
      clearable
      size="large"
    >
      <el-option
        v-for="item in organizeChanges"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select
      class="filter-ele"
      v-model="isSelect"
      placeholder="是否可选"
      clearable
      size="large"
    >
      <el-option label="是" :value="1" />
      <el-option label="否" :value="0" />
    </el-select>
    <el-select
      class="filter-ele"
      v-model="isBan"
      placeholder="是否已禁用"
      clearable
      size="large"
    >
      <el-option label="是" :value="1" />
      <el-option label="否" :value="0" />
    </el-select>
    <el-button
      type="primary"
      :icon="Search"
      size="large"
      :style="{ marginLeft: '15px' }"
      @click="onSearch"
    >
      搜索
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from "vue";
import { Search } from "@element-plus/icons-vue";

const emit = defineEmits(["search"]);

const organizeTreeRef = ref();
const organizes = ref([]);
const organizeChangeStatus = ref("");
const isSelect = ref();
const isBan = ref();
const data = [
  {
    value: "all",
    label: "全选",
    children: [],
  },
  {
    value: "1",
    label: "Level one 1",
    children: [
      {
        value: "1-1",
        label: "Level two 1-1",
        children: [
          {
            value: "1-1-1",
            label: "Level three 1-1-1",
          },
          {
            value: "1-1-2",
            label: "Level three 1-1-1",
          },
          {
            value: "1-1-3",
            label: "Level three 1-1-1",
          },
        ],
      },
    ],
  },
  {
    value: "2",
    label: "Level one 2",
    children: [
      {
        value: "2-1",
        label: "Level two 2-1",
        children: [
          {
            value: "2-1-1",
            label: "Level three 2-1-1",
          },
        ],
      },
      {
        value: "2-2",
        label: "Level two 2-2",
        children: [
          {
            value: "2-2-1",
            label: "Level three 2-2-1",
          },
        ],
      },
    ],
  },
  {
    value: "3",
    label: "Level one 3",
    children: [
      {
        value: "3-1",
        label: "Level two 3-1",
        children: [
          {
            value: "3-1-1",
            label: "Level three 3-1-1",
          },
        ],
      },
      {
        value: "3-2",
        label: "Level two 3-2",
        children: [
          {
            value: "3-2-1",
            label: "Level three 3-2-1",
          },
        ],
      },
    ],
  },
];

const organizeChanges = [
  {
    label: "待处理",
    value: 1,
  },
  {
    label: "已处理",
    value: 2,
  },
  {
    label: "未处理",
    value: 3,
  },
];

function onSearch() {
  emit("search", {
    isBan,
    organizes,
    isSelect,
    organizeChangeStatus,
  });
}

/** 组织结构变更 */
function onOrganizeCheck(row, isSelect, ins) {
  if (row.value != "all") return;
  if (isSelect) {
    organizeTreeRef.value.setCheckedNodes(data);
  } else {
    organizeTreeRef.value.setCheckedNodes([]);
  }
  nextTick(() => {
    organizes.value = organizeTreeRef.value.getCheckedKeys();
  });
  console.log("onOrganizeChange: ", data, isSelect, ins, organizes.value);
}
</script>

<style lang="less" scoped>
.filter-ele:nth-of-type(n + 2) {
  margin-left: 15px;
}
</style>
