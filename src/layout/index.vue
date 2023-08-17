<template>
    <div class="layout_container">
        <div class="layout_slider">
            <Logo></Logo>
            <el-scrollbar class="scrollBar">
                <el-menu background-color="transparent" class="el-menu-side">
                    <Menu :menuList="userStore.menuRoutes" @route-path="updateMenuRoutePath"></Menu>
                </el-menu>

            </el-scrollbar>
        </div>
        <div class="layout_main">
            <Content :menuRoutePath="menuRoutePath"></Content>
           
        </div>
    </div>
</template>

<script setup lang='ts'>
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Content from './content/index.vue'

import useUserStore from '@/store/modules/user'
let userStore = useUserStore()



import { ref} from 'vue'

let menuRoutePath = ref('/fly/file')
const updateMenuRoutePath = (data: string) => {
    menuRoutePath.value = data
}



</script>
<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;
    background-color: red;

    .layout_slider {
        width: $base-menu-width;
        height: 100vh;
        background-color: $base-menu-background;
        padding: 10px;
        overflow: auto;

        .scrollBar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height - 54px);
            .el-menu{
                border: none;
            }
            .el-menu-item {
                border-radius: 15px;

            }
        }
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: 100vh;
        background-color: #fff;
        top: 0;
        right: 0;
        color-scheme: light;
        padding: 40px;
        // overflow: auto;
    }
}</style>