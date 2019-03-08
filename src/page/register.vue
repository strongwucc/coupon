<template>
  <div class="register-page">
    <div class="coupon-image">
      <img :src="info.ticket_image"/>
    </div>
    <div class="register-form">
      <div class="title">
        <div class="txt">礼品名称</div>
        <div class="content">{{gift}}</div>
      </div>
      <div class="owner_name">
        <div class="label">姓名</div>
        <div class="input"><input v-model="owner_name"/></div>
      </div>
      <div class="owner_mobile">
        <div class="label">手机号</div>
        <div class="input"><input type="tel" v-model="owner_mobile"/></div>
      </div>
      <div class="delivery_method">
        <div class="label">领取方式</div>
        <div class="input" @click.stop="showMethods">
          <span v-if="delivery_method === 0">自提</span>
          <span v-else>配送</span>
          <img src="../assets/img/receive/icon-xiala@2x.png"/>
        </div>
      </div>
      <div class="addr" v-show="delivery_method === 1">
        <div class="label">配送地址</div>
        <div class="input"><input v-model="addr"/></div>
      </div>
      <div class="mark_text">
        <div class="label">备注</div>
        <div class="input"><input v-model="mark_text"/></div>
      </div>
      <div class="button" @click.stop="register">
        提交
      </div>
    </div>
    <div class="mask" v-show="methodVisible" @touchmove.prevent @click.stop="hideMethods"></div>
    <transition name="slide">
      <div class="pop-methods" v-show="methodVisible" @touchmove.prevent>
        <div class="head-title">
          <div class="txt">选择领取方式</div>
          <div class="close" @click.stop="hideMethods"><img src="../assets/img/receive/icon-close@2x.png"/></div>
        </div>
        <div class="list">
          <div class="item" :class="{active: delivery_method === 0}" @click.stop="checkMethod(0)">自提</div>
          <div class="item" :class="{active: delivery_method === 1}" @click.stop="checkMethod(1)">配送</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {PopupPicker} from 'vux'
import Valid from '../utils/valid'
export default {
  name: 'register',
  components: {PopupPicker},
  inject: ['reload'], // 引入方法
  data () {
    return {
      itemId: '',
      info: {
      },
      gift: '',
      owner_name: '',
      owner_mobile: '',
      delivery_method: 0,
      addr: '',
      mark_text: '',
      methodVisible: false,
      loading: false
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    if (this.$route.params.itemId && this.$route.params.gift) {
      this.itemId = this.$route.params.itemId
      this.gift = this.$route.params.gift
      this.$http.post(this.API.receiveCheck, {item_id: this.itemId, gift: this.gift}).then(res => {
        if (res.status === '0000') {
          this.info = res.data.ticket
        } else if (res.status === '4003') {
          this.$router.push({name: 'receive', params: {itemId: this.itemId}})
        } else {
          this.$vux.toast.show({
            type: 'text',
            text: res.msg,
            width: '200px',
            position: 'middle'
          })
          return false
        }
      })
    } else {
      this.$vux.toast.show({
        type: 'text',
        text: '礼品不存在',
        width: '200px',
        position: 'middle'
      })
      return false
    }
  },
  mounted () {
  },
  destroyed () {
  },
  methods: {
    hideMethods: function () {
      this.methodVisible = false
    },
    showMethods: function () {
      this.methodVisible = true
    },
    checkMethod: function (deliveryMethod) {
      this.delivery_method = deliveryMethod
      this.hideMethods()
    },
    register: function () {
      if (this.owner_name === '') {
        this.$vux.toast.show({
          type: 'text',
          text: '请输入姓名',
          width: '200px',
          position: 'middle'
        })
        return false
      }

      if (Valid.check_mobile(this.owner_mobile) === false) {
        this.$vux.toast.show({
          type: 'text',
          text: '手机号格式不正确',
          width: '200px',
          position: 'middle'
        })
        return false
      }

      if (this.delivery_method === 1 && this.addr === '') {
        this.$vux.toast.show({
          type: 'text',
          text: '请输入配送地址',
          width: '200px',
          position: 'middle'
        })
        return false
      }

      if (this.loading) {
        return false
      }

      let postData = {
        item_id: this.itemId,
        owner_name: this.owner_name,
        owner_mobile: this.owner_mobile,
        delivery_method: this.delivery_method,
        addr: this.addr,
        mark_text: this.mark_text,
        gift: this.gift
      }

      this.loading = true

      this.$vux.loading.show()

      this.$http.post(this.API.couponReceive, postData).then(res => {
        this.$vux.loading.hide()
        this.loading = false
        if (res.status === '0000') {
          this.$router.push({name: 'success', params: {itemId: this.itemId}})
          // this.$vux.toast.show({
          //   type: 'text',
          //   text: '恭喜您，兑换成功',
          //   width: '200px',
          //   position: 'middle'
          // })
          // let vm = this
          // setTimeout(() => {
          //   vm.$router.push({name: 'success', params: {itemId: this.itemId}})
          // }, 2000)
        } else {
          this.$vux.toast.show({
            type: 'text',
            text: res.msg,
            width: '200px',
            position: 'middle'
          })
          return false
        }
      })
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
  .register-page {
    height: 100%;
    background:rgba(255,255,255,1);
    .coupon-image {
      height: 194px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .register-form {
      margin-top: 10px;
      background:rgba(255,255,255,1);
      padding: 18px 17px;
      .title, .owner_name, .owner_mobile, .delivery_method, .addr, .mark_text {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 30px;
        .label {
          height:20px;
          font-size:14px;
          font-weight:500;
          line-height:20px;
          color:rgba(102,102,102,1);
        }
        .input {
          width: 271px;
          height: 40px;
          border:1px solid rgba(204,204,204,1);
          border-radius:4px;
          display: flex;
          padding-left: 16px;
          input {
            width: 251px;
            height: 100%;
            font-size:14px;
            font-weight:500;
            line-height:20px;
            color:rgba(51,51,51,1);
          }
        }
      }
      .delivery_method {
        .input {
          width: 271px;
          height: 40px;
          border:1px solid rgba(204,204,204,1);
          border-radius:4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-right: 10px;
          padding-left: 16px;
          span {
            height:20px;
            font-size:14px;
            font-weight:500;
            line-height:20px;
            color:rgba(51,51,51,1);
          }
          img {
            width: 24px;
            height: 24px;
          }
        }
      }
      .title {
        height:25px;
        font-size:18px;
        font-weight: bold;
        line-height:25px;
        color:rgba(51,51,51,1);
        justify-content: flex-start;
        margin-top: 0;
        .txt {
          margin-right: 12px;
        }
      }
      .button {
        margin-top: 51px;
        width: 341px;
        height: 50px;
        border-radius: 25px;
        background-color: #638940;
        line-height: 50px;
        font-size:14px;
        font-weight:400;
        color:rgba(255,255,255,1);
      }
    }
    .pop-methods {
      background:rgba(255,255,255,1);
      border-radius:4px 4px 0px 0px;
      position: fixed;
      z-index: 999;
      width: 100%;
      bottom: 0;
      .head-title {
        padding: 10px 10px 0 17px;
        display: flex;
        justify-content: space-between;
        .txt {
          height:20px;
          font-size:14px;
          font-weight:600;
          line-height:20px;
          color:rgba(102,102,102,1);
          margin-top: 15px;
        }
        .close {
          width: 24px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          img {
            height: 100%;
          }
        }
      }
      .list {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 17px;
        flex-wrap: wrap;
        .item {
          width:86px;
          height:28px;
          background:rgba(246,246,246,1);
          border-radius:14px;
          font-size:14px;
          font-weight:600;
          line-height:28px;
          color:rgba(51,51,51,1);
          margin: 17px 0 0 17px;
        }
        .active {
          background:rgba(124,162,89,0.2);
          border:1px solid rgba(99,137,64,1);
          color:rgba(99,137,64,1);
        }
      }
    }
    .mask {
      position: fixed;
      z-index: 99;
      width: 100%;
      top: 0;
      bottom: 0;
      background:rgba(0,0,0,1);
      opacity:0.5;
    }
  }
</style>
