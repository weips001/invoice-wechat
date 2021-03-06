// pages/team/team.js
const {createCompany} = require('../../service/index')
const {getPhoneNumber,getCurrentUser} = require('../../utils/common')
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
        name: 'compName',
        rules: [
          {required: true, message: '公司名称必填'}
        ]
      },
      {
        name: 'bossName',
        rules: [
          {required: true, message: '姓名必填'}
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
  async saveCompany() {
    try {
      this.setData({
        loading: true
      })
      const bossPhone = await getPhoneNumber()
      const params = {
        ...this.data.formData,
        bossPhone
      }
      const res = await createCompany(params)
      const user = await getCurrentUser()
      const userInfo = {
        ...user,
        compId: res.compId
      }
      wx.setStorageSync('currentUser', userInfo)
      wx.showToast({
        title: '团队创建成功',
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
    } catch(e) {
      console.log('saveCompany fail', e)
      wx.showToast({
        title: e.msg || '团队创建失败',
        icon: "error"
      })
      this.setData({
        loading: false
      })
    }
  },
  createCompany() {
    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      } else {
        this.saveCompany()
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