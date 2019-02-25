import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children:[
        {
          path:'/page1',
          component: resolve => require(['../components/common/pages/page1.vue'], resolve)
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: resolve => require(['../components/common/About.vue'], resolve)
    },
    {
      path: '/contact',
      name: 'contact',
      component: resolve => require(['../components/common/Contact.vue'], resolve)
    }
  ]
})
