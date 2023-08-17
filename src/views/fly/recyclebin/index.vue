<template>

 <div class="main_recycle">
        <div class="top_rec">
            <img src="../../../assets/rec.png" alt="">
            <span>回收站为空</span>
        </div>
 </div>

</template>

<script setup lang='ts'>

</script>
<script lang="ts">
export default {
    name:'Recyclebin'
}
</script>
<style scoped lang="scss">
    .main_recycle{
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
        }
}
</style>