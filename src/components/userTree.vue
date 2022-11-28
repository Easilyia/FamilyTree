<template>
  <el-form 
    ref="ruleForm"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="姓名" prop="name">
      <el-input v-model="ruleForm.name" style="width: 480px"/>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="ruleForm.sex">
        <el-radio label="男" />
        <el-radio label="女" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="出生日期" prop="birth">
      <el-col :span="11">
        <el-date-picker
          v-model="ruleForm.birth"
          type="date"
          placeholder="Pick a birth date"
          style="width: 100%"
        />
      </el-col>
    </el-form-item>
    <el-form-item label="是否在世" prop="life">
      <el-select v-model="ruleForm.life">
        <el-option label="是" value="1" />
        <el-option label="否" value="0" />
      </el-select>
    </el-form-item>
    <el-form-item label="死亡日期" v-if="ruleForm.life == '0'" prop="death">
      <el-col :span="11">
        <el-date-picker
          v-model="ruleForm.death"
          type="date"
          placeholder="Pick a death date"
          style="width: 100%"
        />
      </el-col>
    </el-form-item>
    <el-form-item label="血型" prop="bloodType">
      <el-radio-group v-model="ruleForm.bloodType">
        <el-radio label="A" />
        <el-radio label="B" />
        <el-radio label="AB" />
        <el-radio label="O" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="父亲姓名" prop="Fname">
      <el-input v-model="ruleForm.Fname" style="width: 480px" placeholder="如果为祖先请输入0"/>
    </el-form-item>
    <el-form-item label="是否有孩子">
      <el-select v-model="ruleForm.child">
        <el-option label="是" value="1" />
        <el-option label="否" value="0" />
      </el-select>
    </el-form-item>
    <el-form-item label="主要居住地">
      <el-select v-model="ruleForm.region" placeholder="请选择" label="主要居住地">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.value"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="职业">
      <el-input v-model="ruleForm.desc" type="textarea" style="width: 480px" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" plain @click="submitForm('ruleForm')">Add</el-button>
      <el-button type="success" plain @click="resetForm('ruleForm')">Reset</el-button>
      <el-button type="warning" plain @click="createForm() ">Create</el-button>
    </el-form-item>
  </el-form>
  <ul class="mesg" ref="mesform">

  </ul>
</template>

<script>
import { number } from 'echarts'
import { useStore } from "../store/index";

export default{
  data(){
    return{
      list:[],
      ruleForm: {
        name: '',
        life: '',
        birth: '',
        death: '',
        bloodType: '',
        sex: '',
        desc: '',
        Fname:'',
        child:'',
        region: '',
        id: number
      },
      rules:{
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        life: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        birth: [
          { type: 'date', required: true, message: '请选择出生日期', trigger: 'change' }
        ],
        death: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        Fname: [
          { required: true, message: '请填写父亲姓名', trigger: 'blur' }
        ]
      },
      options: [{value: '河北省'}, {value: '山西省'}, {value: '辽宁省'}, {value: '吉林省'}, {value: '黑龙江省'}
      ,{value:'江苏省'},{value:'浙江省'},{value:'安徽省'},{value:'福建省'},{value:'江西省'},{value:'山东省'},{value:'河南省'}
      ,{value:'湖北省'},{value:'湖南省'},{value:'广东省'},{value:'海南省'},{value:'四川省'},{value:'贵州省'},{value:'云南省'}
      ,{value:'陕西省'},{value:'甘肃省'},{value:'青海省'},{value:'台湾省'},{value:'内蒙古自治区'},{value:'广西壮族自治区'}
      ,{value:'西藏自治区'},{value:'宁夏回族自治区'},{value:'新疆维吾尔自治区'},{value:'北京市'},{value:'天津市'},{value:'上海市'}
      ,{value:'重庆市'},{value:'香港特别行政区'},{value:'澳门特别行政区'}],
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');

          this.ruleForm.id = this.list.length+1
          var t = {}
          t = JSON.parse(JSON.stringify(this.ruleForm))
          this.list.push(t)

          const li=document.createElement("li")
          li.innerText=this.ruleForm.name
          const ul=this.$refs.mesform
          ul.appendChild(li)
        } else {
          alert('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    createForm() {
      alert('create!!!')
      const store = useStore()
      store.treelist = this.list
      this.$router.push('/create')
    }
  }
}
</script>

<style>
.demo-ruleForm {
  float: left;
}
.mesg {
  float: right;
  margin-right: 50px;
}
ul li{
  height: 35px;
  margin: 8px;
  line-height: 35px;
  width: 250px;
  background-color: antiquewhite;
}
</style>