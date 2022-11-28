<template>
<div>
    <div class="box">
        <span>
          先序遍历为：  
        </span>
        <div ref="pre" class="inner"></div>
    </div>
    <div class="box">
        <span>
           层次遍历为： 
        </span>
        <div ref="level" class="inner"></div>
    </div>
    <p>这棵家族树的繁茂度是：{{sum}}</p>
</div>
</template>

<script>
import { useStore } from '../store'
export default{
    data(){
        return {
            respre:[],
            reslev:[],
            sum:0
        }
    },
    methods:{
        Order(){
            const store = useStore()
            const root = store.wholeRoot
            var resPre=[]
            function preOrder(node){
                if(!node) return
                const {name,children} = node
                resPre.push(name)
                children.forEach(child => {
                    preOrder(child)
                });
            }
            preOrder(root)
            this.respre = resPre
            var resLevel=[]
            var index = 0
            function layOrder(node,index){
                if(!node) return
                if(!resLevel[index]) resLevel[index]=[]
                resLevel[index].push(node.name)
                store.nodeIndex[node.id]=index //顺便存起来
                node.children.forEach(child => {
                    layOrder(child,index+1)
                })
            }
            layOrder(root,index)
            this.reslev = resLevel
            
            for(let i = 0; i < resLevel.length; i++){
                this.sum+=resLevel[i].length * (i+1)
            }
        },
        putDom(){
            const divPre = this.$refs.pre
            const divLev = this.$refs.level

            for(let i = 0; i < this.respre.length; i++){
                let span = document.createElement("span")
                span.innerText = this.respre[i]
                span.className="ans"

                let arrow = document.createElement("span") //为啥这个放在for循环外面就只有一个箭头？
                arrow.innerText = "➞"
                arrow.style.margin = '10px'

                divPre.appendChild(span)
                if(i!=this.respre.length-1) divPre.appendChild(arrow)
            }
            for(let i = 0; i < this.reslev.length; i++){
                for(let j = 0; j < this.reslev[i].length; j++){
                    let span = document.createElement("span")
                    span.innerText = this.reslev[i][j]
                    span.className="ans"

                    let arrow = document.createElement("span")
                    arrow.innerText = "➞"
                    arrow.style.margin = '10px'

                    divLev.appendChild(span)
                    divLev.appendChild(arrow)
                }
            }
            divLev.removeChild(divLev.lastChild)
        }
    },
    mounted(){
        this.Order()
        this.putDom()
    }
}
</script>
<style>
ans{
    display:inline-block;
    width: 60px;
    height: 40px;
    line-height: 40px;
    background-color:wheat;
}
.box {
    width: 100%;
    height: 80px;
    line-height: 80px;
}
p {
    height: 80px;
    line-height: 80px;
    margin-top: -5px;
}
.inner {
    display: inline-block;
}
</style>