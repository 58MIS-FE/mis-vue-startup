<style>
    @import './assets/theme.css';
</style>

<template>
    <div id="app" ref="myApp">
        <p>fdd</p>
        {{# if_eq ui 'element' }}
        <el-button type="primary">主要按钮</el-button>
        {{/if_eq}}
        <router-view></router-view>
    </div>
</template>

<script>
    export default {};
</script>
