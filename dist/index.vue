<template>
  <el-form :inline="true" :model="form" name="queryForm"></el-form>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { total, pagination, handleCurrentChange, handleSizeChange } from "./pagination";
import {
  form,
  search,
  reset
} from "./query";
import {
  tableHeader,
  tableData,
  setEntitys,
  handleEdit,
  handleDelete,
  handleDetail,
} from ".";

onMounted(() => {
  setEntitys();
});
</script>