var util = require('../../utils/util.js')
Page({
  data:{
    danmuList:[]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    //弹幕
    var that = this;
    wx.request({
      url: "http://comment.bilibili.com/" + options.aid + ".xml",
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        // console.log(res.data);
        console.log(that.data.danmuList);
        var danmuList = util.loadXMLStr(res.data);
        console.log(danmuList);
       that.setData({
          danmuList: danmuList
        })
         console.log(that.data.danmuList);
      }
    })
   var playurl = " https://interface.bilibili.com/playurl?player=1&ts=1484464351&cid="+options.aid+"&sign=baf3ff9cbbffd80f31e4e7fd1d15d311";
    wx.request({url:playurl,
       header:{
        'content-type': 'application/json'
      },
      method:'GET',
      success:function(res){
        console.log(res.data);
      }  
    })
   this.setData({
     playurl:playurl
   });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})