<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane label="企业信息"
                     name="first">
          <el-form ref="form"
                   :model="formDate"
                   label-width="200px">
            <el-form-item label="公司名称">
              <el-input style="width:250px"
                        v-model="formDate.name"
                        disabled
                        placeholder="公司名称"></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input style="width:250px"
                        v-model="formDate.companyAddress"
                        placeholder="公司地址"></el-input>
            </el-form-item>
            <el-form-item label="公司电话">
              <el-input style="width:250px"
                        v-model="formDate.companyPhone"
                        placeholder="公司电话"></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input style="width:250px"
                        v-model="formDate.mailbox"
                        placeholder="公司邮箱"></el-input>
            </el-form-item>

            <el-form-item label="公司地区">
              <el-input style="width:250px"
                        v-model="formDate.company_area"
                        placeholder="公司地区"></el-input>
            </el-form-item>
            <el-form-item label="营业执照">
              <el-upload class="upload-demo"
                         drag
                         name="formDate.business_license_id"
                         action="https://jsonplaceholder.typicode.com/posts/"
                         multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip"
                     slot="tip">只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
              <!-- <el-input style="width:250px"
                        v-model="formDate.business_license_id"
                        placeholder="营业执照"></el-input> -->
            </el-form-item>
            <el-form-item label="法人代表">
              <el-input style="width:250px"
                        v-model="formDate.legal_representative"
                        placeholder="法人代表"></el-input>
            </el-form-item>
            <el-form-item label="公司规模">
              <el-input style="width:250px"
                        v-model="formDate.company_size"
                        placeholder="公司规模"></el-input>
            </el-form-item>
            <el-form-item label="所属行业">
              <el-input style="width:250px"
                        v-model="formDate.industry"
                        placeholder="所属行业"></el-input>
            </el-form-item>
            <el-form-item label="创建时间"
                          class="createTimef">
              <el-input style="width:250px"
                        class="createTime"
                        v-model="formDate.createTime"
                        placeholder="创建时间"></el-input>
            </el-form-item>
            <el-form-item label="备注"
                          prop="desc">
              <el-input type="textarea"
                        style="width:250px"
                        v-model="formDate.remarks"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         @click="findSave">审核
              </el-button>
              <el-button @click="resetForm('ruleForm')">拒绝</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="账户信息"
                     name="second">账户信息
        </el-tab-pane>
        <el-tab-pane label="交易记录"
                     name="third">交易记录
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script>
  import {comFindById, comSave, comSaveOrUpdate} from '@/api/company/company'

  export default {
    name: 'saas-clients-company',
    data() {
      return {
        activeName: 'first',
        formDate: {},
        comDate: {}
      }
    },
    methods: {
      comFindById(id) {
        comFindById({id: id}).then(res => {
          this.formDate = res.data.data
        })
      },
      // 添加
      findSave() {
        this.formDate.id = this.$route.params.id
        comSaveOrUpdate(this.formDate).then(res => {
          this.$message({
            message: res.data.message,
            type: res.data.success ? 'success' : 'error'
          })
          if (res.data.success) {
            location.reload()
          }
        })
      },
      // 添加
      comAdd() {
        this.dataList.id = this.$route.params.id
        comSave(this.dataList).then(res => {
          this.$message({
            message: res.data.message,
            type: res.data.success ? 'success' : 'error'
          })
          if (res.data.success) {
            // location.reload();
          }
        })
      },
      // 保存
      comSave(id) {
        comSaveOrUpdate({id: id}).then(res => {
          this.comDate = res.data.data
        })
      },
      handleClick(tab, event) {
        console.log(tab, event)
      }

    },
    // 创建完毕状态
    created() {
      var id = this.$route.params.id
      this.comFindById(id)
    }
  }
</script>
<style scoped>
  .el-tabs {
    border: 1px solid #ebeef5;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    color: #303133;
    padding: 20px;
  }
</style>
<style>
  .createTime {
    width: 51%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
