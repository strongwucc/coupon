<template>
  <div class="coupon-page">
    hello
  </div>
</template>

<script>
export default {
  name: 'coupon',
  components: {},
  inject: ['reload'], // 引入方法
  data () {
    return {
      couponId: ''
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
  },
  mounted () {
  },
  destroyed () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
  @import "../assets/css/common";
  @keyframes myopacity
  {
    from {opacity:1;}
    to {opacity:0;}
  }

  /*Safari 和 Chrome:*/
  @-webkit-keyframes myopacity
  {
    from {opacity:1;}
    to {opacity:0;}
  }
  .coupon-page {
    height: 100%;
  }
</style>
