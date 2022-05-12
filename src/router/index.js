//路由相关模块还有规则
import Vue from "vue";
import VueRouter from 'vue-router'
import Layout from "@/views/Layout"
import Home from '@/views/Home'
import Search from '@/views/Search'
import Play from "@/views/Play"
Vue.use(VueRouter)
const routes = [
    {
        path:'/',
        redirect: '/layout' //这一步干啥的我咋不知道呢 重定向到layout
    },
    { path: '/layout',
     component: Layout,
     redirect:'/layout/home',
     children:[
         {
             path:'home',
             component: Home,
             meta: { title:'首页' } //保存路由对象额外信息的地方 meta
         },
         {
            path:'search',
            component: Search,
            meta: { title:'搜索' }
         }
     ]
    },
    { path: '/play',
     component: Play 
    },

]
const router = new VueRouter({
    routes
})
export default router