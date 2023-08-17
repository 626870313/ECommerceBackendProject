<template>
   <div class="side_upAnddown">
      <div class="up_ce">
         <template v-for="item in menuList" :key="item.path">


            <template v-if="!item.children">
               <el-menu-item :index="item.path" v-if="!item.meta.hidden" @click="goRoute">
                  <template #title>
                     <el-icon :size="150">
                        <component :is="item.meta.icon"></component>
                     </el-icon>
                     <span>{{ item.meta.title }}</span>
                  </template>
               </el-menu-item>
            </template>


            <template v-if="item.children && !item.meta.hidden">
               <el-menu-item v-for="i in item.children" @click="goRoute" :index="i.path">
                  <template #title>
                     <el-icon :size="150">
                        <component :is="i.meta.icon"></component>
                     </el-icon>
                     <span>{{ i.meta.title }}</span>
                  </template>
               </el-menu-item>
            </template>

         </template>
      </div>
      <div class="middle_side">
         <div class="middel_side_in">
            <span>852.43MB/105GB</span>
            <a>容量管理</a>
         </div>
         <el-progress :percentage="0.8" :show-text="false">

         </el-progress>
         <el-button size="large" color="black">开通超级会员</el-button>
      </div>

      <div class="down_user">
         <!-- <img src="../../assets/login3.png" alt=""> -->
         <img :src="userStore.avatar" alt="">

         <span>{{userStore.username}}</span>
         <el-icon class="setting-icon other1" style="">
            <component is='MoonNight'></component>
         </el-icon>
         <div class="icon_di_b">
            <el-dropdown placement="bottom" trigger="click">
               <span class="el-dropdown-link">
                  <el-icon class="setting-icon other2">
               <component is='More'></component>
            </el-icon>
               </span>
               <template #dropdown>
                  <el-dropdown-menu>
                     <el-dropdown-item>个人中心</el-dropdown-item>
                     <el-dropdown-item>关于</el-dropdown-item>
                     <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
               </template>
            </el-dropdown>
         </div>
      </div>
   </div>
</template>

<script setup lang='ts'>
import { useRouter,useRoute } from 'vue-router'
import useUserStore from '@/store/modules/user';

const userStore = useUserStore()

defineProps(['menuList'])

const emit = defineEmits(['route-path'])

const $router = useRouter()
const $route = useRoute()
const goRoute = (vc: any) => {
   $router.push(vc.index)
   emit('route-path', vc.index)
   
}

const logout = ()=>{
   userStore.userLogout()
   $router.push({path:'/login',query:{redirect:$route.path}})
}


</script>


<script lang="ts">
export default {
   name: 'Menu'
}
</script>

<style scoped lang="scss">
.el-icon {
   margin-right: 20px;
   margin-left: 30px;
}

span {
   font-size: 15px;
}

.side_upAnddown {
   height: 100%;
   display: flex;
   flex-direction: column;
   justify-content: space-around;

   .middle_side {
      margin-top: 120px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-size: 5px;

      .middel_side_in {
         display: flex;
         justify-content: space-around;

         span {
            font-size: 5px;
            margin-right: 35px;
         }
      }



      .el-progress {
         margin: 10px;
      }

      .el-button {
         margin: 10px;
      }
   }

   .down_user {
      // margin-top: 180px;
      border-top: 1px solid black;
      padding: 26px 0px;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
         background-color: rgb(224, 222, 219);
      }

      img {
         vertical-align: middle;
         height: 35px;
         width: 35px;
         border-radius: 50%;
         margin-left: 10px;
      }

      span {
         // text-align: center;
         margin: 0px 10px;
      }

      .setting-icon {
         border: 1px solid black;
         border-radius: 50%;
      }

      .other1 {
         margin: 0;
         height: 8px;
         width: 8px;
      }




      .other2 {}

   }
}
</style>