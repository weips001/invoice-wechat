const {get} = require('./request')
function transformBillInfo(billString) {
  let billList = []
  if(billString) {
    billList = billString.split(',')
    const billDate = billList[5].slice(0,4) + '-' + billList[5].slice(4,6) + '-' + billList[5].slice(6)
    const billInfo = {
      billCode: billList[2],
      billNumber: billList[3],
      money: billList[4],
      billDate,
      checkCode: billList[6]
    }
    wx.setStorageSync('bill', billInfo)
    if(billList[4]) {
      return billInfo
    }
  }
  return null
}
function takePhoto(naviMethod) {
  wx.removeStorageSync('bill')
  wx.scanCode({
    success: (res) => {
      if(res) {
        const billInfo = transformBillInfo(res.result)
        if(billInfo && billInfo.billNumber) {
          if(naviMethod === 'redirect') {
            wx.redirectTo({
              url: '/pages/result/result',
            })
          } else {
            wx.navigateTo({
              url: '/pages/result/result'
            })
          }
        } else {
          wx.showToast({
            title: '不支持的发票格式',
            icon: 'error',
            duration: 2000
          })
        }
      }
    },
    fail: (e) => {
      console.log(e)
      if(e.errMsg !== 'scanCode:fail cancel') {
        wx.showToast({
          title: '扫描失败',
          icon: 'error'
        })
      }
    }
  })
}

module.exports = takePhoto