<template>
  <div class="container">
    <FilterBar @search="onSearch"></FilterBar>
    <el-dialog v-model="showDialog" title="Tips" width="70%">
      <el-table :data="tableData" :border="true" :style="{ width: '100%' }">
        <el-table-column type="index" label="序号" />
        <el-table-column
          prop="updated"
          label="变更时间"
          :formatter="formatter('updated')"
        />
        <el-table-column prop="changeType" label="变更类型" />
        <el-table-column prop="nick" label="变更人" />
        <el-table-column prop="args" label="变更字段" />
        <el-table-column prop="before" label="变更前" />
        <el-table-column prop="after" label="变更后" />
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="showDialog = false">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import FilterBar from "./FilterBar.vue";

const tableData = [
  {
    after: "2022-09-30 10:22:10",
    args: "TAPD\nft 8 # a",
    before: "2022-09-30 10:22:10",
    changeType: "变更",
    created_at: "2022-09-30 10:22:10",
    id: 1,
    nick: "jolapan",
    o_id: 1,
    updated: "2022-09-30 10:22:00",
    updated_at: "2022-09-30 10:22:00",
  },
  {
    after: "2022-09-30 10:22:10",
    args: "TAPD\nft 8 # a",
    before: "2022-09-30 10:22:10",
    changeType: "变更",
    created_at: "2022-09-30 10:22:10",
    id: 2,
    nick: "jolapan",
    o_id: 1,
    updated: "2022-09-30 10:22:00",
    updated_at: "2022-09-30 10:22:00",
  },
  {
    after: "2022-09-30 10:22:10",
    args: "TAPD\nft 8 # a",
    before: "2022-09-30 10:22:10",
    changeType: "变更",
    created_at: "2022-09-30 10:22:10",
    id: 3,
    nick: "jolapan",
    o_id: 1,
    updated: "2022-09-30 10:22:00",
    updated_at: "2022-09-30 10:22:00",
  },
  {
    after: "2022-09-30 10:22:10",
    args: "TAPD\nft 8 # a",
    before: "2022-09-30 10:22:10",
    changeType: "变更",
    created_at: "2022-09-30 10:22:10",
    id: 4,
    nick: "jolapan",
    o_id: 1,
    updated: "2022-09-30 10:22:00",
    updated_at: "2022-09-30 10:22:00",
  },
  {
    after: "2022-09-30 10:22:10",
    args: "TAPD\nft 8 # a",
    before: "2022-09-30 10:22:10",
    changeType: "变更",
    created_at: "2022-09-30 10:22:10",
    id: 5,
    nick: "jolapan",
    o_id: 1,
    updated: "2022-09-30 10:22:00",
    updated_at: "2022-09-30 10:22:00",
  },
  {
    after: "2022-09-30 10:22:10",
    args: "TAPD\nft 8 # a",
    before: "2022-09-30 10:22:10",
    changeType: "变更",
    created_at: "2022-09-30 10:22:10",
    id: 6,
    nick: "jolapan",
    o_id: 1,
    updated: "2022-09-30 10:22:00",
    updated_at: "2022-09-30 10:22:00",
  },
  {
    after: "2022-09-30 10:22:10",
    args: "TAPD\nft 8 # a",
    before: "2022-09-30 10:22:10",
    changeType: "变更",
    created_at: "2022-09-30 10:22:10",
    id: 7,
    nick: "jolapan",
    o_id: 1,
    updated: "2022-09-30 10:22:00",
    updated_at: "2022-09-30 10:22:00",
  },
  {
    after: "2022-09-30 10:22:10",
    args: "TAPD\nft 8 # a",
    before: "2022-09-30 10:22:10",
    changeType: "变更",
    created_at: "2022-09-30 10:22:10",
    id: 8,
    nick: "jolapan",
    o_id: 1,
    updated: "2022-09-30 10:22:00",
    updated_at: "2022-09-30 10:22:00",
  },
  {
    after: "2022-09-30 10:22:10",
    args: "TAPD\nft 8 # a",
    before: "2022-09-30 10:22:10",
    changeType: "变更",
    created_at: "2022-09-30 10:22:10",
    id: 9,
    nick: "jolapan",
    o_id: 1,
    updated: "2022-09-30 10:22:00",
    updated_at: "2022-09-30 10:22:00",
  },
  {
    after: "2022-09-30 10:22:10",
    args: "TAPD\nft 8 # a",
    before: "2022-09-30 10:22:10",
    changeType: "变更",
    created_at: "2022-09-30 10:22:10",
    id: 10,
    nick: "jolapan",
    o_id: 1,
    updated: "2022-09-30 10:22:00",
    updated_at: "2022-09-30 10:22:00",
  },
  {
    after: "2022-09-30 10:22:10",
    args: "TAPD\nft 8 # a",
    before: "2022-09-30 10:22:10",
    changeType: "变更",
    created_at: "2022-09-30 10:22:10",
    id: 11,
    nick: "jolapan",
    o_id: 1,
    updated: "2022-09-30 10:22:00",
    updated_at: "2022-09-30 10:22:00",
  },
  {
    after: "2022-09-30 10:22:10",
    args: "TAPD\nft 8 # a",
    before: "2022-09-30 10:22:10",
    changeType: "变更",
    created_at: "2022-09-30 10:22:10",
    id: 12,
    nick: "jolapan",
    o_id: 1,
    updated: "2022-09-30 10:22:00",
    updated_at: "2022-09-30 10:22:00",
  },
];

const showDialog = ref(false);

function formatter(type) {
  function dateFormat(row) {
    return row[type];
  }
  return dateFormat;
}

function onSearch(event) {
  console.log("onSearch: ", event);
}
</script>
