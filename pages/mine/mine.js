// pages/mine/mine.js
const {post} = require('../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCheckWe: false,
    isCheckPhone: false
  },
  checkLogin() {
    return new Promise((resolve, reject) => {
      wx.checkSession({
        success () {
          const openid = wx.getStorageSync('openid')
          if(openid) {
            resolve(openid)
          } else {
            reject()
          }
        },
        fail (err) {
          reject()
        }
      })
    })
  },
  login() {
    return new Promise((resolve, reject) => {
      this.checkLogin().then((openid) => {
        resolve(openid)
      }).catch(() => {
        wx.login({
          success({code}) {
            post('/api/wxLogin', {js_code: code}).then(res => {
              const openid = res.openid
              console.log('2', openid)
              wx.setStorageSync('openid', openid)
              resolve(openid)
            }).catch(() => {
              reject()
            })
          }
        })
      })
    })
  },
  bindgetuserinfo(e) {
    const {userInfo} = e.detail
    if(userInfo) {
      console.log(userInfo)
      wx.setStorageSync('user', userInfo)
      const phone = this.getPhoneNumber()
      if(phone) {
        this.setData({
          isCheckWe: true,
          isCheckPhone: true
        })
      } else {
        this.getPhoneFromServe(res => {
          this.setData({
            isCheckWe: true,
            isCheckPhone: res
          })
        })
      }
      this.setData({
        isCheckWe: true,
        isCheckPhone: !!phone
      })
      this.login()
    } else {
      wx.showToast({
        title: "请允许获取用户信息！",
        icon: "none",
        duration: 2000
      })
      
    }
    console.log(e)
  },
  // 获取微信授权
  hasUserAuth() {
    return new Promise(resolve => {
      wx.getSetting({
        success(res) {
          const flag = res.authSetting['scope.userInfo']
          resolve(flag)
        },
        fail() {
          resolve(false)
        }
      })
    })  
  },
  // 从storage中获取用户信息
  getUserFromStorage() {
    return wx.getStorageSync('user')
  },
  // 通过openid查看手机号是否存在
  userInit() {
    this.hasUserAuth()
    .then(status => {
      if(status) {
        // 如果有用户权限 判断本地是否有数据
        const user = this.getUserFromStorage()
        if(user) {
          // 如果有用户信息，则不显示获取微信按钮
          this.setData({
            isCheckWe: true
          })
          return true
        }
        return false
      } else {
        if(this.data.isCheckWe) {
          this.setData({
            isCheckWe: false
          })
        }
        return false
      }
    })
    .then(hasUser => {
      if(hasUser) {
        const phone = this.getPhoneNumber()
        if(phone) {
          this.setData({
            isCheckPhone: true
          })
        } else {
          this.getPhoneFromServe()
        }
      }
    })
  },
  getPhoneFromServe() {
    const openid = wx.getStorageSync('openid')
    return post('/api/getUserFromOpenid', {openid}).then(res=> {
      if(res.data) {
        wx.setStorageSync('phoneNumber', res.data.userPhone)
        wx.setStorageSync('compId', res.data.compId)
        this.setData({
          isCheckPhone: true
        })
        return true
      }
      this.setData({
        isCheckPhone: false
      })
      return false
    })
    .catch(() => false)
  },
  getPhoneNumber() {
    return wx.getStorageSync('phoneNumber')
  },
  inputPhoneNumber() {
    wx.navigateTo({
      url: '/pages/phoneNumber/phoneNumber'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userInit()
    this.login()
    const eventChannel = this.getOpenerEventChannel()
    console.log(eventChannel)
    eventChannel.on && eventChannel.on('acceptData', function(data) {
      console.log(data)
    })
    // console.log(options)
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
    console.log(arguments)
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