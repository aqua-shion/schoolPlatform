var id=''
Page({

  data: {
    isLike:true,
  },

  onShow: function (options) {
    
   this.getList();
   
  },
  talking_release(){
    wx.navigateTo({
      url: '/pages/talking_release/talking_release',
    })
  },
  goDetail(e){
    
    wx.navigateTo({
      url: '/pages/talking_detail/talking_detail?id='+e.currentTarget.dataset.id
    })
  },
  onPullDownRefresh(){
    this.getList()
  },
  getList(){
    

    wx.cloud.database().collection('talking')
    .get()
    .then(res => {
      wx.stopPullDownRefresh()
      this.setData({
        talking_list:res.data,
        
       
      })
    
    })
    
    .catch(err => {
      console.log('请求失败', err)
    })


  },
  onShareAppMessage(e) {
  
    return {
      title: '这里有好看的内容哦~',
      path: 'page/talking/talking'
    }
    
  },
  previewImg: function (e) {
    const contentImg = e.currentTarget.dataset.item;
    
    wx.previewImage({
      current: contentImg, //当前图片地址
      urls: [contentImg], //所有要预览的图片的地址集合 数组形式
      success: function (res) {
      },
      fail: function (res) {
      },
      complete: function (res) {
      },
    })
  },
})