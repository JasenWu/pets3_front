<template>

  <div class="layout_index_index">

    <el-row :gutter="20">
      <el-col
        :offset="6"
        :span="12">
        <h3>
          Unit{{ unit }} Chapter{{ chapter }}
          <el-button
            style="float:right;"
            type="primary">add</el-button>
        </h3>
        <div class="layout_content">
          <ul>
            <li
              v-for="(item,index) in contentData.contents"
              :class="{'layout_right':item.role == 2,'layout_left':item.role == 1,'layout_des':item.role == 0}"
              :key="index"
              class="i_item"
              @tap="toggleZh(item)">
              <b
                v-if="item.role != 0"
                class="i_name">{{ contentData.roles[item.role].name }}</b>
              <span class="i_text">{{ item.text }}</span>
              <span
                v-if="item.show_zh == true"
                class="i_text">{{ item.text_zh }}</span>
            </li>
          </ul>
        </div>

      </el-col>
    </el-row>

  </div>

</template>
<script>
//import Axios from 'axios'

export default {
  data () {
    return {
      activeNames: ['1'],
      unit: this.$route.query.unit || 1,
      chapter: this.$route.query.chapter || 1,
      contentData: require('./unit1_children1.json')
    }
  },
  mounted () {
    // this.getData()
  },
  methods: {
    toggleZh (item) {
      console.log(item)
      item.show_zh = !item.show_zh
      this.$forceUpdate()
    },
    // getData () {
    //   Axios.get(
    //     'https://www.renjie.net.cn/pets3/contentData/unitList.json'
    //   ).then(({ data }) => {
    //      console.log("data")
    //      this.contentData = data;

    //   })
    // },
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

.layout_content .i_item {
  font-size: 18px;
  color: #303030;
  padding-bottom: 10px;
  list-style: none;
  .i_text {
    border-radius: 5px;
    background: #eee;
    display: block;
    padding: 5px;
  }
  &.layout_des {
    text-align: left;
    .i_text {
      background: #a1e665;
      color: #303030;
    }
  }
  &.layout_left {
    text-align: left;
    .i_text {
      background: #f3f3f3;
      color: #303030;
    }
  }
  &.layout_right {
    text-align: right;
    .i_text {
      background: #d7f4fd;
    }
  }
  .i_name {
    font-size: 12px;
    color: #303030;
  }
}

</style>
