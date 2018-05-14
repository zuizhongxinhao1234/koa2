const mysql = require('mysql')
const pool = mysql.createPool({
  host     :  '192.168.0.127',
  user     :  'root',
  password :  'root',
  database :  'outsource'
})

let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = query