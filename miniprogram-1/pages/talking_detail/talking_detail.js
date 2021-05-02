var id=''
var like=0
var dislike=0
var talking_comment=''
var date_Month=new Date().getMonth()+1
var date=new Date().getFullYear()+"/"+date_Month+"/"+new Date().getDate()+" "+new Date().getHours()+":"+new Date().getMinutes()
Page({

  data: {
    isLike:true,
    isDislike:true,
    isFocus: false,
   
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
    wx.cloud.database().collection('talking')
    .doc(id)
    .get()
    .then(res => {

      this.setData({
        detail:res.data,
        like:res.data.like,
        dislike:res.data.dislike,
        talking_openid:res.data._openid
      })
    this.init();

    })
    .catch(err => {
      console.log('请求失败', err)
    })

},
//分享
onShareAppMessage() {
  return {
    title: '这里有好看的内容哦~',
    path: 'page/talking_detail/talking_detail?id='+id
  }
  
},
//点赞
like(){

  if(this.data.isLike==true){
    this.setData({
      isLike:false
    })
    wx.showToast({
      title: '点赞成功',
    })
    
    wx.cloud.database().collection('talking')
    .where({
      _id:id
    })
    .get()
    .then(res => {
      wx.cloud.database().collection('talking')
      .where({
        _id:id
      })
      .update({
        data: {
          like:res.data[0].like+1  //where返回的是数组
        },
      })
      this.setData({
        like:res.data[0].like+1
      })
      

    })
    .catch(res => {
      console.log('点赞失败', res)
    })

  }else if(this.data.isLike==false){
    this.setData({
      isLike:true
    })
    wx.showToast({
      title: '取消点赞',
    })
    wx.cloud.database().collection('talking')
    .where({
      _id:id
    })
    .get()
    .then(res => {
      wx.cloud.database().collection('talking')
      .where({
        _id:id
      })
      .update({
        data: {
          like:res.data[0].like-1  //where返回的是数组
        },
      })
      this.setData({
        like:res.data[0].like-1
      })
    })
    .catch(res => {
      console.log('取消点赞失败', res)
    })

  }
  
},
//点踩
dislike(){
  if(this.data.isDislike==true){
    this.setData({
      isDislike:false
    })
    wx.showToast({
      title: '点踩成功',
    })
    wx.cloud.database().collection('talking')
    .where({
      _id:id
    })
    .get()
    .then(res => {
      wx.cloud.database().collection('talking')
      .where({
        _id:id
      })
      .update({
        data: {
          dislike:res.data[0].dislike+1  //where返回的是数组
        },
      })
      this.setData({
        dislike:res.data[0].dislike+1
      })

    })
    .catch(res => {
      console.log('点踩失败', res)
    })

  }else if(this.data.isDislike==false){
    this.setData({
      isDislike:true
    })
    wx.showToast({
      title: '取消点踩',
    })
    wx.cloud.database().collection('talking')
    .where({
      _id:id
    })
    .get()
    .then(res => {
      wx.cloud.database().collection('talking')
      .where({
        _id:id
      })
      .update({
        data: {
          dislike:res.data[0].dislike-1  //where返回的是数组
        },
      })
      this.setData({
        dislike:res.data[0].dislike-1
      })

    })
    .catch(res => {
      console.log('取消点踩失败', res)
    })

  }
  
},
submit(e) {
  talking_comment = e.detail.value
  this.setData({
    isFocus:true
  })
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
  handleSubmit(){
   
    if (talking_comment == '') {
      wx.showToast({
        icon: 'none',
        title: '评论为空'
      })
    }else {
      
    wx.cloud.database().collection('talking_comment')
      .add({
        data: {
          tkid: this.data.detail._id,
          comment: talking_comment,
          comment_time: date,
          nickName:this.data.userInfo.nickName,
          avatarUrl:this.data.userInfo.avatarUrl

        }
      })

      .then(res => {
        console.log('评论成功', res)

        wx.redirectTo({
          url: '/pages/talking_detail/talking_detail?id=' + id

        })
        wx.showToast({
          title: '评论成功',
        })
      })
      .catch(res => {
        console.log('评论失败', res)
      })
    }
  },
   //找出所有评论 根据tkid
   init() {
    wx.cloud.database().collection('talking_comment')
      .where({
        tkid: this.data.detail._id
      })
      .get()
      .then(res => {
        
        this.setData({
          commentLength: res.data.length,
          talking_comment:res.data

        })
       
      })
      .catch(err => {
        console.log('请求失败', err)
      })
  },
 
  delete(){
  
    wx.cloud.callFunction({
      name:'remove_talking',
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
        wx.switchTab({
          url: '/pages/talking/talking',
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