import {defineStore} from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'
import type {loginForm,loginResponseData} from '@/api/user/type'
import type {UserState} from './types/type.ts'
import { SET_TOKEN,GET_TOKEN,REMOVE_TOKEN } from '@/utils/token.ts'
import { constantRoutes } from '@/router/routes.ts'

import { reqLogin1 } from '@/api/uploader'


let useUserStore = defineStore('User',{
    state:():UserState=>{
        return {
            token:GET_TOKEN(),
            menuRoutes:constantRoutes, //仓库存储侧边菜单 是根据路由信息生成
            username:'',
            avatar:'',
            

        }
    },

    actions:{
        async userLogin(data:loginForm){
            let result:loginResponseData = await reqLogin(data)
            console.log('res==>',result)
            if(result.code==200){
                this.token =(result.data.token as string)
                // localStorage.setItem('TOKEN',(result.data.token as string))
                SET_TOKEN((result.data.token as string))
                return 'ok'
            }else{
                return Promise.reject(new Error(result.data.message))
            }
        },

        async userInfo(){
           let result = await reqUserInfo()
           if(result.code==200){
                this.username = result.data.checkUser.username
                this.avatar = result.data.checkUser.avatar
                return 'ok'
           }else{
                return Promise.reject('获取用户信息失败')
           }
        },

        async userLogin1(data:any){
            try {
                let result = await reqLogin1(data)
                console.log('resrse==>',result)
                if(result.code==200){
                    this.token =(result.token as string)
                    // localStorage.setItem('TOKEN',(result.data.token as string))
                    SET_TOKEN((result.token as string))
                    return 'ok'
                }
            } catch (error) {
                // console.log('err==>',error.message)
                return Promise.reject(new Error(error.message))
            }
            
        },

        userLogout(){
            this.token = ''
            this.username = ''
            this.avatar = ''
            REMOVE_TOKEN()
        }
    },

    getters:{

    }
})


export default useUserStore

