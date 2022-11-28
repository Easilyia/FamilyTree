<template>
<div class="common-layout">
  <el-container>
    <el-header>FamilyTree</el-header>
    <el-container>
      <el-aside width="200px">
        <router-link to="/sample" class="sample">SampleTree</router-link>
        <router-link to="/user" class="user">Start!</router-link>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
export default{
  name:'app'
}
</script>

<style>
.el-header{
  background-color: rgb(230, 162, 60);
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: rgb(250, 236, 216);
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100vh;
}

.el-main {
  background-color: rgb(253, 246, 236);
  color: #333;
  text-align: center;
  line-height: 160px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

body > .el-container {
  margin-bottom: 40px;
}
.sample, .user{
  display: block;
  text-decoration: none;
  color: #333;
  width: 100%;
  height: 50px;
  line-height: 50px;
  margin-bottom: 20px;
  background-color: rgb(255, 226, 185);
}
.sample {
  margin-top: 20px;
}
.sample:hover{
  background-color: rgba(230, 162, 60, 0.726);
}
.user:hover{
  background-color: rgba(230, 162, 60, 0.726);
}
</style>