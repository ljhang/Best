// list.js
const app = getApp()
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    alias: "",
    currentPage: 1,
    lists: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this

    that.setData({
      alias: options.alias
    })

    wx.setNavigationBarTitle({
      title: options.navTitle,
    })

    wx.request({
      url: util.domain + '/api/list/' + that.data.alias + '/zh-hans?' + util.getParameter(that.data.currentPage),
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          lists: res.data
        })
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {    
    let that = this

    that.setData({
      currentPage: 1
    })

    wx.request({
      url: util.domain + '/api/list/' + that.data.alias + '/zh-hans?' + util.getParameter(that.data.currentPage),
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          lists: res.data
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this

    that.setData({
      currentPage: that.data.currentPage
    })

    wx.request({
      url: util.domain + '/api/list/' + that.data.alias + '/zh-hans?' + util.getParameter(that.data.currentPage),
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          lists: that.data.lists.concat(res.data)
        })
      }
    })
  },

  /**
   * 点击查看图片详情
   */
  tappedPhotoItem: function(info) {
    console.log(info)
  },
})