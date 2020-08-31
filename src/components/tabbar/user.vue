<template>
    <div>
        user
    </div>
</template>

<script>
    export default {
        created(){
            this.$parent.title = "个人中心";
            this.$parent.active = -1;
        }
    }
</script>

<style lang="scss" scoped>

</style>
