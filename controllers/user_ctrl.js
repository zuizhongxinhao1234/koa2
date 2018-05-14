
const userService = require('../services/user_service')
//获取用户
exports.getUser = async (ctx, next) => {
    ctx.body = await userService.getUser(ctx.query)
}

//用户注册
exports.registerUser = async (ctx, next) => {
  console.log('registerUser', ctx.request.body);
}
