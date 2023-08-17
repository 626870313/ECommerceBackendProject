<template>
    <div class="content_div">
        <!-- {{ menuRoutePath }} -->
        <div class="top_el">
            <div>
                <el-breadcrumb separator-icon="ArrowRight"
                    style="margin: 20px 20px 50px 0px; font-size: 20px; font-weight: normal;">
                    <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" v-show="item.meta.title"
                        :to="item.path">

                        <span>{{ item.meta.title }}</span>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <div>
                <el-row>
                    <div>
                        
                            <el-button icon="Search" circle
                                v-if="menuRoutePath == '/fly/file' || menuRoutePath == '/fly/favorites'" />
                        
                        
                            <el-dropdown trigger="click">
                                <el-button icon="Plus" plain style="background: linear-gradient(to right, #00B4DB, #0083B0); 
              color: white;" circle
                                    v-show="menuRoutePath == '/fly/file' || menuRoutePath == '/fly/album' || menuRoutePath == '/fly/safe'" />
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item>
                                                <label for="uploader" style="cursor: pointer;">上传文件</label><input v-show="false" type="file" id="uploader" title="上传文件" @change="uploadFile">
                                        </el-dropdown-item>
                                        <el-dropdown-item>上传文件夹</el-dropdown-item>
                                        <el-dropdown-item>新建文件夹</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        
                        
                            <el-button v-if="menuRoutePath == '/fly/recyclebin'" icon="delete" style="border: 0;"
                                class="btn_clear" size="default">清空</el-button>
                        
                    </div>
                </el-row>



            </div>




        </div>



        <router-view></router-view>
    </div>
</template>

<script setup lang='ts'>
import SparkMD5 from 'spark-md5'
import {reqUpload} from '@/api/uploader/index.ts'
import useUserStore from '@/store/modules/user'
import { useRoute } from 'vue-router'
import {ref} from 'vue'


let userStore = useUserStore()
const $route = useRoute()

let user:any = ref(userStore.token)

type Props = {
    menuRoutePath: string
}
defineProps<Props>()

const read = (file: any) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = function () {
            resolve(reader.result);
        }
        reader.onerror = reject;

        reader.readAsArrayBuffer(file);
    });
}




const uploadFile = async (e: any) => {
    const { files } = e.target
    const file = files[0]
    if (!file) {
        return;
    }

    const content: any = await read(file);
    const arrayBuffer = new Uint8Array(content);

    // 计算文件的MD5哈希值
    const hash = SparkMD5.ArrayBuffer.hash(arrayBuffer);

    const { size, name, type } = file;
    const chunkSize: any = 5 * 1024 * 1024;
    let uploaded:any = 0;
    const local = localStorage.getItem(hash);
    if (local) {
        uploaded = Number(local);
    }

    while (uploaded < size) {
        const chunk = file.slice(uploaded, uploaded + chunkSize, type);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('type', type);
        formData.append('size', size);
        formData.append('file', chunk);
        formData.append('hash', hash);
        formData.append('offset', uploaded);
        formData.append('user', user.value);


        let result = await reqUpload(formData)
        console.log('result',result)

        uploaded += chunk.size;
        localStorage.setItem(hash, uploaded);

    }
}

</script>

<style lang="scss" scoped>

#uploader{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
}

.top_el {
    display: flex;
    justify-content: space-between;
}

.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}

.el-button {
    margin: 0px 6px;
}

.custom-upload-container {
    width: 50px;
    /* 自定义宽度 */
    /* 添加其他自定义样式 */
    height: 22px;
}
</style>@/api/uploader