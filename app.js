// app.js
const { wechatLogin, getToken } = require('./utils/common')
App({
  async onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    await wechatLogin()
    await getToken()
  },
  globalData: {
    userInfo: null
  }
})
