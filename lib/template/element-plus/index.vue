<template>
  <el-form :inline="true" :model="form" name="queryForm">
    <el-form-item label="name">
      <el-input
        v-model="form.name"
        placeholder="Please input entity"
      ></el-input>
    </el-form-item>
    <el-form-item label="age">
      <el-input v-model="form.age" placeholder="Please input age"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">query</el-button>
      <el-button type="primary" @click="reset">reset</el-button>
      <!-- NEED -->
      <el-button type="success" @click="create">add</el-button>
    </el-form-item>
  </el-form>
  <el-table
    ref="multipleTableRef"
    :border="true"
    :data="tableData"
    style="width: 100%"
    highlight-current-row
  >
    <!-- user difined：editable mode -->
    <el-table-column
      mode="editable"
      v-for="item in tableHeader"
      :key="item.prop"
      :prop="item.prop"
      :label="item.label"
    >
      <template #default="scope">
        <!-- in edit mode：scope(row) is editable and field is editable -->
        <div v-if="scope.row.editable">
          <template v-if="item.type === 'input'">
            <el-input
              size="default"
              v-model="scope.row[item.prop]"
              :placeholder="`please input ${item.label}`"
              :disabled="!item.editable"
            ></el-input>
          </template>
          <template v-else-if="item.type === 'datepicker'">
            <el-date-picker
              v-model="scope.row[item.prop]"
              type="date"
              placeholder="Pick a day"
              size="default"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
              :disabled="!item.editable"
            ></el-date-picker>
          </template>
          <template v-else-if="item.type === 'switch'">
            <el-switch
              v-model="scope.row[item.prop]"
              size="default"
              :disabled="!item.editable"
            ></el-switch>
          </template>
        </div>
        <!-- display mode -->
        <div v-else class="editable-row">
          <el-switch
            v-if="item.type === 'switch'"
            v-model="scope.row[item.prop]"
            size="default"
            disabled
          ></el-switch>
          <span v-else class="editable-row-span">{{
            scope.row[item.prop]
          }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column mode="editable" label="operations">
      <template #default="scope">
        <el-button
          v-show="!scope.row.editable"
          type="success"
          size="small"
          @click="scope.row.editable = true"
        >
          edit
        </el-button>
        <el-button
          v-show="!scope.row.editable"
          type="danger"
          size="small"
          @click="handleDelete(scope.$index, scope.row)"
        >
          remove
        </el-button>
        <el-button
          v-show="!scope.row.editable"
          type="info"
          size="small"
          @click="handleDetail(scope.$index, scope.row)"
        >
          detail
        </el-button>
        <el-button
          v-show="scope.row.editable && scope.row.isCreating !== true"
          type="success"
          size="small"
          @click="handleEdit(scope.$index, scope.row)"
        >
          confirm edit
        </el-button>
        <!-- NEED -->
        <el-button
          v-show="scope.row.editable && scope.row.isCreating === true"
          type="success"
          size="small"
          @click="handleCreate(scope.$index, scope.row)"
        >
          confirm create
        </el-button>
        <el-button
          v-show="scope.row.editable && scope.row.isCreating === true"
          type="info"
          size="small"
          @click="cancelCreate(scope.$index, scope.row)"
        >
          cancel create
        </el-button>
      </template>
    </el-table-column>
    <!-- user defined: uneditable mode -->
  </el-table>
  <el-divider></el-divider>
  <el-pagination
    v-model:current-page="pagination.pageNum"
    v-model:page-size="pagination.pageSize"
    :page-sizes="[3, 5, 10, 20]"
    :small="false"
    :disabled="false"
    :background="true"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >
  </el-pagination>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import {
  total,
  pagination,
  handleCurrentChange,
  handleSizeChange,
} from "./pagination";
import { form, search, reset } from "./query";
import {
  tableHeader,
  tableData,
  setEntitys,
  create,
  handleEdit,
  handleDelete,
  handleDetail,
  // NEED
  handleCreate,
  // NEED
  cancelCreate,
} from ".";
onMounted(() => {
  setEntitys();
});
</script>
