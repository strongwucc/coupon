<template>
  <div class="success-page">
    <div class="msg">恭喜您 兑换成功</div>
    <div class="logo"><img src="../assets/img/success/iamge-chenggong@2x.png"/></div>
    <div class="review" @click.stop="review">查看订单</div>
    <div class="home" @click.stop="home">返回首页</div>
  </div>
</template>

<script>
export default {
  name: 'success',
  components: {},
  inject: ['reload'], // 引入方法
  data () {
    return {
      itemId: ''
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    if (this.$route.params.itemId) {
      this.itemId = this.$route.params.itemId
    }
  },
  mounted () {

  },
  destroyed () {
  },
  methods: {
    review: function () {
      this.$router.push({name: 'order', params: {itemId: this.itemId}})
    },
    home: function () {
      this.$router.push({name: 'receive', params: {itemId: this.itemId}})
    }
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
  .success-page {
    height: 100%;
    background:rgba(255,255,255,1);
    .msg {
      padding-top: 50px;
      height:33px;
      font-size:24px;
      font-weight:500;
      line-height:33px;
      color:rgba(254,185,4,1);
    }
    .logo {
      margin-top: 39px;
      img {
        width: 315px;
        height: 179px;
      }
    }
    .review, .home {
      width: 200px;
      height: 50px;
      border-radius: 25px;
      line-height: 50px;
      font-size:14px;
      font-weight:400;
    }
    .review {
      margin: 61px auto 0;
      background-color: #638940;
      color:rgba(255,255,255,1);
    }
    .home {
      margin: 30px auto 0;
      border:1px solid rgba(99,137,64,1);
      color:rgba(99,137,64,1);
    }
  }
</style>
