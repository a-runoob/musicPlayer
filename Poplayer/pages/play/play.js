const app = getApp()

Page({
  onReady: function () {
    this.audioCtx = wx.createAudioContext("myAudio");
  },

  // 默认曲目
  index: 0,
  // 歌曲列表
  songs: [],
  // 需要渲染的数据
  data: {
    playState:'paused'
  },
  //收藏歌曲的顺序
  order:[],

  // 音频开始播放监听事件
  audioPlayed: function (e) {
    console.log('audio is played')
  },
  // 音频进度更新监听事件
  audioTimeUpdated: function (e) {
    
    //当当前时间等于总时间  则 index++  下一首
    this.duration = e.detail.duration;
    // console.log("当前时间："+e.detail.currentTime);
    // console.log("总时间：" + this.duration);
    if (e.detail.currentTime>=this.duration){
      //下一首
      this.nextSong();

    }
  },
  // 播放事件
  playAudio: function () {
    // console.log(this.songs[1].songName);
    this.setData({
      audioAction: {
        method: 'play'
      },
      playState:'running'
    });
  },
  // 暂停事件
  pauseAudio: function () {
    this.setData({
      audioAction: {
        method: 'pause'
      },
      playState:'paused'
    });
  },
  //重播
  replayAudio: function () {
    
    // //测试回到上一页 
    // wx.navigateBack({
    //   url:'../index/index'
    // })
   

    this.audioCtx.seek(0);
    this.setData({
      playState: 'running',
      audioAction: {
        method: 'play'
      },
      // songTime: 0
    });
  },
  // 上一首
  prevSong: function () {
    // 上一首就是对 默认曲目 序号 进行自减操作
    this.index--;
    // 到0的时候要判断是否 是第一首
    if (this.index < 0) {
      this.index = this.songs.length - 1;
    }

    this.setData(this.songs[this.index]);
    let self = this;
    setTimeout(function () {
      self.setData({
        audioAction: {
          method: 'play'
        },
        playState:'running'
      })
    }, 100);
  },
  // 下一首
  nextSong: function () {
    // 下一首的逻辑跟上一首是一样的
    this.index++;
    if (this.index > this.songs.length - 1) {
      this.index = 0;
    }
    // console.log("当前歌曲id:"+this.songs[this.index].songID);
    this.setData(this.songs[this.index]);
    let self = this;
    setTimeout(function () {
      self.setData({
        audioAction: {
          method: 'play'
        },
        playState: 'running'
      })
    }, 100);
  },

  // 页面加载的时候获取所有歌曲
  onLoad: function () {
    var that=this;
    // 微信网络请求，默认使用get进行异步请求
    wx.request({
      
      url: 'http://127.0.0.1:8000/music/',
      data: {
        
      },
      header: {
        'content-type': 'application/json' // 默认值,表示传输的数据为json格式
      },
      success(res) {
        // console.log(that.songs[0].name);
        console.log(res)
        if (res.errMsg == "request:ok") {
          let id = 0;
          console.log("从服务器上获取到的所有歌曲列表：")
          console.log("歌曲总数:"+res.data.songs.length);
          for (var i = 0; i < res.data.songs.length;i++){
            try {
              //将服务器上的歌曲传到songs数组中
              that.songs.push({
                songName: res.data.songs[i].name,
                songAuthor: res.data.songs[i].songer,
                songImg: res.data.songs[i].icon,
                songID:id++,
                songUrl: res.data.songs[i].url,
                like: false
              });
            } catch (err) {
              continue;
            }
          }
          console.log("歌曲:" + that.songs[that.index].songName);
          that.setData(that.songs[that.index]);
     
        }
      },
      fail: function (e) {
        console.log(e);
      },
      complete: function (e) {
        console.log(e);
      }
    })

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
        for (let i = 0; i < songs.length; i++) {
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
          } catch (err) {
            continue;
          }
        }
        self.setData(self.songs[self.index]);
        setTimeout(function () {
          self.setData({
            audioAction: {
              method: 'play'
            }
          })
        }, 200);
      },
      fail: function (e) {
        console.log(e);
      },
      complete: function (e) {
        console.log(e);
      }
    });
  },
  // 喜欢按钮点击事件
  audioLike: function (e) {
    // 把当前播放歌曲的 like 属性 改成 true，表示收藏成功
    this.songs[this.index].like = true;



    // 同时刷新页面
    this.setData({ like: true });
    

    
    // // 把喜欢的歌曲列表放入 app对象的 全局数据 （回到主页面like会 消失）
    // app.globalData.allsongs=this.songs;

    if (!app.globalData.likeSongs.includes(this.songs[this.index])) {
      app.globalData.likeSongs.push(this.songs[this.index]);
    }

    //收藏歌曲的先后顺序  排个号
    this.order.push({
      number:this.index
    })
    // console.log("order长度:"+this.order.length);
  },
  cancelLike: function (e) {

    
    this.songs[this.index].like=false;
    this.setData({
      like:false
    })

    if(app.globalData.likeSongs.includes(this.songs[this.index])){

      for(var i in this.order){
        if(this.order[i].number==this.index){
          // console.log("删除歌曲的index为:"+i.number)
          app.globalData.likeSongs.splice(i, 1);//删除喜欢

          //删除index对应的order数组下标
          this.order.splice(i,1);
        }
      }
      
      
    }

  },

  // 去往我的收藏
  toLike: function () {
    wx.navigateTo({
      url: '../like/like'
    })
  },
  // 当一个页面并没有被销毁，这时候页面重新展现时并不会处罚 onSHow 之前的事件，只会触发之后的生命周期事件
  onShow: function () {
      
      //再把全局的喜欢 歌曲  拿过来
      this.songs=app.globalData.allsongs;

    // 判断是否回传了 喜欢了的 歌曲ID
    if (app.globalData.likeID != null) {
 

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
      }, 100);
    }
  }
});