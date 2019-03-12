<template>
  <div class="receive-page">
    <div class="coupon-image">
      <img :src="info.ticket_image"/>
    </div>
    <div class="base-info">
      <div class="title">
        <div class="coupon-name">{{info.ticket_name}}</div>
        <div class="coupon-status" v-if="info.status !== '0'">已兑换</div>
      </div>
      <div class="period-validity">
        <div class="label">时间</div>
        <div class="content">{{info.time_begin}} - {{info.time_end}}</div>
      </div>
      <div class="explain-area" v-if="info.ticket_intro || info.pick_intro">
        <div class="label">说明</div>
        <div class="column" @click.stop="showExplains">
          <div class="content act-explain" v-if="info.ticket_intro">
            <img class="icon" src="../assets/img/receive/icon-biaoqian@2x.png"/>
            <span class="txt">活动说明</span>
          </div>
          <div class="content rec-explain" v-if="info.pick_intro">
            <img class="icon" src="../assets/img/receive/icon-biaoqian@2x.png"/>
            <span class="txt">自提说明</span>
          </div>
        </div>
        <div class="more" @click.stop="showExplains"><img src="../assets/img/receive/icon-more@2x.png"/></div>
      </div>
    </div>
    <div class="gifts" v-if="info.status === '0' && info.gifts.length > 0">
      <div class="label">已选</div>
      <div class="content" v-if="gift" @click.stop="showGifts('确定', false)">{{gift}}</div>
      <div class="content" v-else @click.stop="showGifts('确定', false)">请选择</div>
      <div class="more" @click.stop="showGifts('确定', false)"><img src="../assets/img/receive/icon-more@2x.png"/></div>
    </div>
    <div class="coupon-detail">
      <div class="title">
        <span> >> </span>
        <span>活动详情</span>
        <span> << </span>
      </div>
      <div class="content" v-html="info.ticket_detail"></div>
    </div>
    <div class="padding-area"></div>
    <div class="action-area">
      <div class="contact" @click.stop="contact">
        <img class="icon" src="../assets/img/receive/icon-contact@2x.png"/>
        <span class="txt">联系客服</span>
      </div>
      <div class="button" v-if="info.status === '0'" @click.stop="receive">
        立即兑换
      </div>
      <div class="button" v-else-if="info.order_id" @click.stop="review">
        查看订单
      </div>
    </div>
    <div class="mask" v-show="explainVisible || giftVisible" @touchmove.prevent @click.stop="explainVisible=false;giftVisible=false"></div>
    <transition name="slide">
      <div class="pop-explains" v-show="explainVisible" @touchmove.prevent>
        <div class="head-title">
          <div class="txt">说明</div>
          <div class="close" @click.stop="hideExplains"><img src="../assets/img/receive/icon-close@2x.png"/></div>
        </div>
        <div class="act" v-if="info.ticket_intro">
          <div class="left"><img src="../assets/img/receive/icon-biaoqian@2x.png"/></div>
          <div class="right">
            <div class="title">活动说明</div>
            <div class="content" v-html="info.ticket_intro"></div>
          </div>
        </div>
        <div class="rec" v-if="info.pick_intro">
          <div class="left"><img src="../assets/img/receive/icon-biaoqian@2x.png"/></div>
          <div class="right">
            <div class="title">自提说明</div>
            <div class="content" v-html="info.pick_intro"></div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <div class="pop-gifts" v-show="giftVisible" @touchmove.prevent>
        <div class="head-title">
          <div class="txt">选择商品</div>
          <div class="close" @click.stop="hideGifts"><img src="../assets/img/receive/icon-close@2x.png"/></div>
        </div>
        <div class="list">
          <div class="item" :class="{active: item === gift}" v-for="(item, itemIndex) in info.gifts" :key="itemIndex" @click.stop="checkGift(item)">{{item}}</div>
        </div>
        <div class="confirm-btn" @click.stop="confirmGift">{{giftButtonTxt}}</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'receive',
  components: {},
  inject: ['reload'], // 引入方法
  data () {
    return {
      itemId: '',
      info: {
        gifts: []
      },
      gift: '',
      explainVisible: false,
      giftVisible: false,
      giftButtonTxt: '确定',
      giftChecked: false
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    if (this.$route.params.itemId) {
      this.itemId = this.$route.params.itemId
      this.$http.post(this.API.couponInfo, {item_id: this.itemId}).then(res => {
        if (res.status === '0000') {
          this.info = res.data.ticket
          if (this.info.gifts.length > 0) {
            this.gift = this.info.gifts[0]
          }
        }
      })
    }
  },
  mounted () {

  },
  destroyed () {
  },
  methods: {
    showExplains: function () {
      this.explainVisible = true
    },
    hideExplains: function () {
      this.explainVisible = false
    },
    showGifts: function (txt, checked) {
      this.giftButtonTxt = txt
      this.giftVisible = true
      this.giftChecked = checked
    },
    hideGifts: function () {
      this.giftVisible = false
    },
    checkGift: function (gift) {
      this.gift = gift
    },
    receive: function () {
      if (this.info.gifts.length > 0) {
        this.showGifts('确认兑换', true)
        return false
      }
      this.$router.push({name: 'register', params: {itemId: this.itemId, gift: this.gift}})
    },
    confirmGift: function () {
      this.giftVisible = false
      if (this.giftChecked) {
        this.$router.push({name: 'register', params: {itemId: this.itemId, gift: this.gift}})
      }
    },
    review: function () {
      this.$router.push({name: 'order', params: {itemId: this.itemId}})
    },
    contact () {
      window.location.href = 'tel://400-872-5559'
    }
  }
}
</script>

<style lang="less">
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
  .receive-page {
    height: 100%;
    background:rgba(246,246,246,1);
    .coupon-image {
      height: 194px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .base-info {
      background:rgba(255,255,255,1);
      height: 114px;
      padding: 16px 13px 11px 15px;
      .title {
        display: flex;
        justify-content: space-between;
        .coupon-name {
          height: 24px;
          width: 292px;
          font-size:17px;
          font-weight:bold;
          line-height:24px;
          color:rgba(51,51,51,1);
          text-align: left;
          overflow: hidden;
        }
        .coupon-status {
          width:55px;
          height:24px;
          background:rgba(240,240,240,1);
          border-radius:20px;
          font-size:10px;
          line-height:24px;
          color:rgba(102,102,102,1);
        }
      }
      .label {
        height:17px;
        font-size:12px;
        font-weight:400;
        line-height:17px;
        color:rgba(153,153,153,1);
      }
      .period-validity, .explain-area {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .content {
          height:18px;
          font-size:13px;
          font-weight:400;
          line-height:18px;
          color:rgba(51,51,51,1);
        }
      }
      .period-validity {
        margin-top: 12px;
        .label {
          margin-right: 26px;
        }
      }
      .explain-area {
        justify-content: space-between;
        .label {
          /*margin-right: 21px;*/
          width: 45px;
          text-align: left;
        }
        margin-top: 10px;
        .column {
          display: flex;
          justify-content: flex-start;
          width: 278px;
          .content {
            margin-right: 14px;
            width: 81px;
            height: 24px;
            display: flex;
            align-items: center;
            .icon {
              width: 24px;
              height: 24px;
            }
          }
        }
        .more {
          height: 24px;
          width: 24px;
          text-align: center;
          line-height: 24px;
          img {
            height: 100%;
          }
        }
      }
    }
    .gifts {
      background:rgba(255,255,255,1);
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 17px 13px 17px 15px;
      .label {
        height:17px;
        font-size:12px;
        font-weight:400;
        line-height:17px;
        color:rgba(153,153,153,1);
        /*margin-right: 26px;*/
        width: 50px;
        text-align: left;
      }
      .content {
        width: 273px;
        text-align: left;
        height:20px;
        font-size:14px;
        font-weight:400;
        line-height:20px;
        color:rgba(51,51,51,1);
      }
      .more {
        height: 24px;
        width: 24px;
        text-align: center;
        line-height: 24px;
        img {
          height: 100%;
        }
      }
    }
    .coupon-detail {
      background:rgba(246,246,246,1);
      .title {
        margin: 15px;
        height:18px;
        font-size:13px;
        font-weight:400;
        line-height:18px;
        color:rgba(153,153,153,1);
      }
      .content {
        img {
          width: 100%;
        }
      }
    }
    .padding-area {
      height: 51px;
    }
    .action-area {
      display: flex;
      height: 51px;
      position: fixed;
      bottom: 0;
      width: 100%;
      .contact {
        background-color: #F6F6F6;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 120px;
        .icon {
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
      .button {
        background-color: #638940;
        width: 255px;
        font-size:14px;
        font-weight:400;
        line-height:51px;
        color:rgba(255,255,255,1);
      }
    }
    .pop-explains, .pop-gifts {
      background:rgba(255,255,255,1);
      border-radius:4px 4px 0px 0px;
      position: fixed;
      z-index: 999;
      width: 100%;
      bottom: 0;
      .head-title {
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
    }
    .pop-explains {
      padding: 17px 17px 17px 15px;
      .head-title {
        height: 24px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .txt {
          height:20px;
          font-size:14px;
          font-weight:bold;
          line-height:20px;
          color:rgba(102,102,102,1);
          margin-right: 132px;
        }
      }
      .act, .rec {
        display: flex;
        margin-top: 23px;
        .left {
          width: 24px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          margin-right: 7px;
          img {
            height: 100%;
          }
        }
        .right {
          .title {
            height:20px;
            font-size:14px;
            font-weight:400;
            line-height:20px;
            color:rgba(51,51,51,1);
            text-align: left;
          }
          .content {
            margin-top: 5px;
            text-align: left;
            line-height: 18px;
            font-size:13px;
            font-weight:300;
            color:rgba(153,153,153,1);
          }
        }
      }
    }
    .pop-gifts {
      .head-title {
        padding: 10px 10px 0 17px;
        display: flex;
        justify-content: space-between;
        .txt {
          height:20px;
          font-size:14px;
          font-weight:400;
          line-height:20px;
          color:rgba(102,102,102,1);
          margin-top: 15px;
        }
      }
      .list {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 40px;
        flex-wrap: wrap;
        .item {
          width:86px;
          height:28px;
          background:rgba(246,246,246,1);
          border-radius:14px;
          font-size:14px;
          font-weight:400;
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
      .confirm-btn {
        height: 51px;
        background-color: #638940;
        font-size:14px;
        font-weight:400;
        line-height:51px;
        color:rgba(255,255,255,1);
      }
    }
    .slide-enter-active, .slide-leave-active {
      transition: transform .3s ease;
      transform: translateY(0);
    }
    .slide-enter, .slide-leave-active {
      transform: translateY(100%);
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
