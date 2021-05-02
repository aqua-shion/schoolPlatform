
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
    this.getList();
  },
  lost_release(){
    wx.redirectTo({
      url: '/pages/lost_release/lost_release',
    })
  },
  getList() {
   
    let db=wx.cloud.database().collection('lost')
   
    // wx.cloud.callFunction({
    //   name:'getData'
    // })
    
    db.get()
      
      .then(res=>{
        console.log('失物招领列表请求成功',res)
        wx.stopPullDownRefresh()
        this.setData({
          list:res.data
        })
        
      })
   
     
      .catch(res=>{
        console.log('失物招领列表请求失败',res)
      })
    
    
  },
  goDetail(e) {
    wx.navigateTo({
      url: '/pages/lost_detail/lost_detail?id=' + e.currentTarget.dataset.id,
    })
  },
  onPullDownRefresh(){
    this.getList();
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