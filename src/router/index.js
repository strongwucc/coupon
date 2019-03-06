import Vue from 'vue'
import Router from 'vue-router'

const Receive = r => require.ensure([], () => r(require('@/page/receive')), 'receive') // 电子券详情
const Register = r => require.ensure([], () => r(require('@/page/register')), 'register') // 兑换人登记

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/receive/:itemId'
    },

    {
      path: '/receive/:itemId',
      name: 'receive',
      component: Receive,
      meta: {
        auth: 0,
        title: '从禾礼品兑换'
      }
    },

    {
      path: '/register/:itemId/:gift',
      name: 'register',
      component: Register,
      meta: {
        auth: 0,
        title: '兑换信息录入'
      }
    }
  ]
})
