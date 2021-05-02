var _openid=''
Page({

  
  onLoad: function (options) {
    this.getOpenid();
   
   
  },


  onPullDownRefresh: function () {

  },
  getList(_openid) {
   
      let db=wx.cloud.database().collection('job')
      db.where({
        _openid:_openid
      })
      .get()
        
        .then(res=>{
          console.log('列表请求成功',res)
          wx.stopPullDownRefresh()
          this.setData({
            job_list:res.data
          })
          
        })
     
       
        .catch(res=>{
          console.log('列表请求失败',res)
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
        url: '/pages/job_detail/job_detail?id=' + e.currentTarget.dataset.id,
      })
    },
    
})