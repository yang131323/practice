/**
 * hash路由简单实现
 * 1. 能够通过push添加记录及前进。
 * 2. 能够通过back进行路由回退。
 * 3. 能够通过go进行路由与后退。
 */
class Router {
  constructor () {
    this.history = [];
    this.index = this.history.length - 1;
    this.router = new Map();
    this.isBack = false;
    // 必须绑定this，因为绑定到hashchange事件回调函数中会丢失this
    this.refresh = this.refresh.bind(this);
    window.addEventListener('hashchange', this.refresh);
  }
  
  refresh () {
    let curHash = location.hash.substr(1);
    console.log(curHash);
    if (!this.isBack) {
      this.history[++this.index] = curHash;
    } else { this.isBack = false }
    typeof this.router.get(curHash) === 'function' && this.router.get(curHash)();
  }

  push (obj) {
    let {query, url, callback} = obj;
    if (!url) { return; } 
    let str = '/' + url;
    if (typeof query === 'object') {
      str += '?';
      for (let x in query) {
        str += x + '=' + query[x] + '&';
      }
    }
    str = str.substr(0, str.length - 1);
    this.router.set(str, callback);
    location.hash = '#' + str;
  }

  back () {
    if (this.index <= 0) { return }
    this.isBack = true;
    location.hash = this.history[--this.index];
  }

  go (step) {
    const index = this.index + step;
    if (index < 0 || index >= this.history.length) { return; }
    const temp = this.history[index];
    this.history.splice(index, 1);
    this.history[this.index] = temp;
    this.isBack = true;
    location.hash = temp;
  }

  /**
   * 初始化版本，在历史队列上进行回退，新版本是基于访问记录回退
   * @param {Number} step 
   */
  goBack (step) {
    const index = this.index + step;
    if (index < 0 || index >= this.history.length) { return; }
    this.index = index;
    this.isBack = true;
    location.hash = this.history[index];
  }
}