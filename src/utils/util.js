/**
 * 通用js方法封装处理
 * Copyright (c) 2019 ruoyi
 */

const baseURL = process.env.VUE_APP_BASE_API

// 日期格式化
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time.replace(new RegExp(/-/gm), '/')
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

// 表单重置
export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields()
  }
}

// 添加日期范围
export function addDateRange(params, dateRange) {
  var search = params
  search.beginTime = undefined
  search.endTime = undefined
  // eslint-disable-next-line eqeqeq
  if (dateRange != null && dateRange != '') {
    search.beginTime = dateRange[0]
    search.endTime = dateRange[1]
  }
  return search
}

// 回显数据字典
export function selectDictLabel(datas, value) {
  var actions = []
  // Object.keys(obj) 返回值：一个表示给定对象的所有可枚举属性的字符串数组
  // some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。
  // some() 方法会依次执行数组的每个元素：
  // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
  // 如果没有满足条件的元素，则返回false。
  Object.keys(datas).some((key) => {
    // eslint-disable-next-line eqeqeq
    if (datas[key].dictValue == ('' + value)) {
      actions.push(datas[key].dictLabel)
      return true
    }
  })
  // join() 方法用于把数组中的所有元素放入一个字符串。
  // 元素是通过指定的分隔符进行分隔的。
  return actions.join('')
}

// 回显数据字典（字符串数组）
export function selectDictLabels(datas, value, separator) {
  var actions = []
  var currentSeparator = undefined === separator ? ',' : separator
  var temp = value.split(currentSeparator)
  Object.keys(value.split(currentSeparator)).some((val) => {
    Object.keys(datas).some((key) => {
      // eslint-disable-next-line eqeqeq
      if (datas[key].dictValue == ('' + temp[val])) {
        actions.push(datas[key].dictLabel + currentSeparator)
      }
    })
  })
  return actions.join('').substring(0, actions.join('').length - 1)
}

// 通用下载方法
export function download(fileName) {
  window.location.href = baseURL + '/common/download?fileName=' + encodeURI(fileName) + '&delete=' + true
}

// 字符串格式化(%s )
export function sprintf(str) {
  var args = arguments; var flag = true; var i = 1
  str = str.replace(/%s/g, function() {
    var arg = args[i++]
    if (typeof arg === 'undefined') {
      flag = false
      return ''
    }
    return arg
  })
  return flag ? str : ''
}

// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str) {
  // eslint-disable-next-line eqeqeq
  if (!str || str == 'undefined' || str == 'null') {
    return ''
  }
  return str
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function handleTree(data) {
  // id = id || 'id'
  // pid = pid || 'pid'
  // children = children || 'children'
  // rootId = rootId || Math.min.apply(Math, data.map(item => { return item[pid] })) || 0
  // // 对源数据深度克隆
  // const cloneData = JSON.parse(JSON.stringify(data))
  // // 循环所有项
  // const treeData = cloneData.filter(father => {
  //   const branchArr = cloneData.filter(child => {
  //     // 返回每一项的子级数组
  //     return father[id] === child[pid]
  //   })
  //   branchArr.length > 0 ? father.children = branchArr : ''
  //   // 返回第一层
  //   return father[pid] === rootId
  // })
  // // eslint-disable-next-line eqeqeq
  // return treeData != '' ? treeData : data
  const treeData = []
  data.forEach((item, index) => {
    // eslint-disable-next-line eqeqeq
    if (item.pid == '0') {
      // eslint-disable-next-line no-array-constructor
      const aArray = new Array()

      data.forEach((a, index) => {
        // eslint-disable-next-line eqeqeq
        if (a.pid == item.id) {
          // eslint-disable-next-line no-array-constructor
          const bArray = new Array()

          data.forEach((b, index) => {
            // eslint-disable-next-line eqeqeq
            if (b.pid == a.id) {
              bArray.push(b)
            }
          })
          item.children = bArray
          aArray.push(item)
        }
      })
      item.children = aArray
      treeData.push(item)
    }
  })
  return treeData
}

/**
 *
 * @constructor
 */
export function removeNullProperty(obj) {
  const newObj = Object.keys(obj).forEach(item => {
    if (!obj[item]) {
      delete obj[item]
    }
  })
  return newObj
}
