// pages/login/index.js
Page({
  data:{
    
  },
  onLoad(){
    
  },
  getUserProfile(e){
    
    wx.getUserProfile({
      desc: '用于获取用户头像昵称', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        const {userInfo}=res;
        wx.setStorageSync("userinfo", userInfo);
        wx.switchTab({
          url: '/pages/user/user'
        })
      }
    })
    
   
   
  },
   
   
   
      
  
})