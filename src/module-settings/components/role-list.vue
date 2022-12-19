<template>
  <div class="boxInfo">
    <!-- 表单内容 -->
    <div class="formInfo">
      <div>
        <!-- 头部信息  -->
        <div class="userInfo">
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-plus"
                     @click="handlerAdd">新增角色</el-button>
          <el-table :data="dataList"
                    border
                    fit
                    highlight-current-row
                    style="width:100%; margin-top:10px;">
            <el-table-column type="index"
                             :index="1"
                             label="序号"
                             width="150"> </el-table-column>
            <el-table-column sortable
                             prop="name"
                             label="角色名"
                             width="150"></el-table-column>
            <el-table-column sortable
                             prop="description"
                             label="描述"></el-table-column>
            <el-table-column fixed="right"
                             label="操作"
                             align="center"
                             width="250">
              <template slot-scope="scope">
                <el-button @click="handlerPerm(scope.row)"
                           type="text"
                           size="small">分配权限</el-button>
                <el-button @click="handleUpdate(scope.row)"
                           type="text"
                           size="small">修改</el-button>
                <el-button @click="handleDelete(scope.row)"
                           type="text"
                           size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <PageTool :paginationPage="requestParameters.page"
                      :paginationPagesize="requestParameters.pagesize"
                      :total="counts"
                      @pageChange="handleCurrentChange"
                      @pageSizeChange="handleSizeChange">
            </PageTool>
          </div>
        </div>
      </div>
    </div>
    <!-- 添加角色 -->
    <el-dialog title="编辑角色"
               :visible.sync="dialogFormVisible"
               style="hight:100px;line-height:1px">
      <el-form :model="formData"
               label-width="90px"
               style="margin-top:20px">
        <el-form-item label="角色名称">
          <el-input v-model="formData.name"
                    auto-complete="off"
                    style="width:90%"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="formData.description"
                    auto-complete="off"
                    style="width:90%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配权限 -->
    <el-dialog :title="'为【'+formData.name+'】分配权限'"
               :visible.sync="permFormVisible"
               style="hight:100px;line-height:1px">
      <el-tree :data="treeData"
               default-expand-all
               show-checkbox
               node-key="id"
               ref="tree"
               :check-strictly="true"
               :default-checked-keys="checkNodes"
               :props="{label:'name'}">
      </el-tree>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="permFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="assignPrem">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PageTool from './../../components/page/page-tool'
import { assignPrem, roleDelete, roleAdd, roleFindPage, roleFindById, roleUpdate } from '@/api/employees/role'
import * as permApi from '@/api/employees/permission'
import commonApi from "@/utils/common"
export default {
  components: { PageTool },
  props: ['objId'],
  data () {
    return {
      dataList: [],
      dialogFormVisible: false,
      requestParameters: {
        page: 1,
        pagesize: 10
      },
      counts: '',
      formData: {},
      checkNodes: [],
      treeData: [],
      permFormVisible: false
    }
  },
  methods: {
    listById (obj) {
      roleFindById({ id: obj.id }).then(res => {
        this.formData = res.data.data
      })
    },
    listPage () {
      roleFindPage(this.requestParameters).then(res => {
        this.dataList = res.data.data.rows
        this.counts = res.data.data.total
      })
    },

    //新增角色
    handlerAdd () {
      this.dialogFormVisible = true
      this.formData = {}
    },
    saveOrUpdate () {
      if (this.formData.id == null || this.formData.id == undefined) {
        this.save()
      } else {
        this.update()
      }
    },
    save () {
      roleAdd(this.formData).then(res => {
        this.$message({ message: res.data.message, type: res.data.success ? "success" : "error" })
        if (res.data.success) {
          this.formData = {}
          this.dialogFormVisible = false
          this.listPage()
        }
      })
    },
    update () {
      roleUpdate(this.formData).then(res => {
        this.$message({ message: res.data.message, type: res.data.success ? "success" : "error" })
        if (res.data.success) {
          this.formData = {}
          this.dialogFormVisible = false
          this.listPage()
        }
      })
    },
    //修改
    handleUpdate (obj) {
      roleFindById({ id: obj.id }).then(res => {
        this.formData = res.data.data
        this.formData.id = obj.id
        this.dialogFormVisible = true
      })
    },
    //分配权限
    handlerPerm (obj) {
      roleFindById({ id: obj.id }).then(res => {
        this.formData = res.data.data
        this.checkNodes = res.data.data.permIds
        permApi.permissionFindAll({ type: 0, pid: null, enVisible: 1 }).then(res => {
          this.treeData = commonApi.transformTozTreeFormat(res.data.data)
          this.permFormVisible = true
        })
      })
    },
    assignPrem () {
      assignPrem({ id: this.formData.id, permIds: this.$refs.tree.getCheckedKeys() }).then(res => {
        this.$message({ message: res.data.message, type: res.data.success ? "success" : "error" })
        this.permFormVisible = false
      })
    },
    //删除当前数据
    handleDelete (obj) {
      this.$confirm(`本次操作删除${obj.name}删除后账号将不可恢复,你确认删除吗`, {
        type: 'warning'
      }).then(() => {
        roleDelete({ id: obj.id }).then(res => {
          if (res.data.success) {
            this.listPage()
          }
        })
      })

    },
    //分页
    handleCurrentChange (val) {
      this.requestParameters.page = val
      this.listPage();
    },
    //分页条数
    handleSizeChange (pageSize) {
      this.requestParameters.pagesize = pageSize
      if (this.requestParameters.page === 1) {
        this.listPage(this.requestParameters)
      }
    },
  },
  created () {
    this.listPage();
  },
}
</script>

<style rel="stylesheet/scss" lang="scss">
.el-collapse-item__arrow {
  float: left;
}

.el-collapse-item {
  position: relative;
  // width: 80%;
  // .el-collapse-item__header{width: 80%;}
  .infoR {
    position: absolute;
    background: #fff;
    display: inline-block;
    width: 100px;
    height: 35px;
    line-height: 35px;
    text-align: right;
    right: -100px;
    top: 0px;
  }
}
// .el-input--medium {
//   width: 80%;
// }
.linkage {
  display: inline-block;
}
.textBotm {
  vertical-align: text-bottom;
}
.navInfo {
  height: auto;
  font-size: 30px;
  color: #333;
  background-color: #e4e4e4;
  text-align: center;
  border-bottom: 1px solid #333;
}
.step {
  position: fixed;
  left: 220px;
  top: 50%;
  margin-top: -150px;
  background: #fff;
  z-index: 9;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>