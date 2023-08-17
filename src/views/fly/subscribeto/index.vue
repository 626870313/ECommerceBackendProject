<template>
    <div class="subscribe_all">
        <span>暂时没有订阅用户</span>
    </div>
</template>

<script setup lang='ts'>
// import request from '@/utils/request';
import useUserStore from '@/store/modules/user'
import { reactive,onMounted } from 'vue';

let useStore = useUserStore()
let loginForm = reactive({ username: 'admin', password: '123456' })

onMounted(()=>{
    // Login1()
})

const Login1 = async ()=>{
    await useStore.userLogin1(loginForm)
}


</script>
<script lang="ts">
export default {
    name: 'Subscribeto'
}
</script>
<style scoped lang="scss">
    .subscribe_all{
        height: calc(100vh - 300px);
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        // margin-top: 150px;
    }
</style>