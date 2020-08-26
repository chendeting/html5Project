export const formatDate = (timestamp, fmt) => {
  if (timestamp === null) {
    return null
  }
  if (typeof (timestamp) === 'string' && !/^\d*$/.test(timestamp)) {
    let lastIndexOf = timestamp.lastIndexOf('.')
    if (lastIndexOf > 0) {
      // 去掉毫秒，不然转成Date对象会报错
      timestamp = timestamp.substring(0, lastIndexOf)
    }
    timestamp = timestamp.replace(/-/g, '/')
  }
  let date = new Date(timestamp)
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  };
  let result = fmt;
  if (/(y+)/.test(result)) {
    result = result.replace(RegExp.$1, (date.getFullYear().toString()).substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(result)) {
      result = result.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(o[k].toString().length));
    }
  }
  return result;
}

export const shengxiao = () => {
  return [{name:'鼠'},
    {name:'牛'},
    {name:'虎'},
    {name:'兔'},
    {name:'龙'},
    {name:'蛇'},
    {name:'马'},
    {name:'羊'},
    {name:'猴'},
    {name:'鸡'},
    {name:'狗'},
    {name:'猪'}]
}