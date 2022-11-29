<template>
<div>
    <div class="box">
        <span>
          年龄大小：  
        </span>
        <div ref="pre" class="inner"></div>
    </div>
    <div class="box">
        <span>
           对应id：
        </span>
        <div ref="level" class="inner"></div>
    </div>
    <p>这棵家族树的哈夫曼序列为：{{s}}</p>
</div>
</template>

<script>
import { useStore } from '../store'
export default{
    data(){
        return {
            list:[],
            age:[],
            index:[],
            s:''
        }
    },
    methods:{
        getSortAge(){
            const store = useStore()
            this.list = store.treelist
            for(let i = 0; i<this.list.length; i++){
                if(this.list[i].death){
                    const birthInt = parseInt(this.list[i].birth.substr(0,10))
                    const deathInt = parseInt(this.list[i].death.substr(0,10))
                    this.age[i]=deathInt - birthInt
                    this.index[i]=this.list[i].id
                }
                else{
                    const birthInt = parseInt(this.list[i].birth.substr(0,10))
                    this.age[i]=2022-birthInt
                    this.index[i]=this.list[i].id
                }
            }
            
            const _this=this
            sortAge(0,this.list.length-1)
            function sortAge(low,high){
                if(low < high){
                    let i=low
                    let j=high
                    let base=_this.age[i]
                    while(i!=j){
                        while((i<j) && (_this.age[j]>=base)) j--;
                        while((i<j) && (_this.age[i]<=base)) i++;
                        if(i>=j) break;
                        _this.switchAll(i,j)
                    }
                    _this.switchAll(low,i)
                    sortAge(low,i-1)
                    sortAge(i+1,high)
                }
                else return
            }
            console.log(this.age)

            class Node{
                constructor(value,id){
                    this.value=value
                    this.id=id
                    this.left={}
                    this.right={}
                }
            }
            let forest=[]
            for(let i=0;i<this.age.length;i++){
                let node = new Node(this.age[i],this.index[i])
                forest.push(node)
            }
            let allNodes=[]
            while(forest.length!=1){
                forest.sort((a,b)=>{
                    return a.value - b.value
                })
                let node=new Node(forest[0].value+forest[1].value,'')
                allNodes.push(forest[0])
                allNodes.push(forest[1])
                node.left=allNodes[allNodes.length-2] //左子树放更小的
                node.right=allNodes[allNodes.length-1]
                if(forest.length > 2) forest = forest.slice(2) //从第3个开始一直到末尾
                else forest=[] 
                forest.push(node)
            }
            console.log('forest',forest[0])

            var huffLevel=[]
            var ind = 0
            function hufflevel(node,ind){
                if(!node) return
                if(node.id!=''){
                    huffLevel[node.id]=ind
                    console.log(node.id)
                    console.log('ind',ind)
                }
                else{
                    hufflevel(node.left,ind+1)
                    hufflevel(node.right,ind+1)
                }
            }
            hufflevel(forest[0],ind)
            for(let i=1;i<huffLevel.length;i++){
                for(let j=1;j<=huffLevel[i];j++)
                    this.s+=i.toString()
            }

        },
        switchAll(i,j){
            let t = 0
            t=this.age[i]
            this.age[i]=this.age[j]
            this.age[j]=t
            t=this.index[i]
            this.index[i]=this.index[j]
            this.index[j]=t
        },
        putDom(){
            const divPre = this.$refs.pre
            const divLev = this.$refs.level

            for(let i = 0; i < this.age.length; i++){
                let span1 = document.createElement("span")
                span1.innerText = this.age[i]
                span1.className="ans"

                let span2 = document.createElement("span")
                span2.innerText = this.index[i]
                span2.className="ans"

                divPre.appendChild(span1)
                divLev.appendChild(span2)
            }
        }
    },
    mounted(){
        this.getSortAge()
        this.putDom()
    }
}
</script>