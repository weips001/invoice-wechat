// pages/choiceTeam/choiceTeam.js
const {get} = require('../../utils/request')
const {getUserFromOpenid} = require('../../utils/common')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: [],
    isShow: false,
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
  getUserList() {
    get('/api/user').then(res => {
      const userList = res.data
      // userList.filter(user => user.)
      wx.hideLoading({
        success: () => {
          this.setData({
            userList,
            isShow: true
          })
        },
      })
    }).catch(() => {
      wx.hideLoading()
      this.setData({
        isShow: true
      })
      return false
    })
  },
  init() {
    const compId = wx.getStorageSync('compId')
    wx.showLoading({
      title: '数据加载中...',
    })
    if(compId) {
      this.getUserList()
    } else {
      getUserFromOpenid().then(user => {
        console.log('user', user)
        if(user) {
          if(user.compId) {
            this.getUserList()
          } else {
            this.setData({
              isShow: true
            })
            wx.hideLoading()
          }
        } else {
          wx.hideLoading()
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('iniy')
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