### 轮播图实现

##### 获取首页轮播图的接口：http://api.bilibili.com/x/web-show/res/loc?callback=jQuery17205969745067413896_1482805801285&jsonp=jsonp&pf=0&id=23&_=1482805801599

*wxml文件代码

```
<swiper indicator-dots="{{true}}" autoplay="{{true}}" interval="{{5000}}" duration="{{1000}}" circular="{{true}}">
  <block  wx:for="{{webshowInfo}}" wx:key="pic" id="webshowinfo" wx:for-item="webitem" wx:for-index="webindex">
    <swiper-item>
      <image src="{{webitem.pic}}" class="slide-image" id="{{webindex}}"/>
    </swiper-item>
</block>
</swiper>
```

*js文件代码


```
var util = require('../../utils/util.js')
Page({
  data:{
    text: "Page bilibiliHome",
    webshowInfo: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    this.setData({
      stagePoint:util.stagePoint()
    })
    console.log(this.data.textname);
    //哔哩哔哩首页滚动图获取
    wx.request({
      url:'http://api.bilibili.com/x/web-show/res/loc?callback=jQuery17205969745067413896_1482805801285&jsonp=jsonp&pf=0&id=23&_=1482805801599',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      method:'GET',
      success:function(res){
        var jquerystring = 'jQuery17205969745067413896_1482805801285(';
        var webinfo = res.data.replace(jquerystring,'');
        webinfo = JSON.parse(webinfo.substring(0,webinfo.length-1));
        that.setData({
          webshowInfo:webinfo.data
        })
        console.log(webinfo.data);
      }
    });
  }
```

*.wxss样式如下:
```
.slide-image{
  width: 100%;
  height: 100%;
}
```

### 视频分区实现

##### 获取各区的接口：http://www.bilibili.com/index/ding.json

##### 其中参数对应如下：
 - douga 动画区
 - music 音乐区
 - game  游戏区
 - ent   娱乐区
 - teleplay 电视剧
 - bangumi  番剧更新
 - movie    电影区
 - technology   科技区
 - kichiku  鬼畜区
 - dance    舞蹈区
 - fashion  时尚区
 - life     生活区
 - ad       广告区


*wxml文件代码（该部分只有视频区）

```
<view class="section {{titlename.length?'show':'hide'}}">
    <block wx:for="{{titlename}}" wx:key="titleitem" wx:for-item="nameitem" wx:for-index="titleindex">
      <view class="section_single">
        <view class="section__news">
          <view class="section__title">
            <text class="text">{{nameitem.name}}</text>
          </view>
          <text class="more">
            查看更多更新>
          </text>
        </view>
        <view class="list-flex">
          <block  wx:for="{{4}}" wx:key="detail" id="ad" wx:for-item="detailitem">
            <view class="listBox">
              <view class="boxPic">
                <image src="{{videoInfo[titleindex][detailitem].pic}}"  />
                <text class="title">{{videoInfo[titleindex][detailitem].title}}</text>
                <view class="detail">
                  <block wx:if="{{videoInfo[titleindex][detailitem].play>10000}}">
                  <!--P为播放量，R为评价量-->
                  <text>P:{{(videoInfo[titleindex][detailitem].play-videoInfo[titleindex][detailitem].play%1000)/10000}}万</text>
                  <!--保留一位小数-->
                  </block>
                  <block wx:if="{{videoInfo[titleindex][detailitem].play<10000}}">
                  <text>P:{{videoInfo[titleindex][detailitem].play}}</text>
                  </block>
                   <block wx:if="{{videoInfo[titleindex][detailitem].video_review>10000}}">
                  <text>R:{{(videoInfo[titleindex][detailitem].video_review-videoInfo[titleindex][detailitem].video_review%1000)/10000}}万</text>
                  </block>
                  <block wx:if="{{videoInfo[titleindex][detailitem].video_review<10000}}">
                 <text>R:{{videoInfo[titleindex][detailitem].video_review}}</text>
                  </block>
                  
                </view>
              </view>
            </view>
          </block>
        </view>
      </view>
    </block>
  </view>
```

*js文件代码


```
var util = require('../../utils/util.js')
Page({
  data:{
    currentId:1001,
    section: [
            {name : '首页',id : '1001'},
            {name : '频道',id : '1032'},
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
    var that = this;
    this.setTopDistance();
    this.setData({
      stagePoint:util.stagePoint()
    })
    console.log(this.data.textname);
    wx.request({
      url:'http://api.bilibili.com/x/web-show/res/loc?callback=jQuery17205969745067413896_1482805801285&jsonp=jsonp&pf=0&id=23&_=1482805801599',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      method:'GET',
      success:function(res){
        var jquerystring = 'jQuery17205969745067413896_1482805801285(';
        var webinfo = res.data.replace(jquerystring,'');
        webinfo = JSON.parse(webinfo.substring(0,webinfo.length-1));
        that.setData({
          webshowInfo:webinfo.data
        })
        console.log(webinfo.data);
      }
    });
    wx.request({
      url: 'http://www.bilibili.com/index/ding.json',
      header: {
        'content-type': 'application/json'
      },
       method:'GET',
      success: function (res) {
        console.log(res.data);
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
        console.log(arr);
      }
    });
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
    console.log(e);
    let id = e.currentTarget.id;

    if (id) {
      this.setData({ currentId: id })
      this.onLoad();
    }

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
```

*.wxss样式如下:
```
/*各分区*/
.section{
    margin:10px 0;
}
.section .section_single{
    margin: 10px 0;
    background: #fff;
}
.section .section_single .section__news{
    display: flex;
    height:25px;
    font-size:16px;
    justify-content:space-between;
    align-items:flex-end;
}
.section .section_single .section__news .section__title{
    display: flex;
    align-items:flex-end;
    height:25px;

}
.section .section_single .section__news .section__title:before{
    content:'';
    width:2px;
    background:#ffb3cc;
    border-radius: 2px;
    display:inline-block;
    margin: 5px 4px 0 0;
    height:14px;
    align-self:center;
}
.section .section_single .section__news .text{
    font-size:16px;
    color: #222;
}
.section .section_single .section__news .more{
    color:#ffb3cc;
    font-size:12px;
}
.section .section_single .list-flex{
    display:flex;
    justify-content:space-between;
    width:100%;
    flex-wrap:wrap;
}
.section .section_single .listBox{
    width:49%;
    margin-top:8px;
}
.section .section_single .listBox .boxPic{
    height:170px;
    position:relative;
}
.section .section_single .listBox image{
    width:100%;
    height:110px;
    border-radius: 4px;
}
.section .section_single .listBox .boxPic .title{
    overflow : hidden;
     display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 14px;
    color: #222;
    margin-top: 2px;
    line-height: 20px;
}
.section .section_single .listBox .boxPic .detail{
     display: flex;
     font-size:16px;
     justify-content:space-between;
     align-items:flex-end;
}
.section .section_single .listBox .boxPic .detail text{
    font-size: 12px;
    color: #999;
}

```




