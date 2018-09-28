//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

Page({
  
  data: {
    categories: []
  },
  
  onLoad: function () {
    let that = this
    wx.request({
      url: util.domain + '/api/list/paper_plus_best/zh-hans?' + util.getParameter,
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          categories: res.data.filter(that.isNotHonored)
        })
      }
    })
  },
  
  // 过滤推荐栏目
  isNotHonored: function (dict) {
    return dict['title'] != 'Honored'
  },

  // 跳转到目录详情
  tappedCategoryList: function(info) {
    let alias = "alias=" + info.currentTarget.dataset.info.alias
    let title = "navTitle=" + info.currentTarget.dataset.info.title + "·" + info.currentTarget.dataset.info.name
    let parameter = [alias, title]
    wx.navigateTo({
      url: '../list/list?' + parameter.join('&'),
    })
  }
})
