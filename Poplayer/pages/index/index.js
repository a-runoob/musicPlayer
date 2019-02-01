//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    coverImg:"../../resource/imgs/cimg2.jpg",
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    btnBottom:"-100rpx",
    iconTop:"-250rpx"
  },
  //事件处理函数
  // 前往播放页面
  toPlay: function(){
    wx.navigateTo({
      url: '../play/play'
    })
  },
  //小程序声明周期监听函数
  //页面开始加载的时候
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success(res) {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  //页面加载成功的时候
  onShow:function(){
    // let 是 ES 中声明 块级（一对 大括号 ）变量的关键字
    let self = this;
    // setTimeout 是一个计时器，作用就是在 指定时间后触发 传入的回调函数
    setTimeout(function(){
      // setData 是小程序在js中控制前台刷新的关键，只要在里面更改了 已经绑定过的数据，
      // 页面上的表现就会跟着 刷新
      self.setData({ 
        btnBottom: "100rpx",
        iconTop: "200rpx"
      });
    }, 1000);
  },
  bindgetUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    // 微信网络请求，默认使用get进行异步请求
    wx.request({
      // url是请求的 API 地址
      url: 'http://127.0.0.1:8000/profile/adduser', 
      // 请求的数据，从请求页面传出去的参数
      data: {
        nick: e.detail.userInfo.nickName,
        icon: e.detail.userInfo.avatarUrl
      },
      // 默认值,表示传输的数据为json格式
      header: {
        'content-type': 'application/json'
      },
      // 请求成功时的逻辑处理，返回的数据就在回调函数的 参数 res 里
      success(res) {
        console.log(res)
        if(res.errMsg == "request:ok"){
          console.log("serve linking.....")
          console.log(res.data.msg)
        }
      }
    })
  },
  bindadduser:function(e){
    // 微信网络请求，默认使用get进行异步请求
    wx.request({
      // url是请求的 API 地址
      url: 'http://127.0.0.1:8000/profile/adduser',
      // 请求的数据，从请求页面传出去的参数
      data: {
        nick:"ssssfsf",
        icon:'ss'
      },
      // 默认值,表示传输的数据为json格式
      header: {
        'content-type': 'application/json'
      },
      // 请求成功时的逻辑处理，返回的数据就在回调函数的 参数 res 里
      success(res) {
        console.log(res)
        if (res.errMsg == "request:ok") {
          console.log("serve linking.....")
          console.log(res.data.msg)
        }
      }
    })
  }
})