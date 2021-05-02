// pages/user/user.js
Page({


  data: {

  },


  onShow: function (options) {
    this.getUser();
  },
  getUser() {
    const userInfo = wx.getStorageSync('userinfo');
    if (userInfo === '') {
      wx.showToast({
        icon: "error",
        title: '身份信息未授权',
      })
    }
    else {
      this.setData({ userInfo })

    }
  },
  admin(){
    wx.redirectTo({
      url: '/pages/admin/admin',
    })
  },
  goLost(){
    wx.navigateTo({
      url: '/pages/user_lost/user_lost',
    })
  },
  goGoods(){
    wx.navigateTo({
      url: '/pages/user_goods/user_goods',
    })
  },
  goTalking(){
    wx.navigateTo({
      url: '/pages/user_talking/user_talking',
    })
  },
  goJob(){
    wx.navigateTo({
      url: '/pages/user_job/user_job',
    })
  }
})