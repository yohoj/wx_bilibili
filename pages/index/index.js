var util = require('../../utils/util.js')
Page({
  data:{
    currentId:1001,
    section: [
            {name : '首页',id : '1001'},
            {name : '频道',id : '1002'},
            {name : '直播',id : '1003'},
            {name : '排行',id : '1004'},
            {name : '我的',id : '1005'}
        ],
    webshowInfo: {},
    videoInfo: {},
    titlename: [{ name: "动画区", icon: "" },  //douga
      { name: "音乐区", icon: "" },   //music
      { name: "游戏区", icon: "" },   //game
      { name: "娱乐区", icon: "" },    //ent
      { name: "电视剧", icon: "" }, //teleplay
      { name: "番剧更新", icon: "" },  //bangumi
      { name: "电影区", icon: "" },   //movie
      { name: "科技区", icon: "" },    //technology
      { name: "鬼畜区", icon: "" },     //kichiku
      { name: "舞蹈区", icon: "" },     //dance
      { name: "时尚区", icon: "" },     //fashion
      { name: "生活区", icon: "" },     //life
      { name: "广告区", icon: "" },//ad
    ]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setTopDistance();
    this.setData({
      stagePoint:util.stagePoint()
    })
    if(this.data.currentId == 1001){
      this.homePage();
    }
    else if(this.data.currentId == 1002){
      this.channelPage();
    }
    else if(this.data.currentId == 1003){
      this.livePage()
    }
  },
  setTopDistance:function(){
    var stagewidth = util.stagePoint().stageWidth;
    var distance = (stagewidth/this.data.section.length-42)/2;
    this.setData({
       topdistance:distance       //每个标签的间距
    })
  },
  //上方选项点击
  handleTap: function (e) {
    let id = e.currentTarget.id;
    if (id) {
      this.setData({ currentId: id })
      this.onLoad();
    }

  },
  //主页
  homePage: function(){
     var that = this;
     wx.request({
      url:'http://api.bilibili.com/x/web-show/res/loc?callback=jQuery17205969745067413896_1482805801285&jsonp=jsonp&pf=0&id=23&_=1482805801599',
      header:{
        'content-type': 'application/json'
      },
      method:'GET',
      success:function(res){
        var jquerystring = 'jQuery17205969745067413896_1482805801285(';
        var webinfo = res.data.replace(jquerystring,'');
        webinfo = JSON.parse(webinfo.substring(0,webinfo.length-1));
        that.setData({
          webshowInfo:webinfo.data
        })
      }
    });
    wx.request({
      url: 'http://www.bilibili.com/index/ding.json',
      header: {
        'content-type': 'application/json'
      },
       method:'GET',
      success: function (res) {
        var arr = [];
        for(var item in  res.data){
          if(item == "pages" || item == "list" || item == "results"){
            continue;
          }
          arr.push(res.data[item]);
        }
        console.log(arr);
        that.setData({
          videoInfo: arr
        })
      }
    });
  },
  //频道
  channelPage:function(){
     var stagewidth = util.stagePoint().stageWidth;
    var distance = (stagewidth/3);
     var titlename = [{ name: "动画", icon: "" },  //douga
      { name: "音乐", icon: "" },   //music
      { name: "游戏", icon: "" },   //game
      { name: "娱乐", icon: "" },    //ent
      { name: "电视剧", icon: "" }, //teleplay
      { name: "番剧", icon: "" },  //bangumi
      { name: "电影", icon: "" },   //movie
      { name: "科技", icon: "" },    //technology
      { name: "鬼畜", icon: "" },     //kichiku
      { name: "舞蹈", icon: "" },     //dance
      { name: "时尚", icon: "" },     //fashion
      { name: "生活", icon: "" },     //life
      { name: "广告", icon: "" },//ad
    ]
    this.setData({
       channeldistance:distance,       //每个标签的间距
       channelname:titlename
    })
   
  },
  //直播
  livePage:function(){
    wx.request({url:"http://live.bilibili.com/bili/recom?callback=liveXhrDone",
       header:{
        'content-type': 'application/jsonp'
      },
      method:'GET',
      success:function(res){
        console.log(res.data);
      }  
    })

  },
  //排行
  rankPage:function(){

  },
  //我的
  minePage:function(){

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