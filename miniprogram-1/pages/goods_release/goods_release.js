var name = ''
var price = ''
var detail=''
var contactName=''
var num=''
var img=''
var status='0'
var date_Month=new Date().getMonth()+1
var date=new Date().getFullYear()+"/"+date_Month+"/"+new Date().getDate()+" "+new Date().getHours()+":"+new Date().getMinutes()

Page({

  data: {

  },

  onShow: function (options) {
    
  },
  handleChooseImg() {
  
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success:res=> {
          // tempFilePath可以作为img标签的src属性显示图片
          console.log(res)
         this.uploadFile(res.tempFilePaths[0],"goods/" + new Date().toLocaleDateString()+'/'+new Date().getTime())
        }
      })
    },
    uploadFile(temFile,fileName){
    wx.cloud.uploadFile({
      cloudPath: fileName+'.jpg',
      filePath: temFile, // 文件路径
    }).then(res => {
      img=res.fileID
      this.setData({
        imgUrl:res.fileID
      })
      
    }).catch(err => {
      console.log('上传失败',err)
    })
  },
  
  
  addGoods() {
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
    else if (num == '') {
      wx.showToast({
        icon: 'none',
        title: '联系方式为空'
      })
    }
   

    else {
      wx.cloud.database().collection('goods')
        .add({
          data: {
            name: name,
            price: parseInt(price),
            detail:detail,
            contactName:contactName,
            num: parseInt(num),
            img:img,
            time:date,
            status:status
          }
        })
        .then(res => {
          wx.showModal({
            title: '发布商品成功',
           
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
            fail: function (res) { },//接口调用失败的回调函数
            complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
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
  getPrice(e) {
    price = e.detail.value
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
  
})