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
function takePhoto() {
  wx.scanCode({
    success: (res) => {
      if(res) {
        console.log('res', res)
        console.log('openid', openid)
        const billInfo = transformBillInfo(res.result)
        const openid = wx.getStorageSync('openid')
        if(billInfo && billInfo.billNumber) {
          const params = {
            // ...billInfo,
            // openid
            billNumber: billInfo.billNumber
          }
          get('/api/billIsExit', params).then(() => {
            wx.showToast({title: '录入成功'})
            wx.navigateTo({
              url: '/pages/result/result'
            })
          }).catch(e => {
            const title = e.msg || '录入失败'
            wx.showToast({
              title,
              icon: 'error',
              duration: 2000
            })
          })
        } else {
          wx.showToast({
            title: '不支持的发票格式',
            icon: 'error',
            duration: 2000
          })
        }
      }
    }
  })
}

module.exports = takePhoto