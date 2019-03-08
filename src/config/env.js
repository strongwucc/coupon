/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */
let rootUrl = ''
let baseUrl = ''
let oauthUrl = 'http://wxgw.yklsh.etonepay.com/authorize?etone_id=yt6eb45ebc33750e02&scope=snsapi_base&state=STATE'
let baseRedirectUrl = 'http://' + window.location.host + '/#'

if (process.env.NODE_ENV === 'development') {
  rootUrl = 'http://47.107.36.169'
  baseUrl = rootUrl + '/conghe/'
  baseRedirectUrl = 'http://' + window.location.host + '/#'
} else if (process.env.NODE_ENV === 'production') {
  rootUrl = 'http://' + window.location.host
  baseUrl = rootUrl + '/conghe/'
  baseRedirectUrl = 'http://' + window.location.host + '/coupon/#'
}

export {
  rootUrl,
  baseUrl,
  oauthUrl,
  baseRedirectUrl
}
