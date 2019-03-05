import Vue from 'vue'
import Router from 'vue-router'

const Coupon = r => require.ensure([], () => r(require('@/page/coupon')), 'coupon') // 电子券详情

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/coupon'
    },

    {
      path: '/coupon',
      name: 'coupon',
      component: Coupon,
      meta: {
        auth: 0,
        title: '从禾礼品兑换'
      }
    }
  ]
})
