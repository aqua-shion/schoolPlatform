var id=''
Page({

  data: {
    
  },

  onShow: function (options) {
    
   this.getList();
   
  },
  job_release(){
    wx.redirectTo({
      url: '/pages/job_release/job_release',
    })
  },
  goDetail(e){
    
    wx.navigateTo({
      url: '/pages/job_detail/job_detail?id='+e.currentTarget.dataset.id
    })
  },
  onPullDownRefresh(){
    this.getList()
  },
  getList(){
    

    wx.cloud.database().collection('job')
    .get()
    .then(res => {
      wx.stopPullDownRefresh()
      this.setData({
       job_list:res.data,
        
       
      })
    
    })
    
    .catch(err => {
      console.log('请求失败', err)
    })


  },
  onShareAppMessage(e) {
  
    return {
      title: '这里有好看的内容哦~',
      path: 'page/job/job'
    }
    
  },
  
})