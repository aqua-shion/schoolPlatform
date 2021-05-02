var id=''
var latitude=''
var longitude=''
Page({

  data: {
   
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOpenid();
    const superRoot=wx.getStorageSync('superRoot')
    this.setData({ superRoot })
   this.getUser();
    id= options.id
    wx.cloud.database().collection('job')
    .doc(id)
    .get()
    .then(res => {
     
      this.setData({
        detail:res.data,
        location:res.data.location,
        job_openid:res.data._openid
        
      })
   

    })
    .catch(err => {
      console.log('请求失败', err)
    })

},
//分享
onShareAppMessage() {
  return {
    title: '这里有好看的内容哦~',
    path: 'page/job_detail/job_detail?id='+id
  }
  
},


getUser(){
  const userInfo = wx.getStorageSync('userinfo');
    if (userInfo === '') {
      wx.showToast({
        icon: "error",
        title: '登录授权失败',
      })
    }
    else {
      this.setData({userInfo})
    }
  },
  
  
 
  delete(){
  
    wx.cloud.callFunction({
      name:'remove_job',
      data:{
        id:id
      }
    })
    .then(res=>{
      console.log('删除成功',res)
      wx.showToast({
        title: '删除成功',
      })
      setTimeout(res=>{
        wx.redirectTo({
          url: '/pages/job/job',
        })
      },1500)
    })
    .catch(res=>{
      console.log('删除失败',res)
    })
  },
  getOpenid(){
    wx.cloud.callFunction({
      name:'eventData'
    })
    .then(res => {
      
        this.setData({
          user_openid:res.result.event.userInfo.openId
        })
     
      console.log('调用成功', res)
     
    })
    .catch(res => {
      console.log('调用失败', res)
    })
  }

  

})