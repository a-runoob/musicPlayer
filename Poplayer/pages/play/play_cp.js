const app = getApp()

Page({
  // 默认曲目
  index:0,
  // 歌曲列表
  songs:[],
  // 需要渲染的数据
  data:{},
  // 喜欢按钮点击事件
  audioLike: function(e) {
    // 把当前播放歌曲的 like 属性 改成 true，表示收藏成功
    this.songs[this.index].like = true;
    // 同时刷新页面
    this.setData({ like: true });
    // 把喜欢的歌曲列表放入 app对象的 全局数据
    if (!app.globalData.likeSongs.includes(this.songs[this.index])){
      app.globalData.likeSongs.push(this.songs[this.index]);
    }
  },
  // 音频开始播放监听事件
  audioPlayed: function (e) {
    console.log('audio is played')
  },
  // 音频进度更新监听事件
  audioTimeUpdated: function (e) {
    this.duration = e.detail.duration;
  },
  // timeSliderChanged: function (e) {
  //   if (!this.duration)
  //     return;
  //   var time = this.duration * e.detail.value / 100;
  //   this.setData({
  //     audioAction: {
  //       method: 'setCurrentTime',
  //       data: time
  //     }
  //   });
  // },
  // 播放事件
  playAudio: function () {
    this.setData({
      audioAction: {
        method: 'play'
      }
    });
  },
  // 暂停事件
  pauseAudio: function () {
    this.setData({
      audioAction: {
        method: 'pause'
      }
    });
  },


  // 上一首
  prevSong: function () {
    // 上一首就是对 默认曲目 序号 进行自减操作
    this.index--;
    // 到0的时候要判断是否 是第一首
    if (this.index < 0) {
      this.index = this.songs.length-1;
    }
    // this.setData({
    //   songUrl: path + "/song/华晨宇 - 齐天大圣.mp3",
    // }); 
    this.setData(this.songs[this.index]);
    let self = this;
    setTimeout(function () {
      self.setData({
        audioAction: {
          method: 'play'
        }
      })
    }, 200);
  },
  // 下一首
  nextSong: function(){
    // 下一首的逻辑跟上一首是一样的
    this.index++;
    if(this.index > this.songs.length-1){
      this.index = 0;
    }
    // this.setData({
    //   songUrl: path + "/song/不才 - 化身孤岛的鲸.mp3",
    // });
    this.setData(this.songs[this.index]);
    let self = this;
    setTimeout(function(){
      self.setData({
        audioAction: {
          method: 'play'
        }
      })
    }, 200);
  },
  // 去往我的收藏
  toLike: function(){
    wx.navigateTo({
      url: '../like/like'
    })
  },
  // 页面加载的时候获取所有歌曲
  onLoad: function(){
    // 文件操作API
    // getFileSystemManager是微信小程序提供的 文件管理器 对象
    let fileManager = wx.getFileSystemManager();
    // 这个套路可以保证 在下面的 环境里面 self 永远指向 page 页面
    let self = this;
    // 读取目录
    // readdir 是读取目录下文件的方法(读取整个文件夹)
    // 它的参数一个对象，第一个键 dirPath 表示要读取的文件夹 路径
    // 第二键 success 表示读取成功时的回调函数
    // 第三键 fail 表示读取失败时的回调
    // 。。。 conplete 。。。。。读取完成 时候
    fileManager.readdir({
      dirPath: "/resource/song",
      success: function (res) {
        // 读取成功时的处理
        console.log(res.errMsg);
        // 读取出来的文件（所有的歌曲） 在 res.files 里，保存到 变量 songs
        let songs = res.files;
        // 遍历 歌曲
        let id = 0;
        for (let i=0; i<songs.length; i++){
          // 为了防止在读取文件的时候出错，我们加了异常捕获，当读取出错直接跳入下一次循环
          try {
            self.songs.push({
              songName: songs[i].split("-")[1].split(".")[0],
              songAuthor: songs[i].split("-")[0],
              songID: id++,
              songImg: path + "/somgCover/shamo.png",
              songUrl: path + "/song/" + songs[i],
              like: false
            });
          } catch(err) {
            continue;
          }
        }
        self.setData(self.songs[self.index]);
        setTimeout(function(){
          self.setData({
            audioAction: {
              method: 'play'
            }
          })
        }, 200);
      },
      fail: function(e){
        console.log(e);
      },
      complete: function(e){
        console.log(e);
      }
    });
  },
  // 当一个页面并没有被销毁，这时候页面重新展现时并不会处罚 onSHow 之前的事件，只会触发之后的生命周期事件
  onShow: function(){
    // 判断是否回传了 喜欢了的 歌曲ID
    if(app.globalData.likeID != null){
      this.index = app.globalData.likeID;
      this.setData(this.songs[this.index]);
      app.globalData.likeID = null;
      let self = this;
      setTimeout(function () {
        self.setData({
          audioAction: {
            method: 'play'
          }
        })
      }, 200);
    }
  }
});