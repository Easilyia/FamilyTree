<template>
    <el-form 
        :label-position="right" 
        label-width="80px" 
        :model="formLabel" 
        :style="{width: '500px'}" 
        ref="formLabel"
        :rules="rules"
    >
        <el-form-item label="人物1" prop="name1">
            <el-input v-model="formLabel.name1"></el-input>
        </el-form-item>
        <el-form-item label="人物2" prop="name2">
            <el-input v-model="formLabel.name2"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="submit('formLabel')" >确定</el-button>
        </el-form-item>
    </el-form>
    <el-card class="box-card disp" v-if="flag">
        <div>两人之间的辈分差为：{{difference}}</div>
    </el-card>
</template>

<script>
import { useStore } from '../store'
export default{
    data(){
        return{
            formLabel:{
                name1:'',
                name2:''
            },
            rules:{
                name1:[
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                name2:[
                    { required: true, message: '不能为空', trigger: 'blur' }
                ]
            },
            difference:0,
            flag: 0
        }
    },
    methods:{
        submit(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.Count()
                } else {
                alert('error submit!!');
                    return false;
                }
            });
        },
        Count(){
            const store = useStore()
            var index = store.nodeIndex
            var list = store.treeN
            var t1 = 0
            var t2 = 0
            for(let i = 0; i < list.length; i++){
                if(list[i].name == this.formLabel.name1) t1 = index[list[i].id]
                if(list[i].name == this.formLabel.name2) t2 = index[list[i].id]
                if(t1!=0 && t2!=0) break
            }
            this.difference = Math.abs(t1-t2)
            this.flag = 1
        }
    }
}
</script>
<style>
.disp{
    height: 85px;
    line-height: 50px;
    position: absolute;
    right: 170px;
    bottom: 135px;
}
</style>