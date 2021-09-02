let mysql = require('mysql')
let dbConfig = require('./db.config')

module.exports = {
    query: function (sql, params = []) {
        return new Promise(function (resolve, reject) {
            let connection = mysql.createConnection(dbConfig)
            connection.connect(function (err) {
                if (err) {
                    (`${dbConfig.database} database connect error!`)
                    throw err
                } 
                (`${dbConfig.database} database connect success!`)
                connection.query(sql, params, function (err, results, fields) {
                    if (err) {
                        ('数据库操作失败！')
                        reject(err)
                        throw err
                    }
                    ('数据库操作成功！')
                    resolve(JSON.parse(results===undefined?'0':JSON.stringify(results)),JSON.parse(fields===undefined?'0':JSON.stringify(fields)))
                })
                connection.end(function (err) {
                    if (err) {
                        // ('close database connection failed!')
                        throw err
                    }
                    // ('close database connection success!')
                })
            })
        })
    }
}