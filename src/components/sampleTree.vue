<template>
    <div ref="myTree" :style="{width: '500px', height: '500px'}" class="tree"></div>
</template>
<script>
import * as echarts from 'echarts'

export default{
    data(){
        return{
            list:
                {
                    name:'aaaa',
                    children:[
                        {
                            name:'bbbb',
                            children:[
                                {name:'cccc'},
                                {name:'dddd'},
                                {name:'eeee'}
                            ]
                        },
                        {
                            name:'ffff',
                            children:[
                                {
                                    name:'gggg',
                                    children:[
                                        {
                                            name:'hhhh',
                                            children:[
                                                {name:'kkkk',children:[{name:'llll'}]},
                                                {name:'mmmm'}
                                            ]
                                        },
                                        {name:'iiii'},
                                        {name:'jjjj'}
                                    ]
                                }
                            ]
                        },
                    ]
                },
        }
    },
    methods:{
        Draw(){
            console.log(this.list)
            let myChart = echarts.init(this.$refs.myTree)
            let option = {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove',
                    enterable: true,
                    position: 'right',
                    formatter: (params) => {
                    return `
                        <div>
                            <div><span>姓名：</span>${params.name}</div>
                        </div>            
                    `
                    },
                },
                series: [
                    {
                        type: 'tree',
                        data: [this.list],
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
            // const nodes = myChart._chartsViews[0]._data._graphicEls
            // let allNode = 0
            // for (let index = 0; index < nodes.length; index++) {
            // const node = nodes[index]
            // if (node === undefined) {
            //     continue
            // }
            // allNode++
            // }
            // const height = window.innerHeight
            // const currentHeight = 45 * allNode
            // const newWidth = Math.max(currentHeight, height)
            // this.$refs.myTree.style.width = window.innerWidth + 'px'
            // this.$refs.myTree.style.height = newWidth + 'px'
            // myChart.resize()
        }
    },
    mounted(){
        this.Draw()
    }
}
</script>
<style>

</style>