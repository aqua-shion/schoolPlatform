var name = ''
var price = ''
var detail=''
var contactName=''
var num=''
var img=''
var status='0'
var date_Month=new Date().getMonth()+1
var date=new Date().getFullYear()+"/"+date_Month+"/"+new Date().getDate()

Page({

  data: {

  },

  onLoad: function (options) {
    img=''
  },
  handleChooseImg() {
  
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success:res=> {
          // tempFilePath可以作为img标签的src属性显示图片
          console.log(res)
         this.uploadFile(res.tempFilePaths[0],"goods/" + date_Month+"/"+new Date().getDate()+'/'+new Date().getTime())
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
  
  
  addLost() {
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
   

    else {
      wx.cloud.database().collection('lost')
        .add({
          data: {
            name: name,
            detail:detail,
            contactName:contactName,
            num: parseInt(num),
            img:img,
            time:date,
            status:status
          }
        })
        .then(res => {
          
          wx.redirectTo({
            url: '/pages/lost/lost',
           
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
})