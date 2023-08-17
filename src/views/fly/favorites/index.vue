<template>

<div class="main_fav">
        <div class="top_rec">
            <span>空空如也</span>
        </div>
 </div>
</template>

<script setup lang='ts'>

</script>
<script lang="ts">
export default {
    name:'Favorites'
}
</script>
<style scoped lang="scss">
    .main_fav{
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
       
}
</style>