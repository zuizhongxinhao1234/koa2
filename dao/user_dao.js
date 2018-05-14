const query = require('./async-db')
exports.selectAllData = async function () {
  let sql = 'SELECT * FROM banner'
  let dataList = await query( sql )
  return dataList
}
