<template>

  <div class="layout_index_index">
    <el-collapse
      v-model="activeNames"
      @change="handleChange">
      <el-collapse-item
        v-for="(item,index) in unitList"
        :key="index"
        :title="item.title"
        name="index">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>

    </el-collapse>
  </div>

</template>
<script>
 
import Axios from 'axios'

export default {
  data () {
    return {
      activeNames: ['1'],
      unitList: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      Axios.get(
        'http://localhost/pets3_data/api/RestController.php?req=unit'
      ).then(({data}) => {
        data.forEach((d, i) => {
          d.title = `Unit${d.order} ${d.title}`
        })
        this.unitList = data
      })
    },
    handleChange (val) {
      console.log(val)
    }
  }
}
</script>
<style lang='less'>
.layout_index_index {
  .el-collapse-item {
    .el-collapse-item__header {
      color: #18b4ed;
    }
  }
  .el-collapse-item .is-active {
    color: green;
  }
}
</style>
