// pages/team/team.js
const {addUserByCode} = require('../../service/index')
const {getPhoneNumber} = require('../../utils/common')
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
        name: 'userName',
        rules: [
          {required: true, message: '姓名必填'}
        ]
      },
      {
        name: 'code',
        rules: [
          {required: true, message: '邀请码必填'}
        ]
      }
    ]
  },
  formInputChange(e) {
    const {field} = e.currentTarget.dataset
    this.setData({
        [`formData.${field}`]: e.detail.value
    })
  },
  join() {
    this.setData({
      loading: true
    })
    const userPhone = getPhoneNumber()
    const openid = wx.getStorageSync('openid')
    const params = {
      ...this.data.formData,
      userPhone,
      openid
    }
    addUserByCode(params)
    .then(() => {
      wx.showToast({
        title: '团队加入成功',
        icon: "success"
      })
      this.setData({
        loading: false
      })
      setTimeout(() => {
        wx.navigateBack({
          success() {
            let page=getCurrentPages().pop();
            if(page==undefined || page==null){
              return;
            }
            page.onLoad();
          }
        })
      }, 300)  
    })
    .catch(e => {
      wx.showToast({
        title: e.msg || '团队加入失败',
        icon: "error"
      })
      this.setData({
        loading: false
      })
    })
  },
  joinCompany() {
    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      } else {
        this.join()
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