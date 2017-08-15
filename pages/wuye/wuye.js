// wuye.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 切换至物业页面时，先判断是否登录，未登录切换至登录页面；
   * 若已登录，但是
   */
  onShow:function(){
    this.checkLogin();
  },

  //检查用户登陆
  checkLogin:function(){
    var that = this;
    wx.getStorage({
      key: 'mid',
      success: function (res) {

        //若用户已登录，检查地址绑定
        that.checkProvince()
      },
      fail: function () {
        console.log('用户未登录')//跳转至登录页面
        wx.switchTab({
          url: '/pages/huiyuan/huiyuan',
        })
      }
    })
  },

  /**
   * 检查地址绑定
   */
  checkProvince:function(){
    var that = this;
    wx.getStorage({
      key: 'province_id',
      success: function (res) {
        console.log('用户已绑定地址')
        wx.setNavigationBarTitle({
          title: '物业',
        })
        
        var province_id = res.data;
        if(province_id==null||province_id==''){
          //提示用户绑定地址
          that.showBindDialog();
        } else {
          //若用户已绑定地址，显示物业页面
          
        }
      },
      fail: function () {
        console.log('用户未绑定地址')
        //提示用户绑定地址
        that.showBindDialog();
      }
    })
  },

  //提示用户绑定地址
  showBindDialog:function(){
    wx.showModal({
      title: '提示',
      content: '您还未填写地址信息，为了更好的享受服务，请绑定您的地址信息。',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定，绑定地址')
          //绑定地址
          wx.navigateTo({
            url: '../huiyuan/bindaddress/bindaddress',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
          //跳转至个人中心
          wx.switchTab({
            url: '/pages/huiyuan/huiyuan',
          })
        }
      }
    })
  }


})