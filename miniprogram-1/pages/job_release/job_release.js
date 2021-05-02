const chooseLocation = requirePlugin('chooseLocation');
var name = ''
var detail=''
var contactName=''
var num=''
var address=''
var money=''
var date_Month=new Date().getMonth()+1
var date=new Date().getFullYear()+"/"+date_Month+"/"+new Date().getDate()

Page({

  data: {

  },
  onShow() {
   
    const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
    console.log(location)
    this.setData({location})
   
   
  },
  onUnload() {
    // 页面卸载时设置插件选点数据为null，防止再次进入页面，geLocation返回的是上次选点结果
    chooseLocation.setLocation(null);
  },
getLocation() {
    
    const key = 'UISBZ-XCPC3-GGD3W-3ZQWT-3NAD5-WHF2C'; //使用在腾讯位置服务申请的key
    const referer = '毕业设计'; //调用插件的app的名称
    const location = JSON.stringify({
      latitude: 39.89631551,
      longitude: 116.323459711
    });
    const category = '生活服务,娱乐休闲';

    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
    });
   
  },
  onLoad: function (options) {
   this.getUser();
  },
 
  addjob() {
    if (name == '') {
      wx.showToast({
        icon: 'none',
        title: '标题为空'
      })
    }

    else if (detail == '') {
      wx.showToast({
        icon: 'none',
        title: '详情为空'
      })
    }
    else if (num == '') {
      wx.showToast({
        icon: 'none',
        title: '联系方式为空'
      })
    }
  //  不填地址会出bug 暂时没想到解决办法
   

    else {
      address=this.data.location.address+this.data.location.name
      wx.cloud.database().collection('job')
        .add({
          data: {
            name: name,
            detail:detail,
            contactName:contactName,
            num: parseInt(num),
            address:address,
            time:date,
            money:money,
            nickName:this.data.userInfo.nickName,
            avatarUrl:this.data.userInfo.avatarUrl,
            city:this.data.location.city,
            location:this.data.location
            
          }
        })
        .then(res => {
          console.log('添加成功', res)
          wx.redirectTo({
            url: '/pages/job/job',
           
          })
        })
        .catch(res => {
          console.log('添加失败', res)
        })
    }

  },
  getName(e) {
    name = e.detail.value

  },
 
  getDetail(e) {
    detail = e.detail.value

  },
  getContactName(e) {
    contactName = e.detail.value
  },
  getNum(e) {
    num = e.detail.value

  },
 getAddress(e){
   address=e.detail.value
 },
 getMoney(e){
  money=e.detail.value
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
 }
})