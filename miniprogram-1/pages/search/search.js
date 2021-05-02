var value=''
Page({

    data: {
      goods:[],
      // 取消 按钮 是否显示
      isFocus:false,
      // 输入框的值
      inpValue:""
    },
   
    handleInput(e){
      // 获取输入框的值
     value=e.detail.value;
     
    },
 
  onLoad: function (options) {

  },
handleSearch(){
 
    wx.cloud.database().collection('goods')
      .where({
       
       name:{								
        $regex:'.*' + value + '.*',		//‘.*’等同于SQL中的‘%’
        $options: 'i'							//$options:'i' 代表这个like的条件不区分大小写,详见开发文档
      }

 
      })
      .get()
      .then(res => {
        
        this.setData({
         goods:res.data

        })
       console.log("查询成功",res)
       
      })
      .catch(err => {
        console.log('请求失败', err)
      })
 
}
  
})