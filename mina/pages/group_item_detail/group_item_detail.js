// pages/group_item_detail/group_item_detail.js
var app = getApp();
var lay_load = true;
import F2 from '../../f2-canvas/lib/f2';

let chart = null;

function initChart(canvas, width, height) { // 使用 F2 绘制图表
  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
  return chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    res_data:[],
    level:null,
    noMore: true,
    show_model: true,
    pages: 0,
    opts: {
      onInit: initChart
    },
    chart_data : [
      { year: '9月\n2018年', sales: 8860.50 },
      { year: '10月\n2018年', sales: 5860.50 },
      { year: '11月\n2018年', sales: 5860.50 },
      { year: '12月\n2018年', sales: 8860.50 },
        { year: '8月\n2018年', sales: 9860.50 },
    ],
    time_number:null,
    price_number:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let that =this;
    let level = options.level;
    wx.request({
      url: app.globalData.domain + '/pages/group_item_detail', // 仅为示例，并非真实的接口地址
      data: {
        open_id: "test",
        level_id: level,
        pages: that.data.pages
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=> {
        that.setData({
          res_data: res.data.data,
          level: level
        })
      }
    })

    // 获取数据
    that.setData({
      time_number: that.data.chart_data[0].year,
      price_number: that.data.chart_data[0].sales
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.chartSourceRender()
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
    // let that = this
    // console.log(that.data.level)
    // that.setData({
    //   show_model: false
    // })
    // let time = null
    // if (lay_load) {
    //   lay_load = false
    //   wx.request({
    //     url: "http://localhost:8000/pages/group_item_detail",
    //     data: {
    //       open_id: "",
    //       level_id: that.data.level,
    //       pages: that.data.pages+1
    //     },
    //     success: function (res) {
    //       console.log(res.data.data)
    //       if (res.data.code == 200) {
    //         if (res.data.data.length < 10) {
    //           clearTimeout(time)
    //           that.setData({
    //             res_data: that.data.res_data.concat(res.data.data),
    //             noMore: false,
    //             show_model: true,
    //           })
    //           time = setTimeout(function () {
    //             that.setData({
    //               noMore: true
    //             })
    //             wx.hideLoading()
    //           }, 1000)
    //         }
    //         else {
    //           that.setData({
    //             res_data: that.data.res_data.concat(res.data.data),
    //             pages: that.data.pages + 1
    //           })
    //         }
    //       }
    //       console.log(res)

    //       lay_load = true
    //     }
    //   })
    // }
    // else {
    //   console.log('还没加载完呢')
    // }


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  selectTab:function(e){
    let level = e.currentTarget.dataset.level;
    let that = this;
    wx.request({
      url: 'http://localhost:8000/pages/group_item_detail', // 仅为示例，并非真实的接口地址
      data: {
        open_id: "",
        level_id: level,
        pages: 0
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=> {
        this.setData({
          res_data: res.data.data,
          nowTab: level,
          pages:0
        })
      }
    })
  },
  chartSourceRender:function(){
    let data = this.data.chart_data;
    let that = this;
    chart.source(data, {
      sales: {
        tickCount: 5
      }
    });
    chart.tooltip(false);
    chart.interval().position('year*sales');
    chart.render();

    // 绘制柱状图文本
    var offset = -5;
    var canvas = chart.get('canvas');
    var group = canvas.addGroup();
    var shapes = {};
    data.map(function (obj) {
      var point = chart.getPosition(obj);
      var text = group.addShape('text', {
        attrs: {
          x: point.x,
          y: point.y + offset,
          text: obj.sales,
          textAlign: 'center',
          textBaseline: 'bottom',
          fill: '#808080',
          rotate: -1
        }
      });

      shapes[obj.year] = text; // 缓存该 shape, 便于后续查找
    });
    console.log(shapes)

    var lastTextShape = void -1; // 上一个被选中的 text
    // 配置柱状图点击交互
    chart.interaction('interval-select', {
      selectAxisStyle: {
        fill: '#000',
        fontWeight: 'bold'
      },
      mode: 'range',
      defaultSelected: data[0],
      onEnd: function onEnd(ev) {
        var data = ev.data,
          selected = ev.selected;
        lastTextShape && lastTextShape.attr({
          fill: '#808080',
          fontWeight: 'normal'
        });
        if (selected) {
          var textShape = shapes[data.year];
          textShape.attr({
            fill: '#000',
            fontWeight: 'bold'
          });
          lastTextShape = textShape;
          that.setData({
            time_number: data.year,
            price_number: data.sales
          })
        }
        canvas.draw();
      }
    });
  }
})