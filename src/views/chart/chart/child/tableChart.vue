<template>
  <div class="container">
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="order"
        label="排行"
      />
      <el-table-column
        prop="name"
        label="书籍"
      />
      <el-table-column
        prop="count"
        label="借阅次数"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'TableChart',
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>
