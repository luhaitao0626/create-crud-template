<template>
  <el-form :inline="true" :model="form" name="queryForm">
    <el-form-item label="username">
      <el-input v-model="form.username" placeholder="Please input 用户名"></el-input>
      </el-form-item>
    <el-form-item label="phone">
      <el-input v-model="form.phone" placeholder="Please input 手机号"></el-input>
      </el-form-item>
    <el-form-item label="email">
      <el-input v-model="form.email" placeholder="Please input 电子邮箱"></el-input>
      </el-form-item>
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