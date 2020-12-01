<template>
  <div class="dashboard-container">
    <el-carousel :interval="3000" arrow="always">
      <el-carousel-item v-for="item in urls" :key="item">
        <el-image :key="item" :src="item" />
      </el-carousel-item>
    </el-carousel>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>新闻列表</span>
          </div>
          <viewList :data-list="newsList"></viewList>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>活动列表</span>
          </div>
          <viewList :data-list="activeList"></viewList>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { newsList, activeList } from '@/api/news'
import viewList from '@/views/dashboard/viewList'
export default {
  name: 'Dashboard',
  components: {
    viewList
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      urls: [
        'https://erp-library.oss-cn-beijing.aliyuncs.com/rock/01.jpg',
        'https://erp-library.oss-cn-beijing.aliyuncs.com/rock/02.jpg',
        'https://erp-library.oss-cn-beijing.aliyuncs.com/rock/03.jpg',
        'https://erp-library.oss-cn-beijing.aliyuncs.com/rock/04.jpg'
      ],
      newsList: [],
      activeList: []
    }
  },
  created() {
    this.getNewsList()
    this.getActiveList()
  },
  methods: {
    getNewsList() {
      newsList().then((response) => {
        this.newsList = response.data
      })
    },
    getActiveList() {
      activeList().then((response) => {
        this.activeList = response.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.h3 {
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.dashboard-container{
  height: 100%;
}
.box-card{
  height: calc(100vh - 400px);
}
.el-row{
  height: 100%;
}
</style>
