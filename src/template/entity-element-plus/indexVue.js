
function createTemplate(options) {
  const { hasPagination, hasQuery, querys } = options;
  let template = `
<template>
  <div>
    ${hasQuery ? `<el-row class="mb-4">
        <el-form :inline="true" :model="form">` +
        hasQuery && querys.forEach(query => {
        return `<el-form-item label="用户名">
                < el-${query.type} v-model="form.${query.label}" placeholder = "${query.placeholder}" />
            </el-form-item>`
      })+`<el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="reset">清空</el-button>
        </el-form-item>
        </el-form>
    </el-row>`: ''}
    <el-table ref="multipleTableRef" :border="true" :data="tableData" style="width: 100%"
      :row-class-name="tableRowClassName" highlight-current-row>
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column v-for="item in tableHeader" :key="item.prop" :prop="item.prop" :label="item.label">
        <template #default="scope">
            
          <!-- 编辑模式 -->
          <div v-show="item.editable || scope.row.editable">
            <template v-if="item.type === 'input'">
              <el-input size="default" v-model="scope.row[item.prop]" :placeholder="\`请输入\${item.label}\`" />
            </template>
            <template v-else-if="item.type === 'datepicker'">
              <el-date-picker v-model="scope.row[item.prop]" type="date" placeholder="Pick a day" size="default"
                format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
            </template>
          </div>
          <!-- 非编辑模式 -->
          <div v-show="!item.editable && !scope.row.editable" class="editable-row">
            <span class="editable-row-span" v-if="item.prop === 'gender'">{{ scope.row[item.prop] === 1 ? '男' : '女'
            }}</span>
            <span class="editable-row-span" v-else>{{ scope.row[item.prop] }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button v-show="!scope.row.editable" type="success" size="small" @click="scope.row.editable = true">
            编辑
          </el-button>
          <el-button v-show="scope.row.editable" type="success" size="small"
            @click="handleEdit(scope.$index, scope.row)">
            确定
          </el-button>
          <el-button v-show="!scope.row.editable" type="danger" size="small"
            @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
          <el-button v-show="!scope.row.editable" type="info" size="small"
            @click="handleDetail(scope.$index, scope.row)">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-divider />
    <el-pagination v-model:current-page="pagination.pageNum" v-model:page-size="pagination.pageSize"
      :page-sizes="[3, 5, 10, 20]" :small="false" :disabled="false" :background="true"
      layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
${hasPagination ? `
import { total, pagination, handleCurrentChange, handleSizeChange } from "./pagination";
`: ''}
${hasQuery ? `
import { form, search, reset } from "./query";
`: ''}
import { setUsers, tableRowClassName, tableHeader, tableData, handleDelete, handleDetail, handleEdit } from ".";

onMounted(() => {
  setUsers();
});

</script>
<style lang="scss" scoped>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
`
  return template;
}

module.exports = createTemplate