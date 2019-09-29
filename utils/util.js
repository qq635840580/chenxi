const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 封装微信的的request
 */
function request(url, data = {}, method = "POST") {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'token': wx.getStorageSync('token'),
        'uid': wx.getStorageSync('uid'),
        'openid': wx.getStorageSync('openid'),
      },
      success: function (res) {
        console.log(res.data);
        if (res.statusCode == 200) {
          // if (res.data.code == 9999 || res.data.code == 9998) {
          //   wx.navigateTo({
          //     url: '/pages/login/index'
          //   })
          // } else 
          if(res.data.code == 400) {
            reject(res.data);
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }

      },
      fail: function (err) {
        reject(err)
        console.log("failed")
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  });
}

module.exports = {
  formatTime: formatTime,
  request: request
}
