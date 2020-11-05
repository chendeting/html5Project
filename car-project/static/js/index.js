/**
 * @description: 主页面js
 * @author: candy.d.chen
 * @LastEditors: candy.d.chen
 * @LastEditTime: 2020/10/28 16:51
 */
(function (factory) {
  if (typeof define === 'function' && (define.amd || define.cmd) && !jQuery) {
    // AMD或CMD
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = function (root, jQuery) {
      if (jQuery === undefined) {
        if (typeof window !== 'undefined') {
          jQuery = require('jquery');
        } else {
          jQuery = require('jquery')(root);
        }
      }
      factory(jQuery);
      return jQuery;
    };
  } else {
    //Browser globals
    factory(jQuery);
  }
})(function () {

  $.extend({
    /**
     * @return {string}
     */
    Request: function (m) {
      var sValue = location.search.match(
        new RegExp('[?&]' + m + '=([^&]*)(&?)', 'i')
      );
      return sValue
        ? decodeURIComponent(sValue[1])
        : decodeURIComponent(sValue);
    },
    UrlUpdateParams: function (url, name, value) {
      var r = url;
      if (r != null && r !== 'undefined' && r !== '') {
        value = encodeURIComponent(value);
        var reg = new RegExp('(^|)' + name + '=([^&]*)(|$)');
        var tmp = name + '=' + value;
        if (url.match(reg) != null) {
          r = url.replace(eval(reg), tmp);
        } else {
          if (url.match('[?]')) {
            r = url + '&' + tmp;
          } else {
            r = url + '?' + tmp;
          }
        }
      }
      return r;
    }
  });

  var _vin = $.Request('vin');
  var _baseUrl = 'http://www.chenji617425.top:8901/';

  function downApp() {
    var u = navigator.userAgent,
      isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
      isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      urls = {
        'android': 'http://www.chenji617425.top:8888:/myworks/carandroid.apk',
        'ios': 'http://www.chenji617425.top:8888:/myworks/carios.apk',
        'other': 'http://weixin.qq.com/d'
      };
    //三元运算
    window.location.href = isAndroid ? urls.android : isiOS ? urls.ios : urls.other;
    // //简化
    // if (isAndroid) {
    //   window.location.href = urls.android;
    // } else if (isiOS) {
    //   window.location.href = urls.ios;
    // } else {
    //   window.location.href = urls.other;
    // }
  }

  function goToRulePage() {
    window.location.href = './../page/rule.html';
  }

  template.defaults.imports.strFormat = function (data, keywordList) {
    var _str = '';
    if (data && data !== '' && data !== 'null' && data !== undefined) {
      if (keywordList && keywordList.length > 0) {
        for (var i = 0; i < keywordList.length; i++) {
          _str = setColor(data, keywordList[i].wenzi);
        }
      } else {
        _str = data;
      }
    }
    return _str;
  };

  template.defaults.imports.warningClassFormat = function (num, str) {
    return Number(num) < 5 ? str : '';
  };

  function setColor(data, keyword) {
    var Reg = new RegExp(keyword, 'i');
    var res = '';
    if (data) {
      res = data.replace(Reg, `<span style="color: red;">${keyword}</span>`);
      return res;
    }
  }

  function getPageData() {
    $.ajax({
      type: 'get',
      dataType: 'json',
      url: _baseUrl + 'get?vin=' + _vin,
      success: function (result) {
        var _baseInfoHtml,
          _reportProfileLevel,
          _vehicleProfileList,
          _reportProfileUnits,
          _repairRecordList,
          _maintenanceHistory,
          _mileageRecordTable,
          _reportProfileData;
        // console.log('candy--打印:res', result);
        if (result) {
          _baseInfoHtml = template && template('base-info-template', {
            TitleInfo: result.TitleInfo
          }) || '';
          _reportProfileLevel = template && template('report-profile-level-wrapper-template', {
            importantPartsClass: result.importantPartsClass
          }) || '';
          _vehicleProfileList = template && template('vehicle-profile-list-template', {
            carGeneral: result.carGeneral
          }) || '';
          _reportProfileUnits = template && template('report-profile-units-template', {
            carGeneral: result.carGeneral
          }) || '';
          _repairRecordList = template && template('time-line-list-template', {
            repairRecord: result.repairRecord,
            redFlag: result.redFlag
          }) || '';
          _maintenanceHistory = template && template('maintenance-history-template', {
            maintenancesRecord: result.maintenancesRecord,
            redFlag: result.redFlag
          }) || '';
          _mileageRecordTable = template && template('mileage-record-table-template', {
            mileage: result.mileage
          }) || '';
          _reportProfileData = template && template('report-profile-data-template', {
            carOwnerCherishment: result.carOwnerCherishment
          }) || '';
        }
        _baseInfoHtml && $('.base-info').html(_baseInfoHtml);
        _reportProfileLevel && $('.report-profile__level-wrapper').html(_reportProfileLevel);
        _vehicleProfileList && $('.vehicle-profile-list').html(_vehicleProfileList);
        _reportProfileUnits && $('.report-profile__units').html(_reportProfileUnits);
        _repairRecordList && $('.repair-record-list').html(_repairRecordList);
        _maintenanceHistory && $('.maintenance-history-list').html(_maintenanceHistory);
        _reportProfileData && $('.report-profile__datas').html(_reportProfileData);
        _mileageRecordTable && $('.mileage-record-table').html(_mileageRecordTable);
      }
    });
  }

  getPageData();

  // $("html,body").animate({scrollTop: $("#box").offset().top}, 1000); 锚点跳转

  $('.download-btn').on('click', function () {
    downApp();
  });

  $('.smooth').click(function () {
    var href = $(this).attr('href');
    var pos = $(href).offset().top;
    $('html,body').animate({scrollTop: pos}, 1000);
    return false;
  });

  $('.report-profile__rule-btn').on('click', function () {
    goToRulePage();
  });

  $('.accident-check__rule-btn').on('click', function () {
    goToRulePage();
  });

});
