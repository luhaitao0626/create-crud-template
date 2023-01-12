<template>
  <el-form :inline="true" :model="form" name="queryForm">
    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="primary" @click="reset">清空</el-button>
    </el-form-item>
  </el-form>
  <el-table ref="multipleTableRef" :border="true" :data="tableData" style="width: 100%" highlight-current-row>
    <el-table-column type="selection" width="55"> </el-table-column>
    <!-- 用户定义：可编辑 -->
    <el-table-column mode="editable" v-for="item in tableHeader" :key="item.prop" :prop="item.prop" :label="item.label">
      <template #default="scope">
        <!-- 进入编辑模式 -->
        <div v-show="item.editable || scope.row.editable">
          <template v-if="item.type === 'input'">
            <el-input size="default" v-model="scope.row[item.prop]" :placeholder="`请输入${item.label}`"></el-input>
          </template>
          <template v-else-if="item.type === 'datepicker'">
            <el-date-picker v-model="scope.row[item.prop]" type="date" placeholder="Pick a day" size="default"
              format="YYYY/MM/DD" value-format="YYYY-MM-DD"></el-date-picker>
          </template>
        </div>
        <!-- 进入非编辑模式 -->
        <div v-show="!item.editable && !scope.row.editable" class="editable-row">
          <span class="editable-row-span">{{ scope.row[item.prop] }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column mode="editable" label="操作">
      <template #default="scope">
        <el-button v-show="!scope.row.editable" type="success" size="small" @click="scope.row.editable = true">
          编辑
        </el-button>
        <el-button v-show="scope.row.editable" type="success" size="small" @click="handleEdit(scope.$index, scope.row)">
          确定
        </el-button>
        <el-button v-show="!scope.row.editable" type="danger" size="small"
          @click="handleDelete(scope.$index, scope.row)">
          删除
        </el-button>
        <el-button v-show="!scope.row.editable" type="info" size="small" @click="handleDetail(scope.$index, scope.row)">
          查看
        </el-button>
      </template>
    </el-table-column>
    <!-- 用户定义：不可编辑 -->
    <el-table-column mode="ineditable" v-for="item in tableHeader" :key="item.prop" :prop="item.prop"
      :label="item.label">
      <template #default="scope">
        <span>{{ scope.row[item.prop] }}</span>
      </template>
    </el-table-column>
    <el-table-column mode="ineditable" label="操作">
      <template #default="scope">
        <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">
          删除
        </el-button>
        <el-button type="info" size="small" @click="handleDetail(scope.$index, scope.row)">
          查看
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-divider></el-divider>
  <el-pagination v-model:current-page="pagination.pageNum" v-model:page-size="pagination.pageSize"
    :page-sizes="[3, 5, 10, 20]" :small="false" :disabled="false" :background="true"
    layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
    @current-change="handleCurrentChange" >
  </el-pagination>
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