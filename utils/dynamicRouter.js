const url = require('url');

const routerToRe = router => {
  return "^" + router.split("/").map(v => {
    if(/^:.+/.test(v)) {
      return "([^\/\\s]+)"
    };
    return v;
  }).join("\\/") + "$";
};

const dynamicRouter = (req, routes) => {
  if(!req.params) {
    req.params = {};
  }
  let { pathname } = url.parse(req.url);

  for (let i = 0; i < routes.length; i++) {
    // 注册的路由是动态路由,那么就需要找到请求的 path 对应的注册的路由
    if(new RegExp(routerToRe(routes[i])).test(pathname)) {
      const arr = routes[i].split("/");
      for (let i = 0, j = 1; i < arr.length; i++) {
        if(arr[i].charAt(0) === ':') {  // 这里不能使用正则
          req.params[arr[i]] = RegExp[`$${j++}`];
        };
      }
      return routes[i];
    }
  };

  return pathname;
};

module.exports = dynamicRouter;