<template>

  <div class="layout_index_index">

    <el-row :gutter="20">
      <el-col
        :offset="6"
        :span="12">
        {{ unit }}

        {{ chapter }}

      </el-col>

    </el-row>

  </div>

</template>
<script>
import Axios from 'axios'

export default {
  data () {
    return {
      activeNames: ['1'],
      unitList: [],
      unit: this.$route.query.unit || 1,
      chapter: this.$route.query.chapter || 1
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      Axios.get(
        'http://localhost/pets3_data/api/RestController.php?req=unit'
      ).then(({ data }) => {
        let children = {
          '1': {
            title: 'Dialog/Monologue',
            startTime: 0,
            endTime: 189,
            audioName: true
          },
          '2': {
            title: 'Dialog/Monologue',
            startTime: 190,
            endTime: 321,
            audioName: true
          },
          '3': {
            title: 'Dialog/Monologue',
            startTime: 322,
            endTime: 469,
            audioName: true
          },
          '4': {
            title: 'Dialog/Monologue',
            startTime: 470,
            endTime: 553,
            audioName: true
          },
          '5': {
            title: 'Passage',
            startTime: 554,
            endTime: 733,
            audioName: true
          },
          '6': {
            title: 'Excise A',
            startTime: 554,
            endTime: 733,
            audioName: true
          },
          '7': {
            title: 'Excise B',
            startTime: 554,
            endTime: 733,
            audioName: true
          }
        }
        data.forEach((d, i) => {
          d.title = `Unit${d.order} ${d.title}`
          d.children = children
        })
        console.log('data', data)
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
  .el-collapse-item__content{
    padding-bottom: 0;
  }
  .layout_chapter_list{
    li{
      padding: 5px 0;
      border-top:1px dotted #ccc;
    }
  }
}
</style>
