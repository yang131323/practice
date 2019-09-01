function isObject (val) {
  return typeof val === 'object';
}

function isString (val) {
 return typeof val === 'string'; 
}

function isFunction (val) {
  return typeof val === 'function';
}
/**
 * XMLHttpRequest请求状态
 * 0: 表示XHR已经实例化，但是open方法还没有被调用
 * 1: 表示open方法被调用，但是send方法还没有被调用，这是仍然可以通过setRequestHeader方法设置请求头
 * 2: 表示send方法已经被调用，同时已经接受服务返回的状态码和头信息
 * 3: 表示正在接收响应数据，如果responseType设置为text或者为空字符串，那么可以通过responseText拿到相应的部分数据
 * 4: 表示响应数据已全部接收，或者表示本次请求完成
 */

class Send {
  // 全局配置对象
  static config = {
    timeout: 15000,
    responseType: 'json',
    baseURL: '',
    headers: {
      'Accept-Charset': 'utf-8'
    },
  };

  // 请求拦截器
  static requestInterceptor = null;

  /**
   * 设置请求拦截器，可以用来做一些统一请求处理
   * @param {Function} fn 
   */
  static setRequestInterceptor (fn) {
    if (!isFunction(fn)) {
      throw new TypeError(`setRequestInterceptor期待一个函数类型的参数，传入的参数类型为${typeof fn}`);
    }
    Send.requestInterceptor = fn;
  }

  static responseInterceptor = null;

  static setResponseInterceptor (fn) {
    if (!isFunction(fn)) {
      throw new TypeError(`setResponseInterceptor期待一个函数类型的参数，传入的参数类型为${typeof fn}`);
    }
    Send.responseInterceptor = fn;
  }

  /**
   * 设置全局配置
   * @param {Object} config 
   */
  static setConfig (config) {
    if (!isObject(config)) {
      throw new TypeError(`setConfig期待一个对象类型的参数，传入的参数类型为${typeof config}`);
    }
    Send.config = Object.assign({}, Send.config, config);
  }

  static allMethod = ['get', 'post', 'delete', 'put', 'patch'];

  static getConfig () {
    return Send.config;
  }

  constructor ({ url = '/', headers = {}, ...rest }) {
    try {
      this.url = `${Send.config.baseURL}${url}`;
      if (!isObject(headers)) { throw TypeError(`参数headers期待是一个对象类型，传入的参数类型为${typeof headers}`); }
      this.headers = Object.assign({}, Send.config.headers, headers);
      const opts = {
        headers: this.headers,
        url: this.url,
        ...rest
      }
      this.opts = Object.assign({}, Send.config, opts);
    } catch (e) {
      throw e;
    }
  }

  clearXHR () {
    for (const x of Send.allMethod) {
      if (this[`${x}XHR`]) {
        this[`${x}XHR`] = null;
      }
    }
  }

  setHeaders (XHR) {
    const headers = this.opts.headers;
    const keys = Object.keys(headers);
    for (const x of keys) {
      this[XHR].setRequestHeader(x, headers[x]);
    }
  }

  errorHandle (XHR, reject) {
    this[XHR].ontimeout = (function timeout () {
      reject('请求超时');
      this[XHR] = null;
    }).bind(this);
    this[XHR].onerror = (function error () {
      reject('请求错误');
      this[XHR] = null;
    }).bind(this);
  }

  responseHandle (XHR, resolve, reject) {
    this[XHR].onload = (function response () {
      if (this[XHR].readState === 4 && this[XHR].status === 200) {
        if (Send.requestInterceptor) {
          resolve(Send.requestInterceptor(this[XHR].response));
        } else {
          resolve(this[XHR].response);
        }
        this[XHR] = null;
      } else {
        reject('请求出错');
        this[XHR] = null;
      }
    }).bind(this);
  }

  requestOperate (prefix) {
    if (!isString(prefix)) {
      throw TypeError(`参数prefix期待是一个字符串类型，传入的参数类型为${typeof headers}`);
    }
    const XHR = `${prefix}XHR`;
    if (this.XHR) { throw new Error('有待完成的请求，请等待请求完成。'); }
    this[XHR] = new XMLHttpRequest();
    this[XHR].open(prefix.toUpperCase(), this.url, true);
    if (Send.requestInterceptor) {
      const opts = Send.requestInterceptor(this.opts);
      this.opts = Object.assign({}, this.opts, opts);
    }
    this[XHR].responseType = this.opts.responseType;
    this[XHR].timeout = this.opts.timeout;
    this.setHeaders(XHR);
    return new Promise((resolve, reject) => {
      this.responseHandle(XHR, resolve, reject);
      this.errorHandle(XHR, reject);
      const data = this.opts.data ? this.opts.data : null;
      this[XHR].send(data);
    })
  }

  get (id = '', query) {
    this.url = `${this.url}/${id}`;
    if (isObject(query)) {
      const keys = Object.keys(query);
      let str = '';
      for (const x of keys) {
        str += x + '=' + query[x] + '&';
      }
      str = str.substr(0, str.length - 1);
      this.url = this.url + '?' + str;
    }
    return this.requestOperate('get');
  }

  post (id, data) {
    if (id) { this.url = `${this.url}/${id}`; }
    this.opts = Object.assign({}, this.opts, {data});
    return this.requestOperate('post');
  }

  put (id, data) {
    if (id) { this.url = `${this.url}/${id}`; }
    this.opts = Object.assign({}, this.opts, {data});
    return this.requestOperate('put');
  }

  delete (id) {
    if (id) { this.url = `${this.url}/${id}`; }
    return this.requestOperate('delete');
  }

  patch (id, data) {
    if (id) { this.url = `${this.url}/${id}`; }
    this.opts = Object.assign({}, this.opts, {data});
    return this.requestOperate('patch');
  }
}

Send.setConfig({
  baseURL: 'https://web-api.juejin.im',
  headers: {
    'X-Agent': 'Juejin/Web',
    'Accept-Charset': 'utf-8',
  }
});

const juejin = new Send({ url: '/query' });

async function test() {
  const params = {
    extensions: {
      query: {
        id: '653b587c5c7c8a00ddf67fc66f989d42',
      }
    },
    operationName: '',
    query: '',
    variables: {
      after: '',
      category: '5562b415e4b00c57d9b94ac8',
      first: 20,
      order: 'POPULAR',
      tags: ['555e9a98e4b00c57d9955f68'],
    }
  }
  
  const data = await juejin.post('', JSON.stringify(params));
  console.log(data);
}

test();
