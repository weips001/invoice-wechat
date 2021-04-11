// pages/choiceTeam/choiceTeam.js
const {getUserList} = require('../../service/index')
const {getUserFromOpenid, getCompid} = require('../../utils/common')
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
    getUserList().then(res => {
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
  async init() {
    try {
      wx.showLoading({
        title: '数据加载中...',
      })
      const compId = await getCompid()
      if(compId) {
        this.getUserList()
        wx.hideLoading()
        return false
      }
      this.setData({
        isShow: true
      })
      wx.hideLoading()
    } catch(e) {
      wx.hideLoading()
      console.log('choiceTeam init fail', e)
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