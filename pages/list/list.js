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
    lists: [],
    expose_guid: 0
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
      currentPage: that.data.currentPage + 1
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
    
    var that = this;
    let tapped_guid = info.currentTarget.dataset.info.guid    
    var expose_guid = that.data.expose_guid;    
    that.setData({
      expose_guid: (tapped_guid == expose_guid ? 0 : tapped_guid)
    })
  },

  // 保存图片到本地
  save_cover: function(data) {
    let url = data.currentTarget.dataset.info.cover_hd
    wx.downloadFile({
      url: url,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功',
            })
          },
          fail(res) {
            wx.showToast({
              title: '保存失败',
            })
          }
        })
      }
    })
  },

  // 全屏预览图片
  preview_cover: function(data) {
    let url = data.currentTarget.dataset.info.cover_hd
    wx.previewImage({
      urls: [url],
    })
  },

  // 分享图片
  share_cover: function (data) {

  },

  // 展示位置
  located_cover: function (data) {
    let res = data.currentTarget.dataset.info
    wx.openLocation({
      latitude: res.latitude,
      longitude: res.longitude,
      scale: 8,      
    })
  },

})