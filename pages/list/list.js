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
    that.dataService()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {    
    let that = this
    that.setData({
      currentPage: 1
    })
    that.dataService()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this

    that.dataService()
  },

  dataService: function() {
    let that = this
    var page = that.data.currentPage
    if (page == 0) return

    wx.request({
      url: util.domain + '/api/list/' + that.data.alias + '/zh-hans?' + util.getParameter(page),
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        let last = res.data[res.data.length-1]
        var data = res.data
        var next_page = 0
        if (last.cat == 'more') {
          next_page = last.guid
          data.pop()          
        }
        let final_data = page > 1 ? that.data.lists.concat(data) : data
        console.log('next page -' + next_page + '- list count -' + final_data.length)
        that.setData({ 
          currentPage: next_page,       
          lists: final_data
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