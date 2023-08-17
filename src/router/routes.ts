export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',
        meta:{
            title:'登录',
            hidden:true
        }
    },
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'layout',
        redirect:'/home',
        meta:{
            title:'',
            hidden:true
        },
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                meta:{
                    title:'首页',
                    hidden:true
                },
                
            } 
        ]
    },
    {
        path:'/fly',
        component:()=>import('@/layout/index.vue'),
        name:'Fly',
        meta:{
            title:'',
            hidden:false,

        },
        redirect:'/fly/file',
        children:[
            {
                path: '/fly/file',
                component: () => import('@/views/fly/file/index.vue'),
                name: 'File',
                meta:{
                    title:'文件',
                    hidden:false,
                    icon:'MessageBox'
                }
            },
            {
                path: '/fly/subscribeto',
                component: () => import('@/views/fly/subscribeto/index.vue'),
                name: 'Subscribeto',
                meta:{
                    title:'订阅',
                    hidden:false,         
                    icon:'Bell'
                }
            },
            {
                path: '/fly/album',
                component: () => import('@/views/fly/album/index.vue'),
                name: 'Album',
                meta:{
                    title:'相册',
                    hidden:false,
                    icon:'Grid'
                }
            },
            {
                path: '/fly/favorites',
                component: () => import('@/views/fly/favorites/index.vue'),
                name: 'Favorites',
                meta:{
                    title:'收藏夹',
                    hidden:false,
                    icon:'StarFilled'
                }
            },
            {
                path: '/fly/safe',
                component: () => import('@/views/fly/safe/index.vue'),
                name: 'Safe',
                meta:{
                    title:'保险柜',
                    hidden:false,
                    icon:'Notification'
                }
            },
            
            {
                path: '/fly/recyclebin',
                component: () => import('@/views/fly/recyclebin/index.vue'),
                name: 'Recyclebin',
                meta:{
                    title:'回收站',
                    hidden:false,
                    icon:'Delete'
                }
            },
        ]
    },
   
    
    

    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta:{
            title:'404',
            hidden:true
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',
        meta:{
            title:'任意',
            hidden:true
        }
    },
]