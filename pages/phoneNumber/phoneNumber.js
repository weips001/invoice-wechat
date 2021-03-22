// pages/phoneNumber/phoneNumber.js
const {post} = require('../../utils/request')
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
          {required: true, message: '手机号必填'},
          {mobile: true, message: '手机号格式不对'}
        ],
      }
    ]
  },
  formInputChange(e) {
    const {field} = e.currentTarget.dataset
    this.setData({
        [`formData.${field}`]: e.detail.value
    })
  },
  savePhone() {
    this.setData({
      loading: false
    })
    const params = {
      ...this.data.formData,
      openid: wx.getStorageSync('openid')
    }
    post('/api/user', params).then(() => {
      wx.setStorageSync('phoneNumber', this.data.formData.userPhone)
      wx.showToast({
        title: '保存成功',
        icon: "success"
      })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/mine/mine',
          success: function(res) {
            // 通过eventChannel向被打开页面传送数据
            // res.eventChannel.emit('acceptData', { data: 'test' })
          }
        })
      }, 300)
    }).catch(e => {
      console.log(e)
      this.setData({
        error: e.msg || '保存失败'
      })
    }).finally(() => {
      this.setData({
        loading: false
      })
    })
  },
  submitForm() {
    // wx.switchTab({
    //   url: '/pages/mine/mine',
    //   success: function(res) {
    //     console.log(res)
    //     // 通过eventChannel向被打开页面传送数据
    //     // res.eventChannel.emit('acceptData', { data: 'test' })
    //   }
    // })
    // return
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
          // this.setData({
          //   loading: true
          // })
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