<template>
  <div class="container">
    <div v-for="item in dataList" :key="item.id" class="child">
      <a  target="_blank" href="https://www.baidu.com">
        <div class="lin">
          {{ item.content }}
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewList',
  props: {
    dataList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.child{
  height: 30px;
  font-size: 20px;
  padding: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.lin{
  color: blue;
}
.lin:hover{color: red}
.lin:visited{color: black}
</style>
