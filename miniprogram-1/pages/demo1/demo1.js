let name = ''
let price = ''
Page({


  data: {
    list: {}
  },


  onLoad: function (options) {
    this.getList()
  },
  //0 不做排序，1升序，-1降序
  getList(type) {
    // wx.cloud.database().collection('goods')
    //   .get()
    //   .then(res => {
    //     console.log('商品列表请求成功', res)
    //     this.setData({
    //       list: res.data,
    //       good: res.data
    //     })
    //   })
    //   .catch(err => {
    //     console.log('商品列表请求失败', err)
    //   })
    let db=wx.cloud.database().collection('goods')
    if(type==1){
      db=db.orderBy("price",'asc')
    }else if(type==-1){
      db=db.orderBy("price",'desc')
    }
      db.get().then(res=>{
        console.log('商品列表请求成功',res)
        this.setData({
          list:res.data
        })
      })
      .catch(res=>{
        console.log('商品列表请求失败',res)
      })
    
    
  },
  goDetail(e) {
    wx.navigateTo({
      url: '/pages/demo1-1/demo1-1?id=' + e.currentTarget.dataset.id,
    })
  },
  getName(e) {
    name = e.detail.value

  },
  getPrice(e) {
    price = e.detail.value
  },
  addGood(e) {
    if (name == '') {
      wx.showToast({
        icon: 'none',
        title: '商品名为空'
      })
    }

    else if (price == '') {
      wx.showToast({
        icon: 'none',
        title: '价格为空'
      })
    }
    else {
      wx.cloud.database().collection('goods')
        .add({
          data: {
            name: name,
            price: parseInt(price)
          }
        })
        .then(res => {
          this.getList()
        })
        .catch(res => {
          console.log('添加失败', res)
        })
    }

  },
  shengxu() {
    this.getList(1)
  },
  jiangxu() {
    this.getList(-1)
  },
  // 测试云函数
  getData(){
    wx.cloud.callFunction({
      name:'getData'
    })
    .then(res => {
      this.setData({
        openid:res.result.openid
      })
      console.log('调用成功', res)
    })
    .catch(res => {
      console.log('调用失败', res)
    })
  },
  eventData(){
    wx.cloud.callFunction({
      name:'eventData',
      data:{
        name:'笹木咲',
        price:'700'
      }
    })
    .then(res => {
      
      console.log('调用成功', res)
    })
    .catch(res => {
      console.log('调用失败', res)
    })
  },
  chooseImage(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:res=> {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
       this.uploadFile(res.tempFilePaths[0],"goods/" + new Date().getTime())
      }
    })
  },
  uploadFile(temFile,fileName){
  wx.cloud.uploadFile({
    cloudPath: fileName+'.jpg',
    filePath: temFile, // 文件路径
  }).then(res => {
    // get resource ID
    console.log('上传成功',res.fileID)
  }).catch(err => {
    console.log('上传失败',err)
  })
},

})