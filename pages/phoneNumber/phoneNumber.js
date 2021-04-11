// pages/phoneNumber/phoneNumber.js
const { saveUser } = require('../../service/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    error: '',
    formData: {},
    loading: false,
    rules: [
      {
        name: 'userPhone',
        rules: [
          { required: true, message: '手机号必填' },
          { mobile: true, message: '手机号格式不对' }
        ],
      }
    ]
  },
  formInputChange(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  async savePhone() {
    try {
      this.setData({
        loading: false
      })
      const params = {
        ...this.data.formData,
        openid: wx.getStorageSync('openid')
      }
      await saveUser(params)
      // TODO:需要重新存入用户人员信息
      wx.showToast({
        title: '手机号绑定成功',
        icon: "success"
      })
      this.setData({
        loading: false
      })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/mine/mine',
          success: function (res) {
            let page = getCurrentPages().pop();
            if (page == undefined || page == null) {
              return;
            }
            page.onLoad();
          }
        })
      }, 300)
    } catch (e) {
      this.setData({
        error: e.msg || '手机号绑定失败'
      })
      this.setData({
        loading: false
      })
      console.log('savePhone fail', e)
    }
  },
  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      } else {
        this.savePhone()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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