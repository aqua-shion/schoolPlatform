var _openid=''
Page({

  
  data: {
    tabs:[
      {
        id:0,
        value:"未完成",
        isActive:true
      },
      {
        id:1,
        value:"已完成",
        isActive:false
      },
    ]
  },

  
  onLoad: function (options) {

    this.getOpenid();
   
   
  },


  onPullDownRefresh: function () {

  },
  getList(_openid) {
   
      let db=wx.cloud.database().collection('goods')
      db.where({
        _openid:_openid
      })
      .get()
        
        .then(res=>{
          console.log('商品列表请求成功',res)
          wx.stopPullDownRefresh()
          this.setData({
            list:res.data
          })
          
        })
     
       
        .catch(res=>{
          console.log('商品列表请求失败',res)
        })
      
      
    },
    // 先调用云函数获取openid然后调用getlist获取集合
    getOpenid(){
      wx.cloud.callFunction({
        name:'eventData'
      })
      .then(res => {
        
          _openid=res.result.event.userInfo.openId
       
        console.log('调用成功', res)
        this.getList(_openid);
      })
      .catch(res => {
        console.log('调用失败', res)
      })
    },
    goDetail(e) {
      wx.navigateTo({
        url: '/pages/goods_detail/goods_detail?id=' + e.currentTarget.dataset.id,
      })
    },
    handleTabsItemChange(e){
      // 1 获取被点击的标题索引
      const {index}=e.detail;
      // 2 修改源数组
      let {tabs}=this.data;
      tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
      // 3 赋值到data中
      this.setData({
        tabs
      })
    },
})