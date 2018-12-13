<template>
    <div id="app" ref="myApp" class='app'>
        <h1>欢迎使用bic-vue-cli脚手架</h1>
        <router-view></router-view>
    </div>
</template>
<style>
    @import './assets/theme.css';
    .app{
      width: 800px;
      margin: 250px auto;
      background: #ddd;
      text-align:center;
    }
</style>