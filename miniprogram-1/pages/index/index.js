
Page({
  data: {
   
  },
 
  onLoad() {
    
  },
  goLost(){
    wx.navigateTo({
      url: '/pages/lost/lost',
    })
  },
  goJob(){
    wx.navigateTo({
      url: '/pages/job/job',
    })
  }
})