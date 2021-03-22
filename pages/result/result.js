// pages/result/result.js
const takePhoto = require('../../utils/takescan')
const {post} = require('../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 01,10,041002000111,08778438,100.00,20210312,07032953716711536482,827E
    billInfo: {
      // 发票代码
      billCode: "",
      // 发票号码
      billNumber: "",
      // 发票金额
      money: "",
      // 开票日期
      billDate: "",
      // 校验码
      checkCode: ""
    },
    formData: {

    },
  },
  saveAndtakeScan() {
    const billInfo = wx.getStorageSync('bill')
    const openid = wx.getStorageSync('openid')
    const params = {
      ...this.formData,
      ...billInfo,
      openid
    }
    post('/api/bill', params).then(() => {
      wx.showToast({title: '保存成功'})
      takePhoto()
    }).catch(e => {
      const title = e.msg || '保存失败'
      wx.showToast({
        title,
        icon: 'error',
        duration: 2000
      })
    })
    // console.log(this.data.formData)
  },
  formInputChange(e) {
    const {field} = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  getInfo() {
    try {
      const billInfo = wx.getStorageSync('bill')
      if (billInfo) {
        this.setData({billInfo})
      }
    } catch (e) {
      return null
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})