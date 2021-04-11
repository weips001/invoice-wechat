// pages/result/result.js
const takePhoto = require('../../utils/takescan')
const { billIsExit, saveBill } = require('../../service/index')
const { formatTime } = require('../../utils/util')
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
    formData: {},
    // 默认不显示
    showExtra: false
  },
  contiuneScan() {
    this.resetBill()
    takePhoto('redirect')
  },
  resetBill() {
    this.setData({
      billInfo: {}
    })
  },
  async save(jump = true) {
    try {
      wx.showLoading({
        title: '数据保存中...',
      })
      const billInfo = wx.getStorageSync('bill')
      const openid = wx.getStorageSync('openid')
      const params = {
        ...this.formData,
        ...billInfo,
        openid,
        inputMethod: 'phone'
      }
      await saveBill(params)
      wx.hideLoading()
      wx.showToast({ title: '保存成功' })
      if(jump) {
        setTimeout(() => {
          wx.navigateBack()
        }, 300)
      }
    } catch (e) {
      const title = e.msg || '保存失败'
      wx.hideLoading()
      wx.showToast({
        title,
        icon: 'error',
        duration: 2000
      })
    }
  },
  async saveAndtakeScan() {
    await this.save(false)
    this.resetBill()
    takePhoto('redirect')
  },
  formInputChange(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  getInfo(info) {
    try {
      const billInfo = info || wx.getStorageSync('bill')
      if (billInfo) {
        this.setData({ billInfo })
      }
    } catch (e) {
      return null
    }
  },
  checkBill() {
    const billInfo = wx.getStorageSync('bill')
    wx.showLoading({
      title: '数据获取中',
    })
    billIsExit(billInfo.billNumber).then(() => {
      wx.hideLoading({
        success: () => {
          this.setData({
            showExtra: true
          })
          this.getInfo()
        }
      })

    }).catch(e => {
      wx.hideLoading({
        success: () => {
          this.setData({
            showExtra: true
          })
          const data = e.data
          data.createTime = formatTime(new Date(data.createTime))
          this.getInfo(data)
        }
      })

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.setStorageSync('bill', {billNumber: '08778438'})
    this.checkBill()
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