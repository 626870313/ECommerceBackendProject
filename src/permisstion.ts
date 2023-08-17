import router from "@/router";
import nprogress from 'nprogress'
import "nprogress/nprogress.css"
import setting from "./setting";
nprogress.configure({showSpinner:false})
import useUserStore from "./store/modules/user";
import pinia from "./store";
let useStore = useUserStore(pinia)

router.beforeEach(async (to: any, from: any, next: any) => {
    document.title =`${setting.title}- ${to.meta.title}`
    nprogress.start()
    let token = useStore.token
    let username = useStore.username
    console.log('路由守卫',token)
    if(token){
        if(to.path=='/login'){
            next({path:'/'})
        }else{
            if(username){
                next()
            }else{
                try {
                    await useStore.userInfo()
                    next()
                } catch (error) {
                    useStore.userLogout()
                    next({path:'/login',query:{redirect:to.path}})
                }
                
            }
        }
    }else{
        if(to.path=='/login'){
            next()
        }else{
            next({path:'/login',query:{redirect:to.path}})
        }
    }
    // next()
})


router.afterEach((to: any, from: any)=>{
    nprogress.done()

})