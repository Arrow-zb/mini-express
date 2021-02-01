# Mini-Express
小型的、持续维护的、学习为主的微型 node Web 服务，类 Express
# 实现的功能
1. 静态资源注册
```js
initStatic(req, res);
```
2. 路由注册
```js
route.get('/login', (req, res) => {
  ejs.renderFile(path.join(__dirname, '../views/index.ejs'), {}, (err, data) => {
    if(err) {
      console.log(err);
      return;
    };
    resSend(res, data, 'text/html');
  })
});

route.post('/doLogin', (req, res) => {
  console.log(req.body);
  resSend(res, req.body);
});
```
3. 混合开发， ejs