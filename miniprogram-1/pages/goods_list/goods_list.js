let name = ''
let price = ''
Page({

  data: {
    tabs:[
      {
        id:0,
        value:"未完成",
        isActive:true
      },
      {
        id:1,
        value:"已完成",
        isActive:false
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
    const userInfo=wx.getStorageSync('userinfo');
    if(userInfo===''){
      wx.showToast({
        icon: "error",
        title: '登录授权失败',
      })}
 this.setData({userInfo})
  },
  handleTabsItemChange(e){
    // 1 获取被点击的标题索引
    const {index}=e.detail;
    // 2 修改源数组
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    // 3 赋值到data中
    this.setData({
      tabs
    })
  },
  //0 不做排序，1升序，-1降序
  getList(type) {
  //  let len=this.data.list.length
    let db=wx.cloud.database().collection('goods')
    if(type==1){
      db=db.orderBy("price",'asc')
    }else if(type==-1){
      db=db.orderBy("price",'desc')
    }
    // wx.cloud.callFunction({
    //   name:'getData'
    // })
    // db.skip(len)


    db.get()
      
      .then(res=>{
        console.log('商品列表请求成功',res)
        wx.stopPullDownRefresh()
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
      url: '/pages/goods_detail/goods_detail?id=' + e.currentTarget.dataset.id,
    })
  },
  getName(e) {
    name = e.detail.value

  },
  getPrice(e) {
    price = e.detail.value
  },
  shengxu() {
    this.getList(1)
  },
  jiangxu() {
    this.getList(-1)
  },
 
  handleGetUserInfo(e){
    // console.log(e);

    const {userInfo}=e.detail;
    console.log(userInfo)
    wx.setStorageSync("userinfo", userInfo);
    
      
    },
    goods_release(){
      wx.redirectTo({
        url: '/pages/goods_release/goods_release'
      })
    },
  onPullDownRefresh(){
    this.getList(0)
  },
  // onReachBottom(){
  //   this.getList(0)
  // }
    
    



}
)