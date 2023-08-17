<template>

<div class="main_safe">
        <div class="top_rec">
            <img src="../../../assets/safe.png" alt="">
            <span>请设置保险柜密码</span>
        </div>
 </div>
</template>

<script setup lang='ts'>

</script>
<script lang="ts">
export default {
    name:'Safe'
}
</script>
<style scoped lang="scss">
    .main_safe{
        height: calc(100vh - 300px);
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .top_rec{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            span{
                font-size: 20px;
            }
        }
        img{
            margin-bottom: 15px;
            height: 100px;
            width: 100px;
            border-radius: 20px;
        }
}
</style>