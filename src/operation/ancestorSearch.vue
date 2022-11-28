<template>
    <div ref="rowlist">

    </div>
</template>

<script>
import { useStore } from "../store"
export default{
    data(){
        return {
            namelist:[]
        }
    },
    methods:{
      ancestorPath(){
        const store = useStore()
        const name = store.pathName
        var path = []
        var _this = this
        function printPath(Tree,pathlen){
            if(Tree.childrenid!=[]){
                path[pathlen]=Tree.name
                if(Tree.name==name){
                    for(let i = 0; i <= pathlen; i++){
                        _this.namelist.push(path[i])
                    }
                    return
                }
                else{
                    for(let i = 0; i < Tree.childrenid.length; i++){
                        printPath(store.treeN[Tree.childrenid[i]-1],pathlen+1)
                    }
                }
            }
        }
        printPath(store.treeN[store.root],0)
        var divF = this.$refs.rowlist
       
        for(let i = 0; i < _this.namelist.length; i++){
            let span = document.createElement("span")
            span.innerText = _this.namelist[i]
            span.className="ans"

            let arrow = document.createElement("span") //为啥这个放在for循环外面就只有一个箭头？
            arrow.innerText = "➞"
            arrow.style.margin = '10px'

            divF.appendChild(span)
            if(i!=_this.namelist.length-1) divF.appendChild(arrow)
        }
        console.log(this.namelist)
      }
    },
    mounted(){
        this.ancestorPath()
    }
}
</script>
<style>
.ans{
    display:inline-block;
    width: 60px;
    height: 40px;
    line-height: 40px;
    background-color:wheat;
}
</style>