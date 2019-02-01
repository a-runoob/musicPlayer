// pages/like.js

const app = getApp()

Page({
  collect:[],
  /**
   * 页面的初始数据
   */
  data: {
    nosong:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that=this;
     wx.request({
        url:'http://127.0.0.1:8000/profile/collect/',
        data:{},
        header:{'content-type':'application/json'},
        success(res){
          if(res.errMsg=='request:ok'){
            let id=0;
            console.log('从服务器获取到的该用户收藏的歌曲数量：'+res.data.collect.length);
            for (var i = 0; i < res.data.collect.length;i++){
              try {
                that.collect.push({
                  songName: res.data.collect[i].songName,
                  wxNick:res.data.collect[i].wxNick
                });
              } catch (err) {
                continue;
              }
            }
           that.setData({
              collect:that.collect
           });
          }
          // console.log(that.collect[0].songName);
        },
       
        fail:function(e){
          console.log(e)
        },
        complete:function(e){
          console.log(e)
        }
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //手动收藏

    console.log(app.globalData.likeSongs);
    this.setData({
      songs:app.globalData.likeSongs
    })
    console.log("收藏歌曲数量:" + this.data.songs.length);
    if(this.data.songs.length==0){
      this.setData({
        nosong:true
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  playLike: function(e){
    console.log("歌曲id:" + e.target.id);
    app.globalData.likeID = Number(e.target.id);
    wx.navigateBack({
      delta:1  //返回上一页
    })
  }
})