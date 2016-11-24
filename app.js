var koa = require('koa');
var app = koa();

app.use(function *(){
      this.body = 'Hello World 2';
});

app.listen(3000);

