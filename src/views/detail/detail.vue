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
            type="danger"
            @click="edit">Edit</el-button>
          <div style="float:right; margin-right:15px;">
            <el-button
              type="success"
              @click="add">add</el-button>
          </div>

        </h3>
        <div class="layout_content">
          <ul>
            <li
              v-for="(item,index) in contentData.contents"
              :class="{'layout_right':item.role == 2,'layout_left':item.role == 1,'layout_des':item.role == 0}"
              :key="index"
              class="i_item"
              @click="toggleZh(item)">
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

    <el-dialog
      :title="dialogForward.title"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="30%">
      <el-form
        ref="ruleForm"
        :model="dialog.updateData"
        label-width="80px">
        <section
          v-for="(item,index) in dialog.updateData.roles"
          :key="index">
          <div style="padding-top:5px; margin-bottom:10px;">role {{ index+1 }}</div>
          <section style="border:1px dotted #ccc; padding:15px;">
            <el-form-item
              :prop="'roles['+index+'].name'"
              :rules="[
                { required: true, message: 'please write role name', trigger: ['blur', 'change'] },
              ]"
              label="name">
              <el-input v-model="item.name"/>
            </el-form-item>
            <el-row :gutter="0">
              <el-col :span="12">
                <el-form-item
                  :prop="'roles['+index+'].sex'"
                  :rules="[
                    { required: true, message: 'please choose sex', trigger: ['blur', 'change'] },
                  ]"
                  label="sex">
                  <el-select
                    v-model="item.sex"
                    placeholder="please choose gender">
                    <el-option
                      label="males"
                      value="1"/>
                    <el-option
                      label="females"
                      value="0"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  :prop="'roles['+index+'].type'"
                  :rules="[
                    { required: true, message: 'please choose role type', trigger: ['blur', 'change'] },
                  ]"
                  label="type">
                  <el-select
                    v-model="item.type"
                    placeholder="please choose role type">
                    <el-option
                      label="aside"
                      value="0"/>
                    <el-option
                      label="main role"
                      value="1"/>
                    <el-option
                      label="support role"
                      value="2"/>
                  </el-select>
                </el-form-item>
              </el-col>

            </el-row>

            <el-form-item
              :prop="'roles['+index+'].remark'"
              :rules="[
                { required: true, message: 'please write remark', trigger: ['blur', 'change'] },
              ]"
              label="remark">
              <el-input
                v-model="item.remark"
                type="textarea"/>
            </el-form-item>
          </section>

        </section>

        <el-form-item>
          <section style="padding-top:15px;">
            <el-button
              type="primary"
              @click="submitForm('ruleForm')">submit</el-button>
            <el-button @click="resetForm('ruleForm')">reset</el-button>
          </section>

        </el-form-item>
      </el-form>

    </el-dialog>

  </div>

</template>
<script>
import Axios from 'axios'

export default {
  data () {
    return {
      activeNames: ['1'],
      unit: this.$route.query.unit || 1,
      chapter: this.$route.query.chapter || 1,
      // contentData: require('./unit1_children1.json')
      contentData: {
        roles: [],
        content: []
      },
      dialogVisible: false,
      dialogForward: {
        title: 'add'
      },
      load: {
        update: false,
        add: false
      },
      dialog: {
        updateData: {
          unit: this.$route.query.unit || 1,
          chapter: this.$route.query.chapter || 1,
          roles: [
            {
              name: '',
              sex: '1',
              type: '0',
              remark: ''
            },
            {
              name: '',
              sex: '1',
              type: '1',
              remark: ''
            },
            {
              name: '',
              sex: '1',
              type: '2',
              remark: ''
            }
          ]
        }
      }
    }
  },
  mounted () {
    // this.getData()
  },
  methods: {
    edit () {
      this.dialogVisible = true
      this.dialogForward.title = 'edit'
    },
    add () {
      this.dialogVisible = true
      this.dialogForward.title = 'add'
    },
    toggleZh (item) {
      console.log(item)
      item.show_zh = !item.show_zh
      this.$forceUpdate()
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          this.$message.error('请检查表单')
          return false
        }

        // let params = this.dialog.updateData;
        let params = {
          req: 'roles',
          type: 'insert',
          params: {
            unit_id: this.unit,
            chapter_id: this.chapter,
            role_id: 3,
            name: this.dialog.updateData.roles[0].name,
            sex: this.dialog.updateData.roles[0].sex,
            type: this.dialog.updateData.roles[0].type,
            remark: this.dialog.updateData.roles[0].remark
          }
        }

        params.params = JSON.stringify(params.params)

        this.load.update = true
        let url = 'http://localhost/pets3_data/api/RestController.php'

        const deepObjectToPostParams = (data, keyPre = '', opt = {}) => {
          let q = ''
          for (let i in data) {
            let pref = keyPre ? keyPre + '[' + i + ']' : i

            if (
              opt.url &&
              opt.url.indexOf('index/upload') === 0 &&
              i === 'file'
            ) {
              q += pref + '=' + data[i] + '&'
              continue
            }

            if (typeof data[i] === 'object') {
              if (
                Array.isArray(data[i]) &&
                data[i].length === 0 &&
                opt.allowEmptyArray
              ) {
                q += pref + `=&`
              } else {
                q += deepObjectToPostParams(data[i], pref, opt)
              }
            } else {
              q += pref + '=' + encodeURIComponent(data[i]) + '&'
            }
          }
          return q
        }

        Axios({
          method: 'post',
          url: url,
          data: params,
          // withCredentials: true,
          responseType: 'json',
          timeout: 60000,
          transformRequest: [
            function (data, headers) {
              let q = deepObjectToPostParams(data, '', {
                url: url
              })
              q = q.substr(0, q.length - 1)
              return q
            }
          ]
        }).then(({ data, status, message }) => {})
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
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
  .el-collapse-item__content {
    padding-bottom: 0;
  }
  .layout_chapter_list {
    li {
      padding: 5px 0;
      border-top: 1px dotted #ccc;
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
