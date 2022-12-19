<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <!-- 数据 -->
        <el-table :data="dataList"
                  border
                  style="width: 100%">
          <el-table-column fixed
                           label="ID"
                           prop="id">
          </el-table-column>
          <el-table-column label="公司名称"
                           prop="name">
          </el-table-column>
          <el-table-column label="续期时间"
                           prop="renewal_date">
          </el-table-column>
          <el-table-column label="到期时间"
                           prop="expiration_date">
          </el-table-column>
          <el-table-column label="公司地区"
                           prop="company_area">
          </el-table-column>
          <el-table-column label="公司地址"
                           prop="company_address">
          </el-table-column>
          <el-table-column label="审核状态"
                           prop="audit_state">
          </el-table-column>
          <el-table-column label="法人代表"
                           prop="legalRepresentative">
          </el-table-column>
          <el-table-column label="公司规模"
                           prop="company_size">
          </el-table-column>
          <el-table-column label="状态"
                           prop="state">
            <template slot-scope="scope">
              <el-switch :active-value="1"
                         :inactive-value="0"
                         active-color="#13ce66"
                         disabled
                         inactive-color="#ff4949"
                         v-model="scope.row.state">
              </el-switch>
            </template>

          </el-table-column>
          <el-table-column label="当前余额"
                           prop="balance">
          </el-table-column>
          <el-table-column label="备注"
                           prop="remarks">
          </el-table-column>
          <el-table-column fixed="right"
                           label="操作"
                           width="150px">
            <!-- eslint-disable-next-line -->
            <template slot-scope="scope">
              <el-button size="small"
                         type="text">
                <router-link :to="'/saas-company/details/'+scope.row.id">查看</router-link>
              </el-button>
              <el-button size="small"
                         type="text">
                <router-link :to="'/saas-company/details/'+scope.row.id">编辑</router-link>
              </el-button>
              <el-button @click="comAdd"
                         size="small"
                         type="text">添加
              </el-button>
              <el-button @click="comDelete(scope.row.id)"
                         size="small"
                         type="text">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- end -->
      </el-card>
    </div>
    <el-dialog :visible.sync="dialogFormVisible"
               title="添加企业">
      <el-form :model="dataListById">
        <el-form-item label="企业名称">
          <el-input auto-complete="off"
                    v-model="dataListById.name"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer"
           slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button @click="comSave"
                   type="primary">确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {comDeleteById, comFindAll, comFindById, comSave} from '@/api/company/company'

  export default {
    data() {
      return {
        dataListById: {},
        dataList: [],
        dialogFormVisible: false,
      }
    },
    methods: {
      // 获取企业列表全部数据
      getListAll() {
        comFindAll().then(res => {
          this.dataList = res.data.data
        })
      },
      // 打开添加弹窗
      comAdd() {
        this.dialogFormVisible = true
      },
      comSave() {
        comSave(this.dataListById).then(res => {
          this.$message({
            message: res.data.message
          })
          if (res.data.success) {
            location.reload();
          }
        })
      },
      findById(id) {
        comFindById({id: id}).then(res => {
          this.dataListById = res.data.data
        })
      },
      comDelete(id) {
        this.$confirm('是否删除此条记录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          comDeleteById({id: id}).then(res => {
            this.$message({
              message: res.data.message,
              type: res.data.success ? 'success' : 'error'
            })
            if (res.data.success) {
              location.reload();
            }
          })
        })
      },
    },
    // 创建完毕状态
    created() {
      this.getListAll();
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
</style>
