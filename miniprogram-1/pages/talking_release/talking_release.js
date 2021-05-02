// pages/fb/fb.js
const app = getApp()
const db = wx.cloud.database();//初始化数据库
var title = ''
var content = ''
var nickName=''
var imgUrl = ''
var date_Month=new Date().getMonth()+1
var date=new Date().getFullYear()+"/"+date_Month+"/"+new Date().getDate()+" "+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds()
var like=0
var dislike=0
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgbox: [],//选择图片
    fileIDs: [],//上传云存储后的返回值
    isFocus:true,
    userInfo:{}
  },
  onLoad() {
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
  onShow: function (options) {
    this.setData({
      fileIDs: []//每次加载页面就清空数组
    })

  },


  // 删除照片 &&
  imgDelete1: function (e) {

    let index = e.currentTarget.dataset.index;
    let imgbox = this.data.imgbox;
    imgbox.splice(index, 1)
    this.setData({
      imgbox: imgbox
    });
  },
  // 选择图片 &&&
  addPic1: function (e) {
    var imgbox = this.data.imgbox;

    var that = this;
    var n = 6;
    if (6 > imgbox.length > 0) {
      n = 6 - imgbox.length;
    } else if (imgbox.length == 6) {
      n = 1;
    }
    wx.chooseImage({
      count: n, // 默认9，设置图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        if (imgbox.length == 0) {
          imgbox = tempFilePaths
        } else if (6 > imgbox.length) {
          imgbox = imgbox.concat(tempFilePaths);
        }
        that.setData({
          imgbox: imgbox
        });
      }
    })
  },

  //图片
  imgbox: function (e) {
    this.setData({
      imgbox: e.detail.value
    })
  },


  //上传图片按钮
  upImg: function (e) {
   
    if (!this.data.imgbox.length) {
      wx.showToast({
        icon: 'none',
        title: '图片类容为空'
      });
    } else {
      this.setData({
        isFocus:false
      })
      //上传图片到云存储
      wx.showLoading({
        title: '上传中',
      })
      let promiseArr = [];
      for (let i = 0; i < this.data.imgbox.length; i++) {
        promiseArr.push(new Promise((reslove, reject) => {
          let item = this.data.imgbox[i];
          //   let suffix = /\.\w+$/.exec(item)[0];//正则表达式返回文件的扩展名
          wx.cloud.uploadFile({
            cloudPath: "goods/" + new Date().toLocaleDateString() + '/' + new Date().getTime() + '.jpg', // 上传至云端的路径
            filePath: item, // 小程序临时文件路径
            success: res => {
              this.setData({
                fileIDs: this.data.fileIDs.concat(res.fileID)
              });
              console.log(res.fileID)//输出上传后图片的返回地址
              reslove();
              wx.hideLoading();
              wx.showToast({
                title: "上传成功",
              })
            },
            fail: res => {
              wx.hideLoading();
              wx.showToast({
                title: "上传失败",
              })
            }

          })
        }));
      }
      Promise.all(promiseArr).then(res => {//等数组都做完后做then方法
        console.log("图片上传完成后再执行")
        this.setData({
          imgbox: []//清空数组
        })
      })

    }
  },

  previewImg: function (e) {
    const contentImg = e.currentTarget.dataset.item;
    // console.log("点击图片放大预览", contentImg);
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


  submitTalking() {
    if (title == '') {
      wx.showToast({
        icon: 'none',
        title: '动态标题为空'
      })
    }
    else if (content == '') {
      wx.showToast({
        icon: 'none',
        title: '动态内容为空'
      })
    }
    else{
    wx.cloud.database().collection('talking')
      .add({
        data: {
          nickName:this.data.userInfo.nickName,
          avatarUrl:this.data.userInfo.avatarUrl,
          time:date,
          title: title,
          content:content,
          imgUrl: this.data.fileIDs,
          like:like,
          dislike:dislike
        }
      })

      .then(res => {
        wx.switchTab({
          url: '/pages/talking/talking'
        })
        console.log('发布成功', res)

      })
      .catch(res => {
        console.log('发布失败', res)
      })
    }
  },

  getTitle(e) {
    title = e.detail.value
  },
  getContent(e) {
    content = e.detail.value
  }

})