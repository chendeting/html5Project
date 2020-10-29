/**
 * @description: 主页面js
 * @author: candy.d.chen
 * @LastEditors: candy.d.chen
 * @LastEditTime: 2020/10/28 16:51
 */
$(function () {
  var _baseUrl = "http://www.chenji617425.top:8901/"
  function getPageData() {
    $.ajax({
      type: "get",
      dataType: "json",
      url: _baseUrl + "get?vin=WBA5A3100FD752296",
      success: function (res) {
        console.log('candy--打印:res', res);
      }
    });
  }
  getPageData();
})
