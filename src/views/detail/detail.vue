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
            @click="edit">Edit Roles</el-button>
          <div style="float:right; margin-right:15px;">
            <el-button
              type="success"
              @click="add">add Roles</el-button>
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
      :title="dialog.content == 'add' ?'新增':'编辑'"
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
              <el-input v-model="item.name" />
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
                      value="1" />
                    <el-option
                      label="females"
                      value="0" />
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
                      value="0" />
                    <el-option
                      label="main role"
                      value="1" />
                    <el-option
                      label="support role"
                      value="2" />
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
                type="textarea" />
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
import { insertRoles, getRoles as getData, updateRoles } from '@models/detail'

export default {
  data () {
    return {
      activeNames: ['1'],
      unit: this.$route.query.unit || 1,
      chapter: this.$route.query.chapter || 1,

      contentData: {
        roles: [],
        content: []
      },
      dialogVisible: false,

      load: {
        update: false,
        add: false
      },
      dialog: {
        content: 'add',
        updateData: {
          unit_id: this.$route.query.unit || 1,
          chapter_id: this.$route.query.chapter || 1,
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
    this.getData()
  },
  methods: {
    getData () {
      let params = {
        req: 'roles',
        chapter_id: this.$route.query.chapter || 1
      }
      getData(params)
        .then(retData => {
          this.dialog.updateData.roles = retData
          console.log('data', retData)
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    edit () {
      this.dialogVisible = true

      this.dialog.content = 'edit'
    },
    add () {
      this.dialogVisible = true
      this.dialog.content = 'add'
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

        if (this.dialog.content === 'add') {
          // 新增
          let params = {
            req: 'roles',
            type: 'insert'
          }
          params.params = this.dialog.updateData
          this.load.add = true
          this.$nextTick(() => {
            insertRoles(params)
              .then(({ retCode, retData }) => {
                if (retCode !== 0) {
                  return false
                }
                this.load.add = false
              })
              .catch(err => {
                console.log('err', err)
              })
          })
        } else {
          // 编辑
          this.load.edit = true
          let params = {
            req: 'roles',
            type: 'update'
          }
          params.params = this.dialog.updateData
          this.$nextTick(() => {
            updateRoles(params)
              .then(({ retCode, retData }) => {
                if (retCode !== 0) {
                  return false
                }
                this.load.edit = false
              })
              .catch(err => {
                console.log('err', err)
              })
          })
        }
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
