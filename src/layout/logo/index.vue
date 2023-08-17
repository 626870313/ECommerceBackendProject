<template>

 <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo">
    <p>{{setting.title}}</p>
 </div>

</template>

<script setup lang='ts'>
import setting from '@/setting'


</script>

<style lang="scss" scoped>
   .logo{
      padding: 60px;
      padding-left: 20px;
      padding-bottom: 50px;
      display: flex;
      width:100%;
      height:$base-menu-logo-height;
      letter-spacing:0px;
      align-items: center;
      font-size: 20px;
      font-weight: bold;
      img{
         width: 40px;
         height: 40px;
         border-radius: 50%;
         margin-right: 10px

      }
   }
</style>