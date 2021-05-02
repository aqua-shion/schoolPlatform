// pages/demo1-1/demo1-1.js
var price = ''
var id = ''
var coid = ''
var comment = ''
var date_Month=new Date().getMonth()+1
var date=new Date().getFullYear()+"/"+date_Month+"/"+new Date().getDate()+" "+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds()


Page({


  data: {
    goods: [],
    userInfo: {},
    isFocus: false,
    commentLength: {},
    commentContent:{}
  },


  onLoad: function (options) {
    this.getOpenid();
    const superRoot=wx.getStorageSync('superRoot')
    this.setData({ superRoot })
    const userInfo = wx.getStorageSync('userinfo');
    this.setData({ userInfo })
    id = options.id
    wx.cloud.database().collection('goods')

      .doc(id)
      .get()
      .then(res => {

        this.setData({

          goods: res.data,
          goods_openid:res.data._openid
        })
        
        this.init()

      })
      .catch(err => {
        console.log('请求失败', err)
      })

  },

  //显示发表评论按钮
  showModal() {
    this.setData({
      isFocus: true
    })
    // console.log(this.data)
    
  },

  handleSubmit(e) {

    if (comment == '') {
      wx.showToast({
        icon: 'none',
        title: '评论为空'
      })
    }else {
    wx.cloud.database().collection('comments')
      .add({
        data: {
          coid: this.data.goods._id,
          comment: comment,
          comment_time: date,
          nickName:this.data.userInfo.nickName,
          avatarUrl:this.data.userInfo.avatarUrl

        }
      })

      .then(res => {
        console.log('评论成功', res)

        wx.redirectTo({
          url: '/pages/goods_detail/goods_detail?id=' + id

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

  //input绑定赋值
  submit(e) {
    comment = e.detail.value
    
  },


  //找出所有评论 根据coid
  init() {
    wx.cloud.database().collection('comments')
      .where({
        coid: this.data.goods._id
      })
      .get()
      .then(res => {
        
        this.setData({
          commentLength: res.data.length,
          commentContent:res.data

        })
       
      })
      .catch(err => {
        console.log('请求失败', err)
      })
  },
  finish(){
    wx.cloud.callFunction({
      name:'update_goods',
      data:{
        id:id,
        
      }
    })
    .then(res => {
      wx.showModal({
        title: '确认购买商品请私下联系发布者',
       
        success: function (res) {
           if (res.cancel) {
            wx.switchTab({
              url: '/pages/goods_list/goods_list',
          
            })
           } else {
            wx.switchTab({
              url: '/pages/goods_list/goods_list',
          
            })
           }
        },
      })
      console.log('请求成功', res)

    })
    .catch(err => {
      console.log('请求失败', err)
    })


  },
  delete(){
  
    wx.cloud.callFunction({
      name:'remove_goods',
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
          url: '/pages/goods_list/goods_list',
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