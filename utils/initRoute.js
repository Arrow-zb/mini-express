const dynamicRouter = require('./dynamicRouter');

const url = require('url');

const initRoute = {
  G : {
    _get: {},
    _post: {}
  },

  routes: [],

  get(path, cb)  {
    this.routes.push(path);
    this.G._get[path] = cb;
  },

  post(path, cb){
    this.routes.push(path);
    this.G._post[path] = cb;
  },

  init(req, res) {
    const method = req.method.toLowerCase();
    let { pathname, query } = url.parse(req.url);
    // 1. query 路径携带的query
    req.query = query;

    // 2. dynamic router 动态路由
    pathname = dynamicRouter(req, this.routes);
    // console.log(pathname, req);

    pathname = pathname === '/' ? '/index.html' : pathname;

    if(this.G['_'+method][pathname]) {
      if(method === 'post') {
        let _res = "";
        req.on('data', chunk => {
          _res += chunk;
        });
        req.on('end', () => {
          // 2. body 
          req.body = _res;
          this.G['_'+method][pathname](req, res);
        });
      }else {
        this.G['_'+method][pathname](req, res);
      }
    }else {
      res.writeHead(404, {"Content-Type": "text/html; charset=UTF-8"});
      res.end("页面不存在！");
    };
  }
};

module.exports = initRoute;