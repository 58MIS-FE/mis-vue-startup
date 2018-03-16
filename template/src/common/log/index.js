/**
 * [version 大数据页面pV包含节点（:/params）统计]
 * @createor  张振(zhangzhen09)
 */

class Log {
  constructor(){
     this.version =  '1.1';
     this.__accessTime =  new Date().getTime();
     this.userid =  window.userid || '';
     this.statid = '';
  }

  setCookie(name, val, days){
    let exp = new Date();
    exp.setTime(exp.getTime() + days*86400000);
    document.cookie = name + '=' + escape(val) + '; expires=' + exp.toGMTString()+ "; domain=.59.com" + "; path=/";
  }

  getCookie(name){
        let arr;
        let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if(arr = document.cookie.match(reg)){
            return unescape(arr[2]);
        }
  }

  sendlog(log) {
      new Image().src="http://logs.58.com/bigdata/empty.js.gif?" + log + '&random=' + Math.random().toString(16).substring(2);
  }

  accessLog(referrer) {
    let flag = this.getCookie('__statid')
    if (!flag) {
      this.statid = this.__accessTime.toString(16) + Math.random().toString(16).substring(2);
      this.setCookie('__statid',this.statid, 10000);
    }

    let log = 'version=' + this.version + '&type=access&access_time=' + this.__accessTime + '&referrer=' + referrer;
    if (this.userid) log += '&userid=' + this.userid;
    this.sendlog(log)
  }

  static init (path) {
      let referrer = window.location.origin + `${path}`
      new Log().accessLog(referrer)
  }
}


export default Log
