<template>
    <div>

        <div class="file_top">
            <el-checkbox v-model="checkAll" style="margin-left: 3px;">供 {{ fileInfo.length }} 项</el-checkbox>
            <div>
                <el-button size="small">
                    <el-icon style="vertical-align: middle;">
                        <Sort />
                    </el-icon>
                    按名称排序
                </el-button>
                <span>
                    <el-tooltip effect="dark" content="切换视图" placement="top" :show-arrow="false">
                        <el-button size="small">
                            <el-icon style="vertical-align: middle;">
                                <SemiSelect />
                            </el-icon>
                        </el-button>
                    </el-tooltip>
                </span>
            </div>

        </div>
        <div>
            <el-row :gutter="20">
                <el-col :span="3" v-for="(item, index) in fileInfo" :key="index" style="margin: 20px;"
                    @mouseover="showDiv(index)" @mouseout="hideDiv(index)">
                    <div class="grid-content ep-bg-purple file_box_item">
                        <div class="file_radio_btn" v-show="dataCheckAndSet[index]">
                            <div class="file_left_radio">
                                <!-- <el-checkbox-group>
                                <el-checkbox></el-checkbox>
                            </el-checkbox-group> -->
                                <input type="checkbox" class="check_left" style="border-radius: 50%;">
                                
                            </div>
                            <div class="file_right_btn">
                                <More style="width: 10px; height: 10px;" :size="30" />
                            </div>
                        </div>

                        <div>
                            <img src="../../../assets/filelogo.png" alt="">
                        </div>
                        <span class="file_logo_name">{{ item.fileName.slice(0, 5) }}</span>
                        <span class="file_logo_time">{{ item.createdAt.slice(5, item.createdAt.length) }}</span>
                    </div>
                </el-col>
            </el-row>
        </div>


    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { getFilesInfo } from '@/api/uploader/index'
import useUserStore from '@/store/modules/user';

let useStore = useUserStore()
let dirName: any = useStore.token
let fileInfo = ref<Array<any>>([])


onMounted(() => {
    getFiles()
})

const checkAll = ref(false)
// const dataCheckAndSet = ref(false)
const dataCheckAndSet: any = ref([])

dataCheckAndSet.value = Array(fileInfo.value.length).fill(false);

const showDiv = (index: number) => {
    dataCheckAndSet.value[index] = true;

}

const hideDiv = (index: number) => {
    dataCheckAndSet.value[index] = false;
}

const getFiles = async () => {
    try {
        let { files } = await getFilesInfo(dirName)
        if (!files.length) return
        fileInfo.value = files
        console.log(fileInfo.value)
    } catch (error) {
        console.log(error)
    }

}

</script>
<script lang="ts">
export default {
    name: 'File'
}
</script>
<style lang="scss" scoped>
.file_top {
    display: flex;
    justify-content: space-between;
}


.file_box_item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 120px;
    min-height: 170px;

    .file_radio_btn {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 0;
        margin: 0;
        height: 20px;
        position: absolute;
        top: 0px;
        left: 0;

        .file_left_radio {
            height: 23px;
            width: 25px;
            margin: 5px;
            border-radius: 8px;
            position: relative;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 1px 10px rgba(187, 186, 186, 0.3);
            border-radius: 8px;


            .check_left {
                position: absolute;
                top: 2.5px;
                left: 2.5px;
                border-radius: 50%;
                cursor: pointer;

            }

          

        }

        .file_right_btn {
            height: 23px;
            width: 25px;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 5px;
            font-size: 36px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 1px 10px rgba(187, 186, 186, 0.3);
            border-radius: 8px;

            svg {
                height: 100%;
                width: 100%;
                cursor: pointer;

            }


        }
    }


    img {
        height: 88px;
        width: 88px;
        border-radius: 20px;
        vertical-align: middle;
        margin: 20px 15px 15px 15px;
    }

    .file_logo_name {
        font-size: 16px;
    }

    .file_logo_time {
        margin: 10px;
        font-size: 10px;
        color: rgb(198, 198, 198);
    }


    &:hover {
        background-color: aliceblue;
        border-radius: 8px;
    }


}
</style>