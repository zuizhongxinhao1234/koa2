
const ApiError = require('../routers/api/error/ApiError');
const ApiErrorNames = require('../routers/api/error/ApiErrorNames');
const userDao = require('../dao/user_dao')
exports.getUser = async function (req) {
  let data = await userDao.selectAllData()
  if(req.id != 1){
      throw new ApiError(ApiErrorNames.USER_NOT_EXIST);
  }
  return data
}