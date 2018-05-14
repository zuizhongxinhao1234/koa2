const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');

//返回数据格式化中间件
const response_formatter = require('./middlewares/response_formatter');
// 路由
const api = require('./routers/api');

//log工具
const logUtil = require('./utils/log_util');



// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));




// logger
app.use(async (ctx, next) => {
  //响应开始时间
  const start = new Date();
  //响应间隔时间
  let ms;
  try {
    //开始进入到下一个中间件
    await next();

    ms = new Date() - start;
    //记录响应日志
    logUtil.logResponse(ctx, ms);

  } catch (error) {
    
    ms = new Date() - start;
    //记录异常日志
    logUtil.logError(ctx, error, ms);
  }

});

//添加格式化处理响应结果的中间件，在添加路由之前调用
//仅对/api开头的url进行格式化处理
app.use(response_formatter('^/api'));


router.use('/api', api.routes(), api.allowedMethods());

app.use(router.routes(), router.allowedMethods());

// response
app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx);
});


module.exports = app;