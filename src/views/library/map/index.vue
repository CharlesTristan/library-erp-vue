<template>
  <div class="container">
    <div class="demo-input-suffix">
      搜索：
      <el-input id="input_id" v-model="keyWord" style="width: 200px" />
    </div>
    <div id="map" />
  </div>
</template>

<script>
import AMap from 'AMap'
export default {
  name: 'Amap',
  data() {
    return {
      keyWord: undefined,
      map: undefined,
      startPoint: [],
      endPoint: []
    }
  },
  watch: {
    keyWord(oldValue, newValue) {
      const _this = this
      AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Driving'], function() {
        var autoOptions = {
          // 城市，默认全国
          // 使用联想输入的input的id
          input: 'input_id'
        }
        var autocomplete = new AMap.Autocomplete(autoOptions)

        var placeSearch = new AMap.PlaceSearch({
          map: _this.map
        })
        AMap.event.addListener(autocomplete, 'select', function(e) {
          // TODO 针对选中的poi实现自己的功能
          _this.endpoint = [e.poi.location.lng, e.poi.location.lat]
          placeSearch.search(e.poi.name)
        })
      })
    }
  },
  created() {
  },
  mounted() {
    const _this = this
    _this.map = new AMap.Map('map', {
      resizeEnable: true,
      zoom: 12,
      center: [116.39, 39.9]
    })
    AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.Geolocation'], function() { // 异步加载插件
      var toolbar = new AMap.ToolBar()
      _this.map.addControl(toolbar)
      var scale = new AMap.Scale()
      _this.map.addControl(scale)
      // 定位======================================
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
        timeout: 10000, // 超过10秒后停止定位，默认：无穷大
        maximumAge: 0, // 定位结果缓存0毫秒，默认：0
        convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true, // 显示定位按钮，默认：true
        buttonPosition: 'LB', // 定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      })
      _this.map.addControl(geolocation)
      geolocation.getCurrentPosition()
      AMap.event.addListener(geolocation, 'complete', onComplete)// 返回定位信息
      AMap.event.addListener(geolocation, 'error', onError) // 返回定位出错信息

      function onComplete(data) {
        // data是具体的定位信息
        _this.startPoint = [data.position.lng, data.position.lat]
      }

      function onError(data) {
        // 定位出错
        _this.msgError('定位出错,请刷新页面重试')
      }
      // 定位结束======================================
    })
  }
}
</script>

<style scoped>
#map {
  width: 100vw;
  height: calc(100vh - 100px);
}
</style>
