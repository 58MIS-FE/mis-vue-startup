<template>
    <div class="page__error">
        错误页面404

        <sync-test></sync-test>
    </div>
</template>

<script>
    export default {
        components: {
            syncTest: () => import(
                /* webpackChunkName: "error-test-comp" */
                './test'
            )
        }
    }
</script>
<style scoped>

</style>