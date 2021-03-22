// pages/choiceTeam/choiceTeam.js
const {get} = require('../../utils/request')
const {getPhoneFromServe} = require('../../utils/common')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: [],
    slideButtons: [
      {
        type: 'warn',
        text: '删除',
        extClass: 'test',
        src: '/page/weui/cell/icon_del.svg', // icon的路径
      }
    ]
  },
  createTeam() {
    wx.navigateTo({
      url: '/pages/team/team'
    })
  },
  joinTeam() {
    wx.navigateTo({
      url: '/pages/joinTeam/joinTeam'
    })
  },
  slideButtonTap(e) {
    console.log('e', e)
  },
  getUserList(compid) {
    get('/api/user',null, {compid}).then(res => {
      this.setData({
        userList: res.data
      })
    })
  },
  init() {
    console.log('in')
    const compId = wx.getStorageSync('compId')
    if(compId) {
      this.getUserList(compId)
    } else {
      const user = getPhoneFromServe()
      if(user) {
        this.getUserList(user.compId)
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
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