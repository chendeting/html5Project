/*
包含n个日期时间处理的工具函数模块
*/

/*
  格式化日期
*/
export const formateDate =(time) => {
    if (!time) return '';
    let date = new Date(time);
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
};
/*
  格式化日期
*/
export const weekDay =(time) => {
    if (!time) return '';
    let date = new Date(time);
    let weekday = new Array(7);
    weekday[0] = "星期日";
    weekday[1] = "星期一";
    weekday[2] = "星期二";
    weekday[3] = "星期三";
    weekday[4] = "星期四";
    weekday[5] = "星期五";
    weekday[6] = "星期六";
    var nowDay = date.getDay()
    return weekday[nowDay]
};
/*
  格式化日期
*/
export const getTime = (time) => {
    if (!time) return '';
    let date = new Date(time);
    let Year = date.getFullYear()
    let Month = date.getMonth() + 1
    let Day = date.getDate()
    var Hours = date.getHours()
    var Min = date.getMinutes()
    var Sec = date.getSeconds()
    if (Hours < 10) {
        Hours = '0' + date.getHours()
    }
    if (Min < 10) {
        Min = '0' + date.getMinutes()
    }
    if (Sec < 10) {
        Sec = '0' + date.getSeconds()
    }
    if (Year < 10) {
        Year = '0' + date.getFullYear()
    }
    if (Month < 9) {
        Month = '0' + date.getMonth() + 1
    }
    if (Day < 10) {
        Day = '0' +  date.getDate()
    }
    return  Year + '-' + Month + '-' + Day + ' ' + Hours + ':' + Min + ':' + Sec
};
// /*
//   格式化日期
// */
export const getDate =(time) => {
    if (!time) return '';
    let date = new Date(time);
    var Hours = date.getHours()
    var Min = date.getMinutes()
    var Sec = date.getSeconds()
    if (Hours < 10) {
        Hours = '0' + date.getHours()
    }
    if (Min < 10) {
        Min = '0' + date.getMinutes()
    }
    if (Sec < 10) {
        Sec = '0' + date.getSeconds()
    }
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
};
export default {
    formateDate (time) {
        if (!time) return '';
        let date = new Date(time);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() //+ ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    }
}


