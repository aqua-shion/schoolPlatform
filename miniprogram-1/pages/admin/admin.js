var username = ''
var password = ''
Page({

  data: {

  },

  onLoad: function (options) {
  
    wx.cloud.database().collection('admin')
      .doc('b00064a76061d0030c7b438e03a488b5')
      .get()
      .then(res => {
        console.log('请求成功', res)
        this.setData({
          username_database:res.data.username,
          password_database:res.data.password,
          
        })
      })
      .catch(err => {
        console.log('请求失败', err)
      })

  },

  getUser(e) {
    username = e.detail.value

  },
  getPsy(e) {
    password = e.detail.value

  },
  login() {
    
    if (username == this.data.username_database&& password == this.data.password_database){
      
      wx.setStorageSync("superRoot", '1');
      wx.switchTab({
        url: '/pages/index/index',
      })
     
    }else{
      wx.showToast({
        title: '账号或密码错误',
      })
    }
  },
  
})