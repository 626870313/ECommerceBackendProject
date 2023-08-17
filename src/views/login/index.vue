<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0">
            </el-col>
            <el-col :span="12" :xs="24">
                <div class="logo_up_name"><img src="../../assets/logoup1.png" alt=""><span>xx云盘</span></div>
                <div class="login_top">
                        <label :class="flag==true?'active1':'active2'" @click="changeSP">扫码登录</label>
                        <a :class="flag==false?'active1':'active2'"  @click="changeSD">账号密码</a>
                    </div>
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms" v-if="flag==false">
                    
                    <el-form-item class="item_form" prop="username">
                        <el-input class="input_input" type="text" :prefix-icon="User"
                            v-model="loginForm.username" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" class="item_form">
                        <el-input class="input_input" type="password" :prefix-icon="Lock" v-model="loginForm.password"
                            show-password  placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" size="default" @click="login">登录</el-button>
                    </el-form-item>
                    <div class="wangji_password">
                        <div><input type="radio" />下次自动登录 </div>        
                        <a href="">忘记密码?</a>
                    </div>
                    <a class="last_frg">还没有账号？注册一个</a>
                </el-form>
                <div v-else class="erweima_else">
                    <img src="../../assets/erweima1.png" alt="">
                    <!-- <img :src="qrImage" alt=""> -->
                    <div><input type="radio" />下次自动登录 </div>  
                    <a class="last_frg"> 还没有账号？注册一个</a>
                </div>
            </el-col>

        </el-row>
    </div>
</template>

<script setup lang='ts'>

import { User, Lock } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import useUserStore from '@/store/modules/user';
import { useRouter,useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';
import {getTime} from '@/utils/time'






let $router = useRouter()
let $route = useRoute()

let useStore = useUserStore()

let flag = ref(false)
let loading = ref(false)
let loginForms = ref()

let loginForm = reactive({ username: 'admin', password: '123456' })

const login =  async () => {
   await loginForms.value.validate()

   loading.value = true
    try {
        await useStore.userLogin(loginForm)
        let redirect:any = $route.query.redirect
        $router.push({path:redirect || '/'})
        ElNotification({
         type:'success',
         message:'欢迎回来',
         title:`HI,${getTime()}好`
      })
         loading.value = false
    } catch (error) {
        loading.value = false
        ElNotification({
            type:'error',
            title:(error as Error).message
        })
    }
    

}

const changeSP = ()=>{
    flag.value = true

}

const changeSD = ()=>{
    flag.value = false
}

const validatorUserName = (_:any,value:any,callback:any) =>{
   if(value.length>=5){
      callback()
   }else{
      callback(new Error('账号长度至少五位'))
   }
}

const validatorPassword = (_:any,value:any,callback:any) =>{
   if(value.length>=6){
      callback()
   }else{
      callback(new Error('密码长度至少五位'))
   }
}


const rules = {
    username: [
        //  { required: true,min: 5, max: 10, message: '账号长度至少五位', trigger: 'change' },
        // { trigger: 'change' },
        { trigger: 'change' , validator:validatorUserName},

    ],
    password: [
        // { required: true,min: 6, max: 15, message: '账号长度至少6位', trigger: 'change' },
        // { trigger: 'change' },
        { trigger: 'change' , validator:validatorPassword},

    ]
}
</script>
<style lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url('../../assets/login2.png') no-repeat;
    background-size: cover;
}

.logo_up_name{
        position: relative;
        width: 350px;
        height: 25%;
        top: 15vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family:Avenir,Helvetica,Arial,sans-serif;
        font-size: 36px;
        font-weight: 12px;
        letter-spacing: 3px;
        img{
            width: 50px;
            height: 50px;
            margin-right: 10px;
        }
}

.active1{
    background-color: white;
}

.active2{
    background-color: rgb(219, 222, 225);
            color: rgb(134, 136, 138);
}


.login_top {
        position: relative;
        background-color: white;
        width: 350px;
        height: 18%;
        top: 20vh;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        
        a {
            
            border-top-right-radius: 10px;
            width: 50%;
            height:100%;
            display: flex;
            justify-content: center;
            align-items: center;
                        
        }

        label {
            border-top-left-radius: 10px;
            width: 50%;
            height:100%;
            display: flex;
            justify-content: center;
            align-items: center;
            

        }
    }

.erweima_else{
    position: relative;
    height: 300px;
    width: 350px;
    top: 20vh;
    background-color: white;
    padding-top:5px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    img{
        width: 150px;
        height: 150px;
        
    }
}

.login_form {

    position: relative;
    height: 300px;
    width: 350px;
    top: 20vh;
    background-color: white;
    padding-left:20px;
    padding-right:20px;
    padding-top:20px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

   

    .input_input{
        height: 120%;
        border-radius:15px;
    }

    .item_form {
        margin-top: 10px;
        
        margin-bottom: 30px;  
       

    }

    .el-el-input__wrapper {
        

    }

    


    h1 {
        color: rgba(15, 15, 16, 0.36);
        font-size: 40px;
    }

    h2 {
        color: rgba(23, 24, 25, 0.36);
        font-size: 20px;
        margin: 20px 0px;
    }

    .login_btn {
        width: 100%;
        background: linear-gradient(to right, #0a8aeb, #66aae9);
        color: white;
        border: none;
        height: 150%;
        border-radius: 10px;
    }
    .wangji_password{
        margin: 30px 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        div{
            margin-right:76px;
        }
    }
    a{
        text-decoration: none;
    }
    .last_frg{
        display: flex;
        justify-content: center;
        align-items: center;
        color: #0a8aeb;
    }

}
</style>