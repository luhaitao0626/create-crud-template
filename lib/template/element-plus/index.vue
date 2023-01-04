<template>
  <el-form :inline="true" :model="form" name="queryForm">
    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="primary" @click="reset">清空</el-button>
    </el-form-item>
  </el-form>
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