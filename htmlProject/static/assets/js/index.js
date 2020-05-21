/**
 * @description: 页面逻辑
 * @author: candy.d.chen
 * @LastEditors: candy.d.chen
 * @LastEditTime: 2020/4/19 10:42
 */
/*页面url以及端口号配置*/

// var _pageUri = 'https://www.zkao46.com';
var _pageUri = 'http://132.232.222.50:8686';
// var _wsUri = 'wss://www.zkao46.com';
var _wsUri = 'ws://132.232.222.50:8686';


var loading = true;
var timer = null;
var ws = null;


$(function () {

    function longSock() {
        var lockReconnect = false; //避免重复连接
        var timeoutFlag = true;
        var timeoutSet = null;
        var timerSocketRe = null;
        var reconnectNum = 0;
        var timeout = 30000; //超时重连间隔
        var Max = 15; //重连次数

        var heartCheck = {
            timeout: 60000,  //  心跳检测时长
            timeoutObj: null, // 定时变量
            serverTimeoutObj: null,
            reset: function () { // 重置定时
                clearTimeout(this.timeoutObj);
                clearTimeout(this.serverTimeoutObj);
                return this;
            },
            start: function () { // 开启定时
                var self = this;
                var count = 0;
                // 心跳时间内收不到消息，主动触发连接关闭，开始重连
                self.timeoutObj = setTimeout(function () {
                    if (count < Max) {
                        ws.send("HeartBeat");
                        count++;
                    } else {
                        clearInterval(this.timeoutObj);
                        count = 0;
                        ws.close();
                    }
                }, this.timeout)
            }
        };

        function reconnect() {
            if (lockReconnect) return;
            lockReconnect = true;
            //没连接上会一直重连，设置延迟避免请求过多
            if (reconnectNum < Max) {
                timerSocketRe = setTimeout(function () {
                    timeoutFlag = true;
                    createWebSocket();
                    console.info(`正在重连第${reconnectNum + 1}次`)
                    reconnectNum++;
                    lockReconnect = false
                }, 5000) //这里设置重连间隔(ms)
            } else if (reconnectNum >= Max || ws.readyState === 1) {
                clearTimeout(timerSocketRe);
            }
        }

        // 实例websocket
        function createWebSocket() {
            try {
                console.info(`创建11`)
                timeoutSet = setTimeout(() => {
                    if (timeoutFlag && reconnectNum < Max) {
                        console.info(`重连22`);
                        reconnectNum++;
                        createWebSocket();
                    }
                }, timeout);
                if ('WebSocket' in window) {
                    ws = new WebSocket(_wsUri + "/web2/ws");
                } else if ('MozWebSocket' in window) {
                    ws = new MozWebSocket(_wsUri + "/web2/ws");
                } else {
                    alert("当前浏览器不支持websocket协议,建议使用现代浏览器")
                }
                initEventHandle();
            } catch (e) {
                reconnect(_wsUri + "/web2/ws");
            }
        }

        function initEventHandle() {
            ws.onopen = function () {
                heartCheck.reset().start();
                clearTimeout(timeoutSet);
                reconnectNum = 0;
                timeoutFlag = false;
            };
            ws.onmessage = function (evt) {
                heartCheck.reset().start();
                setMessageInnerHTML(evt.data);
            };
            ws.onclose = function (e) {
                console.info(`关闭11`, e.code);
                clearTimeout(timeoutSet);
                timeoutFlag = false;
                reconnect();
            };
            ws.onerror = function () {
                console.info(`错误11`);
                reconnect() //重连
            }
        }

        createWebSocket();
    }

    longSock();

    //关闭WebSocket连接
    function closeWebSocket() {
        ws.close();
    }

    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function () {
        closeWebSocket();
    };

    function diffTime() {
        if (document.hidden) {
            closeWebSocket();
        } else {
            longSock();
        }
    }

    window.addEventListener('visibilitychange', diffTime);
    window.removeEventListener('visibilitychange', diffTime);


    //将消息显示在网页上
    function setMessageInnerHTML(innerHTML) {
        getTwoData(innerHTML);
    }

    function rendTitle(result) {
        var _strT = '<div class="flex justify-content-center align-items-center common-title" style="background: #' + result.titlebkC + '">' +
            '<h1 class="ft-14" style="color: #' + result.titleC + '">' + result.title + '</h1>' +
            '</div>';
        return result && result.title ? _strT : ''
    }

    function setTimer(intDiff) {
        var timeInterval = null;
        // if (intDiff) {
        window.clearInterval(timeInterval);
        timeInterval = window.setInterval(function () {
            var day = 0,
                hour = 0,
                minute = 0,
                second = 0;//时间默认值
            if (intDiff > 0) {
                day = Math.floor(intDiff / (60 * 60 * 24));
                hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
                minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
                second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
            }

            if (minute <= 9) minute = '0' + minute;
            if (second <= 9) second = '0' + second;
            if (day > 0) {
                hour = day * 24 + hour;
            } else if (hour <= 9) {
                hour = '0' + hour;
            }
            $('#hour_show').html(hour + ':');
            $('#minute_show').html(minute + ':');
            $('#second_show').html(second);
            intDiff--;
            if (intDiff < 0) {
                window.clearInterval(timeInterval);
            }
        }, 1000);
        // }
    }

    function renderLongImg() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=advert",
            success: function (res) {
                if (res) {
                    for (var d = 0; d < res.length; d++) {
                        $('.longImg').eq(d).html('<img src="' + res[d].url + '" class="module" />')
                    }
                }
            }
        });
    }

    renderLongImg();

    function getOneData() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=0",
            success: function (res) {
                if (res) {
                    $('title').html(res.name)
                }
            }
        });
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=1",
            success: function (res1) {
                if (res1) {
                    $('.top-img').attr('src', res1.name + '?' + Math.random());
                }
            }
        });
    }

    getOneData();

    function getTwoData(res) {
        $('#twoWebSocket').html('');
        var data = res ? $.parseJSON(String(res)) : null;

        if (data) {
            var twohtml = '';
            var t1 = '';
            var t2 = '';
            var t3 = '';
            var _list = '';
            var _data = data.data;
            var intDiff = parseInt(data.dtime);
            setTimer(intDiff);
            for (var j = 0; j < 8; j++) {
                var str = '';
                if (j === 6) {
                    _list += '<li class="flex flex-column flex-shrink-0 two-list-add justify-content-center align-items-center">' +
                        '<span class="cl_red">+</span>' +
                        '</li>'
                } else {
                    if (j === 7) {
                        if (_data[j - 1]) {
                            _list += '<li class="two-list-content flex-shrink-0">' +
                                '<div class="flex flex-column justify-content-center align-items-center"' +
                                'style="background: #' + _data[j - 1].codeC + '">' +
                                '<span class="first-text">' + _data[j - 1].code + '</span>' +
                                '<span class="first-text-t">' + _data[j - 1].codeT + '</span>' +
                                '</div>' +
                                '</li>'
                        } else {
                            _list += '<li class="two-list-content flex-shrink-0">' + '</li>'
                        }
                    } else {
                        if (_data[j]) {
                            _list += '<li class="two-list-content flex-shrink-0">' +
                                '<div class="flex flex-column justify-content-center align-items-center"' +
                                'style="background: #' + _data[j].codeC + '">' +
                                '<span class="first-text">' + _data[j].code + '</span>' +
                                '<span class="first-text-t">' + _data[j].codeT + '</span>' +
                                '</div>' +
                                '</li>'
                        } else {
                            _list += '<li class="two-list-content flex-shrink-0">' + '</li>'
                        }
                    }
                }
                _list += str
            }
            // '<span>' + data.title[0].t + '</span>'
            if (data.title && data.title.length > 0) {
                t1 += data.title[0] && data.title[0].t ? data.title[0].t.replace(data.title[0].codeT, '<span style="color: #' + data.title[0].codeC + '">' + data.title[0].codeT + '</span>') : '';
                t2 += data.title[1] && data.title[0].t ? '<span class="two-t2">' + data.title[1].t + '</span>' : '';
                t3 += data.title[2] && data.title[2].t ? data.title[2].t.replace(data.title[2].codeT, '<span style="color: #' + data.title[2].codeC + '">' + data.title[2].codeT + '</span>') : '';


            }
            twohtml += '<div class="mt-40 section"><div class="two-content">\n' +
                '<div class="flex flex-fill flex-column" style="width: 60%;"><div class="two-t1">' + t1 + '</div>' + t2 + '</div>' +
                '<div class="flex justify-content-center align-items-center">' +
                '<ul class="flex flex-fill justify-content-center align-items-center two-content-lists ">' + _list + '</ul></div>' +
                '        </div>\n' +
                '        <div class="flex align-items-center"><div class="two-t3">' + t3 + '</div>' +
                '        </div></div>';
            $('#twoWebSocket').html(twohtml);
        }
    }

    // getTwoData();

    function getFourData() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=4",
            success: function (result) {
                if (result) {
                    var _fourT = rendTitle(result);
                    var _fourLi = '';
                    for (var four = 0; four < result.data.length; four++) {
                        _fourLi += '<li class="list-item flex">' +
                            '<div class="item-text flex flex-shrink-0 justify-content-center align-items-center">' +
                            '<img class="flex-shrink-0" src="./../static/assets/images/four.gif" alt="">' +
                            '<a href="' + result.data[four].f1 + '" target="_blank">' + result.data[four].a1 + '</a>' +
                            '</div>' +
                            '<div class="item-text flex flex-shrink-0 justify-content-center align-items-center">' +
                            '<img class="flex-shrink-0" src="./../static/assets/images/four.gif" alt="">' +
                            '<a href="' + result.data[four].f2 + '" target="_blank">' + result.data[four].a2 + '</a>' +
                            '</div>' +
                            '<div class="item-text flex flex-shrink-0 justify-content-center align-items-center">' +
                            '<img class="flex-shrink-0" src="./../static/assets/images/four.gif" alt="">' +
                            '<a href="' + result.data[four].f3 + '" target="_blank">' + result.data[four].a3 + '</a>' +
                            '</div>' +
                            '</li>'
                    }
                    var fourHtml = '<div class="mt-40 section">\n' + _fourT +
                        '<ul class="four-list-content">' + _fourLi + '</ul>' +
                        '</div>';
                    $('#fourBox').html(fourHtml);
                }
            }
        });
    }

    getFourData();

    function getFiveData() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=5",
            success: function (result) {
                if (result) {
                    var _fiveLi = '';
                    for (var five = 0; five < result.length; five++) {
                        _fiveLi += '<li class="five-list-item">' +
                            '<img class="flex-shrink-0" src="' + result[five].fn + '?' + Math.random() + '" alt="">' +
                            '</li>'
                    }
                    var fiveHtml = '<div class="mt-40 section">\n' +
                        '<ul class="five-list-content flex flex-fill justify-content-center align-items-center flex-wrap">' + _fiveLi + '</ul>' +
                        '</div>';
                    $('#fiveBox').html(fiveHtml);
                }
            }
        });
    }

    // getFiveData();

    function getSixData() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=6",
            success: function (result) {
                if (result) {
                    var _sixT = rendTitle(result);
                    var _sixLi = '';
                    for (var six = 0; six < result.data.length; six++) {
                        _sixLi += '<li class="list-item flex">' +
                            '<div class="item-text bg-F0E68C six-list-item1 flex flex-column flex-shrink-0 justify-content-center align-items-center">' +
                            '<img class="flex-shrink-0" src="./../static/assets/images/six.gif" alt="">' +
                            '<span>' + result.data[six].a1 + '</span>' +
                            '</div>' +
                            '<div class="item-text bg-ADFF2F six-list-item2 flex flex-shrink-0 justify-content-center align-items-center">' +
                            '<span>' + result.data[six].a2 + '</span>' +
                            '</div>' +
                            '<div class="item-text bg-F0E68C six-list-item3 flex flex-fill justify-content-center align-items-center">' +
                            '<span>' + result.data[six].a3 + '</span>' +
                            '</div>' +
                            '</li>'
                    }
                    var sixHtml = '<div class="mt-40 section">\n' + _sixT +
                        '<ul class="six-list-content">\n' + _sixLi + '</ul>' +
                        '</div>';
                    $('#sixBox').html(sixHtml);
                }
            }
        });
    }

    // getSixData();

    function getSevenData() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=7",
            success: function (result) {
                if (result) {
                    var _sevenT = rendTitle(result);
                    var _sevenLi = '';
                    for (var seven = 0; seven < result.data.length; seven++) {
                        _sevenLi += '<li class="list-item flex">' +
                            '<div class="item-text seven-list-item1 flex flex-fill justify-content-center align-items-center">' +
                            '<span>' + result.data[seven].a1 + '</span>' +
                            '</div>' +
                            '<div class="item-text seven-list-item2 flex flex-fill align-items-center">' +
                            '<img class="flex-shrink-0" src="./../static/assets/images/seven.gif" alt="">' +
                            '<a href="' + result.data[seven].f2 + '" target="_blank">' + result.data[seven].a2 + '</a>' +
                            '</div>' +
                            '<div class="item-text seven-list-item3 flex flex-fill justify-content-center align-items-center">' +
                            '<span>' + result.data[seven].a3 + '</span>' +
                            '</div>' +
                            '</li>'
                    }
                    var sevenHtml = '<div class="mt-40 section">\n' + _sevenT +
                        '<ul class="seven-list-content">\n' + _sevenLi + '</ul>\n' +
                        '</div>';
                    $('#sevenBox').html(sevenHtml);
                }
            }
        });
    }

    // getSevenData();

    function getEightData() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=8",
            success: function (result) {
                if (result) {
                    var _eightLi = '';
                    for (var eight = 0; eight < result.length; eight++) {
                        _eightLi += '<li class="eight-list">' +
                            '<a href="' + result[eight].f + '" target="_blank">' + result[eight].t + '</a>' +
                            '</li>'
                    }
                    var eightHtml = '<ul class="flex justify-content-center align-items-center">\n' + _eightLi + '</ul>';
                    $('#eightBox').html(eightHtml);
                }
            }
        });
    }

    getEightData();

    function renderText(_cn1) {
        var _cn1T = '';
        if ($.isArray(_cn1)) {
            for (var c = 0; c < _cn1.length; c++) {
                var _res = _cn1[c].nr
                if (_cn1[c].code1) {
                    _res = _res.replace(_cn1[c].code1, '<span style="color: #' + _cn1[c].codeC1 + '">' + _cn1[c].code1 + '</span>')
                }
                if (_cn1[c].code2) {
                    _res = _res.replace(_cn1[c].code2, '<span style="color: #' + _cn1[c].codeC2 + '">' + _cn1[c].code2 + '</span>')
                }
                if (_cn1[c].code3) {
                    _res = _res.replace(_cn1[c].code3, '<span style="color: #' + _cn1[c].codeC3 + '">' + _cn1[c].code3 + '</span>')
                }
                if (_cn1[c].code4) {
                    _res = _res.replace(_cn1[c].code4, '<span style="color: #' + _cn1[c].codeC4 + '">' + _cn1[c].code4 + '</span>')
                }
                if (_cn1[c].code5) {
                    _res = _res.replace(_cn1[c].code5, '<span style="color: #' + _cn1[c].codeC5 + '">' + _cn1[c].code5 + '</span>')
                }
                if (_cn1[c].code6) {
                    _res = _res.replace(_cn1[c].code6, '<span style="color: #' + _cn1[c].codeC6 + '">' + _cn1[c].code6 + '</span>')
                }
                _cn1T += '<div class="ten-list-item">' + _res + '</div>'
            }
        } else {
            var _res = _cn1.nr
            if (_cn1.code1) {
                _res = _res.replace(_cn1.code1, '<span style="color: #' + _cn1.codeC1 + '">' + _cn1.code1 + '</span>')
            }
            if (_cn1.code2) {
                _res = _res.replace(_cn1.code2, '<span style="color: #' + _cn1.codeC2 + '">' + _cn1.code2 + '</span>')
            }
            if (_cn1.code3) {
                _res = _res.replace(_cn1.code3, '<span style="color: #' + _cn1.codeC3 + '">' + _cn1.code3 + '</span>')
            }
            if (_cn1.code4) {
                _res = _res.replace(_cn1.code4, '<span style="color: #' + _cn1.codeC4 + '">' + _cn1.code4 + '</span>')
            }
            if (_cn1.code5) {
                _res = _res.replace(_cn1.code5, '<span style="color: #' + _cn1.codeC5 + '">' + _cn1.code5 + '</span>')
            }
            if (_cn1.code6) {
                _res = _res.replace(_cn1.code6, '<span style="color: #' + _cn1.codeC6 + '">' + _cn1.code6 + '</span>')
            }
            _cn1T += '<div class="ten-list-item">' + _res + '</div>'
        }
        return _cn1T;
    }

    function getDoubleList(result) {
        var _SixColorLi = '';
        var dataTest = result;
        for (var t = 0; t < dataTest.data.length; t++) {
            var _str = dataTest.data[t];
            var _title = renderText(_str);
            _SixColorLi += '<div class="ten-list">' + _title + '</div>';
        }
        var _SixColorT = rendTitle(result);
        var _advert = []
        _advert.push(result.advert)
        var _footer = '<div class="ten-list flex justify-content-center"><img class="advert-img" src="./../static/assets/images/wei.gif" />' + renderText(_advert) + '</div>'
        return '<div class="mt-40 section">\n' + _SixColorT +
            '<ul class="four-list-content">' + _SixColorLi + '</ul>' + _footer +
            '</div>';
    }

    function getSingleList(result) {
        var _ThreeColorLi = '';
        for (var t = 0; t < result.data.length; t++) {
            var _str = result.data[t];
            var _title = '';
            var _res = _str.nr;
            if (_str.code1) {
                _res = _res.replace(_str.code1, '<span style="color: #' + _str.codeC1 + '">' + _str.code1 + '</span>')
            }
            if (_str.code2) {
                _res = _res.replace(_str.code2, '<span style="color: #' + _str.codeC2 + '">' + _str.code2 + '</span>')
            }
            if (_str.code3) {
                _res = _res.replace(_str.code3, '<span style="color: #' + _str.codeC3 + '">' + _str.code3 + '</span>')
            }
            if (_str.code4) {
                _res = _res.replace(_str.code4, '<span style="color: #' + _str.codeC4 + '">' + _str.code4 + '</span>')
            }
            if (_str.code5) {
                _res = _res.replace(_str.code5, '<span style="color: #' + _str.codeC5 + '">' + _str.code5 + '</span>')
            }
            if (_str.code6) {
                _res = _res.replace(_str.code6, '<span style="color: #' + _str.codeC6 + '">' + _str.code6 + '</span>')
            }
            _title += '<div class="ten-list-item">' + _res + '</div>'
            _ThreeColorLi += '<div class="ten-list">' + _title + '</div>';
        }
        var _ThreeColorT = rendTitle(result);
        var _advert = []
        _advert.push(result.advert)
        var _footer = '<div class="ten-list flex justify-content-center"><img class="advert-img" src="./../static/assets/images/wei.gif" />' + renderText(_advert) + '</div>'

        return '<div class="mt-40 section">\n' + _ThreeColorT +
            '<ul class="four-list-content">' + _ThreeColorLi + '</ul>' + _footer +
            '</div>';
    }

    function getTenData() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=yqjt",
            success: function (result) {
                if (result) {
                    $('#tenBox').html(getDoubleList(result));
                }
            }
        });
    }

    getTenData();

    function getElevenData() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=chenpingpt",
            success: function (result) {
                if (result) {
                    $('#elevenBox').html(getSingleList(result));
                }
            }
        });
    }

    getElevenData();

    function getFourteenData() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=mhtmw",
            success: function (result) {
                if (result) {
                    $('#fourteenBox').html(getDoubleList(result));
                }
            }
        });
    }

    getFourteenData();

    function getFifteenData() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=jytwox",
            success: function (result) {
                if (result) {
                    $('#fifteenBox').html(getSingleList(result));
                }
            }
        });
    }

    getFifteenData();

    function getSixteenData() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=threeqbz",
            success: function (result) {
                if (result) {
                    $('#sixteenBox').html(getDoubleList(result));
                }
            }
        });
    }

    getSixteenData();

    function getSeventeenData() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=jingguangs",
            success: function (result) {
                if (result) {
                    var _seventeenTLi = '';
                    for (var t = 0; t < result.data.length; t++) {
                        var _cn1 = result.data[t].cn1 ? result.data[t].cn1 : [];
                        var _cn2 = result.data[t].cn2 ? result.data[t].cn2 : [];
                        var _cn1T = renderText(_cn1);
                        var _cn2T = renderText(_cn2);
                        _seventeenTLi += '<div class="seventeen-list flex justify-content-center align-items-center">' +
                            '<div class="seventeen-list-item1 flex-fill flex-shrink-0 flex flex-column">' + _cn1T + '</div>' +
                            '<div class="seventeen-list-item2 flex-shrink-0">' + _cn2T + '</div>' +
                            '</div>';
                    }
                    var _seventeenT = '<div class="flex justify-content-center align-items-center common-title" style="background: #' + result.titlebkC + '">' +
                        '<h1 class="ft-14" style="color: #' + result.titleC + '">' + result.title + '</h1>' +
                        '</div>';
                    var seventeenHtml = '<div class="mt-40 section">\n' + _seventeenT +
                        '<ul class="four-list-content">' + _seventeenTLi + '</ul>' +
                        '</div>';
                    $('#seventeenBox').html(seventeenHtml);
                }
            }
        });
    }

    getSeventeenData();

    function getEighteenData() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=jueshabb",
            success: function (result) {
                if (result) {
                    $('#eighteenBox').html(getSingleList(result));
                }
            }
        });
    }

    getEighteenData();

    function getNineteenData() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=jueshawm",
            success: function (result) {
                if (result) {
                    $('#nineteenBox').html(getSingleList(result));
                }
            }
        });
    }

    getNineteenData();

    function getTwentyData() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=jiebobx",
            success: function (result) {
                if (result) {
                    $('#twentyBox').html(getSingleList(result));
                }
            }
        });
    }

    getTwentyData();

    function getTwentyOneData() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=jixiaojima",
            success: function (result) {
                if (result) {
                    $('#twentyOneBox').html(getSingleList(result));
                }
            }
        });
    }

    getTwentyOneData();

    function getTwentyTwoData() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=jinxuanst",
            success: function (result) {
                if (result) {
                    $('#twentyTwoBox').html(getSingleList(result));
                }
            }
        });
    }

    getTwentyTwoData();

    function getTwentyThreeData() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=wenzhongqw",
            success: function (result) {
                if (result) {
                    $('#twentyThreeBox').html(getSingleList(result));
                }
            }
        });
    }

    getTwentyThreeData();

    function getTwentyFourData() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=changgenby",
            success: function (result) {
                if (result) {
                    $('#twentyFourBox').html(getSingleList(result));
                }
            }
        });
    }

    getTwentyFourData();


// 预留区 1
    function getTwentyFiveData() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=yuliuqu1",
            success: function (result) {
                if (result && result.title) {
                    var _longImg = ' <div class="content-box">\n' +
                        '        <div class="mt-40 section flex justify-content-center align-items-center longImg"></div>\n' +
                        '    </div>';
                    var _con = _longImg + '<div class="content-box">' + getSingleList(result) + '</div>';
                    $('#twentyFiveBox').html(_con);
                }
            }
        });
    }

    getTwentyFiveData();

// 预留区 2

    function getTwentySixData() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=yuliuqu2",
            success: function (result) {
                if (result && result.title) {
                    var _longImg = ' <div class="content-box">\n' +
                        '        <div class="mt-40 section flex justify-content-center align-items-center longImg"></div>\n' +
                        '    </div>';
                    var _con = _longImg + '<div class="content-box">' + getSingleList(result) + '</div>';
                    $('#twentySixBox').html(_con);
                }
            }
        });
    }

    getTwentySixData();

    function getTwentyEightData() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=kantujm",
            success: function (result) {
                if (result) {
                    var data = result.data
                    var _twentyFiveColorT = '<div class="flex justify-content-center align-items-center common-title" style="background: #' + result.titlebkC + '">' +
                        '<h1 class="ft-14" style="color: #' + result.titleC + '">' + result.title + '</h1>' +
                        '</div>';
                    var _twentyFiveLi = ''
                    for (var k = 0; k < data.length; k++) {
                        _twentyFiveLi += '<li class="twenty-five-item flex-shrink-0">' +
                            '<a class="twenty-five-btn" href="./../../page/review.html?name=' + data[k].nr + '" target="_blank">' +
                            data[k].nr + '</a></li>'
                    }
                    var _twentyFiveHtml = '<div class="mt-40 section">\n' + _twentyFiveColorT +
                        '<ul class="flex flex-wrap justify-content-center align-items-center">' + _twentyFiveLi + '</ul>' +
                        '</div>'
                    $('#twentyEightBox').html(_twentyFiveHtml);
                }
            }
        });
    }

    getTwentyEightData();

    function setTwentyNineListItem(data) {
        var _itemT = '<div class="twenty-six-item-title">' + renderText(data.t) + '</div>';
        var _itemLi = '';
        for (var item = 0; item < data.cn1.length; item++) {
            _itemLi += '<li class="twenty-six-list flex">' +
                '<div class="twenty-six-item1 flex-shrink-0 flex align-items-center justify-content-center">' + renderText(data.cn1[item]) + '</div>' +
                '<div class="twenty-six-item2 flex-shrink-0 flex align-items-center justify-content-center">' + renderText(data.cn2[item]) + '</div>' +
                '<div class="twenty-six-item1 flex-shrink-0 flex align-items-center justify-content-center">' + renderText(data.cn3[item]) + '</div>' +
                '<div class="twenty-six-item2 flex-shrink-0 flex align-items-center justify-content-center">' + renderText(data.cn4[item]) + '</div>' +
                '<div class="twenty-six-item1 flex-shrink-0 flex align-items-center justify-content-center">' + renderText(data.cn5[item]) + '</div>' +
                '<div class="twenty-six-item2 flex-shrink-0 flex align-items-center justify-content-center">' + renderText(data.cn6[item]) + '</div></li>'
        }

        return _itemT + '<ul>' + _itemLi +
            '</ul>';
    }

    function getTwentyNineData() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=threemzt",
            success: function (result) {
                if (result) {
                    var data = result.data
                    var _twentySixColorT = '<div class="flex justify-content-center align-items-center common-title" style="background: #' + result.titlebkC + '">' +
                        '<h1 class="ft-14" style="color: #' + result.titleC + '">' + result.title + '</h1>' +
                        '</div>';
                    var _twentyFiveLi = ''
                    for (var k = 0; k < data.length; k++) {
                        _twentyFiveLi += setTwentyNineListItem(data[k])
                    }
                    var _twentyFiveHtml = '<div class="mt-40 section">\n' + _twentySixColorT +
                        '<ul>' + _twentyFiveLi + '</ul>' +
                        '</div>'
                    $('#twentyNineBox').html(_twentyFiveHtml);
                }
            }
        });
    }

    getTwentyNineData();

    function getModalCn2(data) {
        var str = '';
        for (var aThreeCn2 = 0; aThreeCn2 < data.length; aThreeCn2++) {
            str += '<div class="center-list-item flex flex-column justify-content-center align-items-center" style="background: #' + data[aThreeCn2].codeC + '">' +
                '<span class="first-text">' + data[aThreeCn2].code + '</span>' +
                '<span class="first-text-t">' + data[aThreeCn2].codeT + '</span>' +
                '</div>'
        }
        return str;
    }

    function getModalCn3(data) {
        return '<div class="item-text column1 two-list-modal-content flex flex-shrink-0 justify-content-center align-items-center">' +
            '<div class="center-list-item flex flex-column justify-content-center align-items-center" style="background: #' + data.codeC + '">' +
            '<span class="first-text">' + data.code + '</span>' +
            '<span class="first-text-t">' + data.codeT + '</span>' +
            '</div>' +
            '</div>';
    }

    function getThreeModelData() {
        var year = 0;
        $('#myModalLabel').html('');
        $('#yearWrapper').html('');
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=3",
            success: function (result) {
                if (result) {
                    $('#myModalLabel').html('开奖历史');
                    var _index = result.data.length > 0 ? result.data.length - 1 : 0;
                    var _threeLi = '';
                    // result.data = [{y:'2020'}, {y:'2018'}, {y:'2019'}];
                    for (var three = 0; three < result.data.length; three++) {
                        _threeLi += '<span class="yearBtn" data-year="' + result.data[three].y + '">' + result.data[three].y + '</span>'
                    }
                    var threeHtml = '<div class="mt-40 section">\n' +
                        '<div class="flex">\n' +
                        '<div class="three-list-content flex flex-wrap align-items-center">\n' + _threeLi + '</div>\n' +
                        '</div>\n' +
                        '</div>';

                    $('#yearWrapper').html(threeHtml);
                    year = result.data[_index].y;
                    $('.yearBtn').eq(_index).addClass('active');
                    $('.yearBtn').on('click', function () {
                        var _y = $(this).attr('data-year');
                        $('.yearBtn').removeClass('active');
                        $(this).addClass('active');
                        console.log('candy--打印:yearBtn', _y)
                        getgetThreeModelList(_y);
                    })
                    if (year) {
                        getgetThreeModelList(year);
                    }
                }
            }
        });
    }

    function getgetThreeModelList(year) {
        loading = true;
        $('#loading').show();
        $('#threeModelContentTitle').html('');
        $('#aThreeModalTitle').html('');
        $('#aThreeModal').html('');
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=a3&year=" + year,
            success: function (result) {
                if (result) {
                    $('#threeModelContentTitle').html(result.t1);
                    var _aThreeBodyHeader = '<li class="list-item flex">\n' +
                        '<div class="item-text column1 flex flex-shrink-0 justify-content-center align-items-center">\n' +
                        '<span>' + result.cn1 + '</span>\n' +
                        '</div>\n' +
                        '<div class="item-text flex flex-fill justify-content-center align-items-center">\n' +
                        '<span>' + result.cn2 + '</span>\n' +
                        '</div>\n' +
                        '<div class="item-text column1 flex flex-shrink-0 justify-content-center align-items-center">\n' +
                        '<span>' + result.cn3 + '</span>\n' +
                        '</div>\n' +
                        '</li>\n';
                    $('#aThreeModalTitle').html(_aThreeBodyHeader);
                    var _aThreeBody = '';
                    var _aThreeData = result.data;
                    for (var aThree = 0; aThree < _aThreeData.length; aThree++) {
                        _aThreeBody += '<li class="list-item flex">\n' +
                            '<div class="item-text column1 flex flex-shrink-0 justify-content-center align-items-center">\n' +
                            '<span>' + _aThreeData[aThree].qs + '</span>\n' +
                            '</div><div class="item-text flex flex-fill two-list-modal-content justify-content-center align-items-center">' +
                            getModalCn2(_aThreeData[aThree].cn2) + '</div>' + getModalCn3(_aThreeData[aThree].cn3) +
                            '</li>\n'
                    }
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        $('#loading').hide();
                        $('#aThreeModal').append(_aThreeBody);
                        loading = false;
                    }, 600)
                }
            }
        });
    };
    $('#myModal').on('show.bs.modal', function (event) {
        // var button = $(event.relatedTarget) // 触发事件的按钮
        // year = button.data('year'); // 解析出data-whatever内容
        getThreeModelData();
    });

    function renderImg(data) {
        var bili = (data.hight / data.width) * 100 + '%';
        return '<a class="imgLink" href="' + data.urlbig + '" target="_blank" style="padding-bottom: ' + bili + '"><img src="' + data.urlsmall + '" /></a>'
    }

    function getAllImgData() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=tupianqu",
            success: function (result) {
                if (result && result.data) {
                    $('#imgBox1').html(renderImg(result.data[0]));
                    $('#imgBox2').html(renderImg(result.data[1]));
                    $('#imgBox3').html(renderImg(result.data[2]));
                    $('#imgBox4').html(renderImg(result.data[3]));
                    $('#imgBox5').html(renderImg(result.data[4]));
                    $('#imgBox6').html(renderImg(result.data[5]));
                    $('#imgBox7').html(renderImg(result.data[6]));
                    $('#imgBox8').html(renderImg(result.data[7]));
                    $('#imgBox9').html(renderImg(result.data[8]));
                    $('#imgBox10').html(renderImg(result.data[9]));
                    $('#imgBox11').html(renderImg(result.data[10]));
                    $('#imgBox12').html(renderImg(result.data[11]));
                    $('#imgBox13').html(renderImg(result.data[12]));
                }
            }
        });
    }

    getAllImgData();

    function getNotifyBoxData() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: _pageUri + "/myworks/WyInterFaceNew.bin?zone=tongzhi",
            success: function (result) {
                if (result) {
                    var _notifyLi = '';
                    for (var n = 0; n < result.data.length; n++) {
                        _notifyLi += renderText(result.data[n]);
                    }
                    var notifyHtml = '<div class="mt-40">\n' +
                        '<ul class="flex flex-column justify-content-center align-items-center p-40" style="background: #' + result.bkC + ';">' + _notifyLi + '</ul>' +
                        '</div>';
                    $('#notifyBox').html(notifyHtml);
                }
            }
        });
    }

    getNotifyBoxData();
});

