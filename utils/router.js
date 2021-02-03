const url = require('url');
const path = require('path');
const ejs = require('ejs');

const initStatic = require('./initStatic');
const route = require('./initRoute');
const resSend = require('./resSend');


// 注册路由
route.get('/login', (req, res) => {
  ejs.renderFile(path.join(__dirname, '../views/index.ejs'), {}, (err, data) => {
    if(err) {
      console.log(err);
      return;
    };
    resSend(res, data, 'text/html');
  });
});

route.post('/doLogin', (req, res) => {
  console.log(req.body);
  resSend(res, req.body);
});

// 动态路由
route.get('/article/:id', (req, res) => {
  resSend(res, "article");
});

// 动态路由
route.get('/article/:id/:cc', (req, res) => {
  console.log(req.params);
  resSend(res, "article" + req.params[":id"]);
});

const router = (req, res) => {
  // 静态资源
  initStatic(req, res);
  // 执行路由
  route.init(req, res);
}

module.exports = router;