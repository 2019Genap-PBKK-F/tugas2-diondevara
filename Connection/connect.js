var sql = require("mssql");
var connect = function()
{
    var conn = new sql.ConnectionPool({
        user: 'su',
        password: 'SaSa1212',
        server: '10.199.13.253',
        database: 'nrp05111740000080'
    });
    console.log(conn)
    return conn;
};
module.exports = connect;