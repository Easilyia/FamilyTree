import { createRouter, createWebHistory } from 'vue-router'
import sampleTree from '../components/sampleTree.vue'
import userTree from '../components/userTree.vue'
import userCreate from '../components/userCreate.vue'
import ancestorSearch from '../operation/ancestorSearch.vue'
import traverseTree from '../operation/traverseTree.vue'
import generationCount from '../operation/generationCount.vue'
import getHuffman from '../operation/getHuffman.vue'

const router=createRouter({
    history:createWebHistory(),
    routes:[
        {
            path: '/user',
            name: 'userTree',
            component: userTree
        },
        {
            path:'/sample',
            name: 'sampleTree',
            component: sampleTree
        },
        {
            path: '/create',
            name: 'userCreate',
            component: userCreate,
            children: [
                {
                    path: 'ancestorsearch/:idKey',
                    name: 'ancestorSearch',
                    component: ancestorSearch
                },
                {
                    path: 'traversetree',
                    name:'traverseTree',
                    component: traverseTree
                },
                {
                    path:'generationcount',
                    name:'generationCount',
                    component:generationCount
                },
                {
                    path:'gethuffman',
                    name:'getHuffman',
                    component:getHuffman
                }
            ]
        }
    ]
})
export default router