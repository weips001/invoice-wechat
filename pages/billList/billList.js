// pages/billList/billList.js
const {getBillList} = require('../../service/index')
const {formatTime} = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    loading: false
  },
  async getList() {
    try {
      this.setData({
        loading: false
      })
      wx.showLoading({
        title: '数据获取中...',
      })
      const res = await getBillList()
      const list = res.data.map(item=> {
        return {
          ...item,
          createTime: formatTime(new Date(item.createTime))
        }
      })
      this.setData({
        list,
        loading: true
      })
      wx.hideLoading()
    } catch (e) {
      console.log('getList fail', e)
      wx.hideLoading()
      this.setData({
        list,
        loading: true
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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