// pages/demo1-1/demo1-1.js
var id = ''
var comment = ''
var date_Month=new Date().getMonth()+1
var date=new Date().getFullYear()+"/"+date_Month+"/"+new Date().getDate()+" "+new Date().getHours()+":"+new Date().getMinutes()


Page({


  data: {
   

  },


  onLoad: function (options) {
    this.getOpenid();
   const superRoot=wx.getStorageSync('superRoot')
   this.setData({ superRoot })
    id = options.id
    wx.cloud.database().collection('lost')

      .doc(id)
      .get()
      .then(res => {

        this.setData({

          lost: res.data,
          lost_openid:res.data._openid
        })
        
        

      })
      .catch(err => {
        console.log('请求失败', err)
      })

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
  finish(){
   wx.cloud.callFunction({
     name:'update_lost',
     data:{
       id:id,
       
     }
   })
    .then(res => {
      wx.showModal({
        title: '确认认领物品请私下联系发布者',
       
        success: function (res) {
           if (res.cancel) {
            wx.redirectTo({
              url: '/pages/lost/lost',
          
            })
           } else {
            wx.redirectTo({
              url: '/pages/lost/lost',
          
            })
           }
        },
      })
      // setTimeout(res=>{
      //   wx.redirectTo({
      //     url: '/pages/lost_detail/lost_detail?id='+id,
      //   })
      // },1500)
      
      console.log('请求成功', res)

    })
    .catch(err => {
      console.log('请求失败', err)
    })


  },
  delete(){
  
    wx.cloud.callFunction({
      name:'remove_lost',
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
          url: '/pages/lost/lost',
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
