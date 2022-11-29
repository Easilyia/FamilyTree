<template>
  <div ref="userTree" :style="{width: '500px', height: '500px', float: left}"></div>
  <div class="list">
    <div class="btngp">
      <el-row class="row-bg">
        <el-button plain @click="ancestorPath()">查看他到祖先的路径信息</el-button>
        <el-button type="success" plain @click="traverse()">遍历树并计算树的繁茂度</el-button>
        <el-button type="primary" plain @click="generationCount()">计算辈分差</el-button>
      </el-row>
      <el-row class="row-bg">
        <el-button type="warning" plain @click="getHuffmanCode()">按年龄计算哈夫曼树</el-button>
        <el-button plain @click="reserve()">返回</el-button>
      </el-row>
    </div>
    <el-card class="box-card" v-if="flag">
      <el-descriptions :column="2">
        <el-descriptions-item label="姓名">{{name}}</el-descriptions-item>
        <el-descriptions-item label="性别">{{sex}}</el-descriptions-item>
        <el-descriptions-item label="血型">
          <el-tag size="small" type="success">{{bloodType}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="出生日期">{{birth}}</el-descriptions-item>
        <el-descriptions-item label="死亡日期" v-if="death">{{death}}</el-descriptions-item>
        <el-descriptions-item label="居住地">{{region}}</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
  <router-view></router-view>
</template>
<script>
import { useStore } from "../store"
import * as echarts from 'echarts'
export default {
  data() { 
    return {
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
      flag: false,
    }
  },
  methods: {
    initList() {
      const store = useStore()
      const list=store.treelist
      class Node {
        constructor(name, id) {
          this.name = name
          this.id = id
          this.childrenid = []
          this.fatherid = []
          this.children = []
        }
      }
      var i
      var NodeTree=new Node(100)
      function parseid() {
        const len = list.length
        for (i = 0; i < len; i++) {
           let res = new Node(list[i].name, list[i].id)
           NodeTree[i]=res
        }
        for (i = 0; i < len; i++) {
          for (let j = 0; j < len; j++) {
            if (list[j].Fname == list[i].name) {
              NodeTree[i].childrenid.push(list[j].id)
              NodeTree[j].fatherid.push(NodeTree[i].id)
            }
          }
        }

        for(let j=0;j<len;j++){
          store.treeN.push(NodeTree[j])
        }
        console.log(store.treeN)

        for (i = 0; i < len; i++) if (list[i].Fname=='0') break
        store.root = i

        function parse(root) {
            if (!root.childrenid) return
            for (let childId of root.childrenid) {
              parse(NodeTree[childId-1])
              root.children.push(NodeTree[childId-1])
            }
            return root
        }
        parse(NodeTree[i])

      }
      parseid()
      store.wholeRoot = NodeTree[i]
      return NodeTree[i]
    },
    Draw(){
      let listTree = this.initList()
      console.log(listTree)
      let myChart = echarts.init(this.$refs.userTree)
        let option = {
            tooltip: {
              trigger: 'item',
              triggerOn: 'mousemove',
              enterable: true,
              position: 'right',
              formatter: (params) => {
              return `
                  <div onclick='clickToDetail(${params.data.id})'>
                      <div><span>姓名：</span>${params.name}</div>
                      <div><span>id：</span>${params.data.id}</div>
                  </div>
              `
              },
            },
            series: [
              {
                type: 'tree',
                data: [listTree],
                collapsed: true,
                left: '2%',
                right: '2%',
                top: '8%',
                bottom: '20%',
                symbol: 'emptyCircle',
                symbolSize: 25,
                orient: 'TB',
                roam: false,
                expandAndCollapse: true,
                initialTreeDepth: -1,
                axisPointer: {
                    crossStyle: { width: 4 },
                },
                label: {
                    position: 'top',
                    rotate: 0,
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 15,
                },
                leaves: {
                    label: {
                        position: 'bottom',
                        verticalAlign: 'middle',
                        align: 'left',
                    },
                },
                animationDurationUpdate: 750,
              },
            ],
        }
        myChart.setOption(option)
    },
    clickToDetail(id){
      this.flag=1
      const store = useStore()
      const detailMsg = store.treelist
      console.log('1111',detailMsg[id-1])
      const listperson = detailMsg[id-1]
      this.name = listperson.name
      this.sex=listperson.sex
      this.birth=listperson.birth.substr(0,10)
      this.death=listperson.death.substr(0,10)
      this.bloodType=listperson.bloodType
      this.region = listperson.region
    },
    ancestorPath(){
      const store = useStore()
      store.pathName = this.name
      this.$router.push('/create/ancestorsearch/'+this.name)
    },
    traverse(){
      this.$router.push('/create/traversetree')
    },
    reserve(){
      this.$router.push('/create')
    },
    generationCount(){
      this.$router.push('/create/generationcount')
    },
    getHuffmanCode(){
      this.$router.push('/create/gethuffman')
    }
  },
  mounted() {
    this.Draw()
    window.clickToDetail = this.clickToDetail
  },
}
</script>
<style>
.list{
  width: 500px;
  position: absolute;
  right:40px;
  top:120px;
}
.row-bg {
  padding: 10px 0;
}
.btngp {
  margin-bottom: 40px;
}
.operation {
  position: absolute;
  top: 560px;
  left: 250px;
}
</style>