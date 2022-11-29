import { defineStore } from "pinia";

export const useStore = defineStore({
  id:'family',
  state: ()=> ({
    treelist:[], //最原始的list
    treeN:[], //含childrenid，不含children
    root:'',
    pathName:'',
    wholeRoot:{}, //NodeTree[root]
    nodeIndex:[] //层次
  }),
})