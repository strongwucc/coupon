<template>
  <div class="order-page">
    <div class="coupon-info">
      <div class="title">兑换信息</div>
      <div class="info">
        <div class="label">券号</div>
        <div class="content">{{couponInfo.code}}</div>
      </div>
      <div class="info">
        <div class="label">礼品名称</div>
        <div class="content">{{couponInfo.gift}}</div>
      </div>
      <div class="info">
        <div class="label">兑换时间</div>
        <div class="content">{{couponInfo.date_time|toDate(4)}}</div>
      </div>
    </div>
    <div class="register-info">
      <div class="title">个人信息</div>
      <div class="info">
        <div class="label">姓名</div>
        <div class="content">{{userInfo.name}}</div>
      </div>
      <div class="info">
        <div class="label">手机号</div>
        <div class="content">{{userInfo.mobile}}</div>
      </div>
      <div class="info" v-if="deliveryInfo.delivery_method === '1'">
        <div class="label">地址</div>
        <div class="content">{{userInfo.addr}}</div>
      </div>
    </div>
    <div class="delivery-info">
      <div class="title">物流状态</div>
      <div class="info">
        <div class="label">领取方式</div>
        <div class="content">
          <template v-if="deliveryInfo.delivery_method === '0'">自提</template>
          <template v-if="deliveryInfo.delivery_method === '1'">配送</template>
        </div>
      </div>
      <div class="info">
        <div class="label">配送状态</div>
        <div class="content">
          <template v-if="deliveryInfo.ship_status === '0'">
            <template v-if="deliveryInfo.delivery_method === '0'">未提取</template>
            <template v-else>未配送</template>
          </template>
          <template v-if="deliveryInfo.ship_status === '1'">
            <template v-if="deliveryInfo.delivery_method === '0'">已提取</template>
            <template v-else>已配送</template>
          </template>
        </div>
      </div>
      <div class="info" v-if="deliveryInfo.delivery_method === '1' && deliveryInfo.ship_status === '1'">
        <div class="label">物流名称</div>
        <div class="content">{{deliveryInfo.ship_name}}</div>
      </div>
      <div class="info" v-if="deliveryInfo.delivery_method === '1' && deliveryInfo.ship_status === '1'">
        <div class="label">运单号</div>
        <div class="content">{{deliveryInfo.logi_no}}</div>
        <div class="action copy-btn" ref="copy" :data-clipboard-text="deliveryInfo.logi_no" @click.stop="copyLink">复制</div>
      </div>
    </div>
    <div class="contact" @click.stop="contact">
      <img class="icon" src="../assets/img/receive/icon-contact@2x.png" />
      <span class="txt">联系客服</span>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
export default {
  name: 'order',
  components: {},
  inject: ['reload'], // 引入方法
  data () {
    return {
      itemId: '',
      couponInfo: {},
      userInfo: {},
      deliveryInfo: {},
      copyElement: null
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    if (this.$route.params.itemId) {
      this.itemId = this.$route.params.itemId
      this.$http.post(this.API.orderDetail, {item_id: this.itemId}).then(res => {
        if (res.status === '0000') {
          this.couponInfo = res.data.coupon_info
          this.userInfo = res.data.user_info
          this.deliveryInfo = res.data.delivery_info
        }
      })
    }
  },
  mounted () {
    // this.copyElement = new Clipboard(this.$refs.copy)
  },
  destroyed () {
  },
  methods: {
    copyLink () {
      let _this = this
      _this.$nextTick(() => {
        _this.copyElement = new Clipboard(_this.$refs.copy)
        _this.copyElement.on('success', function () {
          _this.$vux.toast.show({
            type: 'text',
            text: '<span style="font-size: 14px">复制成功！</span>',
            width: '172px',
            position: 'middle'
          })
        })
        _this.copyElement.on('error', function () {
          _this.$vux.toast.show({
            type: 'text',
            text: '<span style="font-size: 14px">复制失败！</span>',
            width: '172px',
            position: 'middle'
          })
        })
      })
    },
    contact () {
      window.location.href = 'tel://400-872-5559'
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
  .order-page {
    height: 100%;
    background:rgba(255,255,255,1);
    .coupon-info, .register-info, .delivery-info {
      padding: 15px 17px 0;
      .title {
        height:22px;
        font-size:16px;
        font-weight:400;
        line-height:22px;
        text-align: left;
        margin-bottom: 20px;
        color:rgba(51,51,51,1);
      }
      .info {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 8px;
        .label {
          width: 78px;
          height:17px;
          font-size:14px;
          font-weight:400;
          line-height:17px;
          color:rgba(153,153,153,1);
          text-align: left;
          /*margin-right: 30px;*/
        }
        .content {
          height:18px;
          font-size: 14px;
          font-weight:400;
          line-height:18px;
          color:rgba(51,51,51,1);
          width: 235px;
          text-align: left;
        }
        .action {
          /*width:24px;*/
          height:17px;
          font-size:12px;
          font-weight:400;
          line-height:17px;
          color:rgba(254,68,21,1);
        }
      }
    }
    .coupon-info:after, .register-info:after {
      content: '';
      display: block;
      width:341px;
      height:1px;
      background-color: rgba(240,240,240,1);
      margin-top: 15px;
    }
    .contact {
      position: fixed;
      bottom: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      height:50px;
      background:rgba(246,246,246,1);
      box-shadow:0px -2px 6px rgba(0,0,0,0.08);
      img {
        width: 24px;
        height: 24px;
      }
      .txt {
        height:14px;
        font-size:10px;
        font-weight:400;
        line-height:14px;
        color:rgba(102,102,102,1);
      }
    }
  }
</style>
