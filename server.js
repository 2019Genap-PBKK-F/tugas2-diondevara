const express = require("express");
var cors = require('cors');
const app = express();
const sql = require('mssql');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(cors())
app.options('*', cors());

app.use(function (req, res, next) {
   //Enabling CORS 
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
   next();
 });

app.get("/", function (req, response) {
   response.writeHead(200, { 'Content-Type': 'text/plain' });
   response.end('Hello World!\n - TESTING API -');
});

const config = {
   user: 'sa',
   password: 'SaSa1212',
   server: '10.199.13.253',
   database: 'nrp05111740000080'
};

var query = function (res, query, params) {
   sql.connect(config, function (err) {
      if (err) {
         res.end('Connection Error\n' + err)
      }
      else {
         var request = new sql.Request()
         if (params != null){
            params.forEach(function (p) {
               request.input(p.name, p.sqltype, p.value);
            });
         }
         request.query(query, function (err, recordset) {
            if (err) {
               console.log('Query Error\n' + err)
            }
            else {
               res.send(recordset)
            }
         })
      }
   })
}

app.get("/api/Mahasiswa", function(req, res)
{
  var qr = "select * from Mahasiswa";
  query(res, qr, null);
});

app.post("/api/Mahasiswa", function(req, res)
{
  var param = [
    { name: 'NRP', sqltype: sql.VarChar, value: req.body.NRP },
    { name: 'Nama', sqltype: sql.NChar, value: req.body.Nama },
    { name: 'Angkatan', sqltype: sql.Int, value: req.body.Angkatan },
    { name: 'Tgl_lahir', sqltype: sql.Date, value: req.body.Tgl_lahir }
  ]

  var qr = 'insert into Mahasiswa ( NRP, Nama, Angkatan, Tgl_lahir ) values( @NRP, @Nama, @Tgl_lahir)';
  query(res, qr, param);
});

app.delete("/api/Mahasiswa/:Id", function(req, res)
{
  var qr = "delete from Mahasiswa where Id=" + req.params.Id;
  query(res, qr, null);
})

app.put('/api/Mahasiswa/:Id',function(req,res){
   var param = [
     { name: 'Id', sqltype: sql.Int, value: req.body.Id }, 
     { name: 'NRP', sqltype: sql.NChar, value: req.body.NRP },
     { name: 'Angkatan', sqltype: sql.Int, value: req.body.Angkatan },
     { name: 'Tgl_lahir', sqltype: sql.Date, value: req.body.Tgl_lahir }
   ]
 
   var qr = "update Mahasiswa set NRP = @NRP, Nama = @Nama, Angkatan = @Angkatan, Tgl_lahir = @Tgl_lahir WHERE Id =" + req.params.Id;
   query(res, qr, param);
 });

//API baru

//api untuk tabel kategoriunit
app.get("/api/kategoriunit", function (req, res) {
   var qr = "select id, nama as name from kategoriunit";
   query(res, qr, null);
})

app.get("/api/kategoriunit/:id", cors(), function (req, res) {
   var qr = "select * from kategoriunit where id = " + req.params.id;
   query(res, qr, null);
})

app.post('/api/kategoriunit',function(req,res){
   var param = [
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
   ]
    
    var qr = "insert into kategoriunit (nama) values (@nama);"
    query(res, qr, param);
})

app.put('/api/kategoriunit/:id', cors(),function(req,res){
   var param = [
      { name: 'id', sqltype: sql.Int, value: req.params.id },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
    ]
    //console.log(param)
    var qr = "update kategoriunit set nama = @nama WHERE id = @id;"
    query(res, qr, param);
})

app.delete('/api/kategoriunit/:id', function (req, res, next) {
   var qr = "delete from kategoriunit where id=" + req.params.id;
   query(res, qr, null);
})

//api datadasar
app.get("/api/datadasar", function (req, res) {
   var qr = "select id, nama as name from datadasar";
   query(res, qr, null);
})

app.get("/api/datadasar/:id", cors(), function (req, res) {
   var qr = "select * from datadasar where id = " + req.params.id;
   query(res, qr, null);
})

app.post('/api/datadasar',function(req,res){
   var param = [
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
   ]
    
    var qr = "insert into datadasar (nama) values (@nama);"
    query(res, qr, param);
})

app.put('/api/datadasar/:id', cors(),function(req,res){
   var param = [
      { name: 'id', sqltype: sql.Int, value: req.params.id },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
    ]
    //console.log(param)
    var qr = "update datadasar set nama = @nama WHERE id = @id;"
    query(res, qr, param);
})

app.delete('/api/datadasar/:id', function (req, res, next) {
   var qr = "delete from datadasar where id=" + req.params.id;
   query(res, qr, null);
})


//api tabel unit
app.get("/api/unit", function (req, res) {
    var qr = "select * from unit";
    query(res, qr, null)
 })
 
 app.get("/api/unit/:id", cors(), function (req, res) {
    var qr = "select * from unit where id = " + req.params.id;
    query(res, qr, null)
 })
 
 app.post('/api/unit',function(req,res){
    var param = [
       { name: 'kategoriunit_id', sqltype: sql.Int, value: req.body.kategoriunit_id },
       { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
    ]
     
     var qr = "insert into unit (kategoriunit_id, nama) values (@kategoriunit_id, @nama);"
     query(res, qr, param);
 })
 
 app.put('/api/unit/:id', cors(),function(req,res){
    var param = [
       { name: 'id', sqltype: sql.Int, value: req.params.id },
       { name: 'kategoriunit_id', sqltype: sql.Int, value: req.body.kategoriunit_id },
       { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
     ]
     //console.log(param)
     var qr = "update unit set nama = @nama, kategoriunit_id = @kategoriunit_id WHERE id = @id;"
     query(res, qr, param);
 })
 
 app.delete('/api/unit/:id', function (req, res, next) {
    var qr = "delete from unit where id=" + req.params.id;
    query(res, qr, null);
 })


//api capaian_unit
app.get("/api/capaian_unit", function (req, res) {
    var qr = "select * from capaian_unit";
    query(res, qr, null);
 })
 
 app.get("/api/capaian_unit/:datadasar_id&:unit_id", cors(), function (req, res) {
    var qr = "select * from capaian_unit where datadasar_id = " + req.params.datadasar_id + " AND unit_id = " + req.params.unit_id;
    query(res, qr, null);
 })
 
 app.post('/api/capaian_unit',function(req,res){
    var param = [
       { name: 'datadasar_id', sqltype: sql.Int, value: req.body.datadasar_id },
       { name: 'unit_id', sqltype: sql.Int, value: req.body.unit_id },
       { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
    ]
     
     var qr = "insert into capaian_unit (datadasar_id, unit_id, waktu, capaian) values (@datadasar_id, @unit_id, CURRENT_TIMESTAMP, @capaian);"
     query(res, qr, param);
 })
 
 app.put('/api/capaian_unit/:datadasar_id&:unit_id', cors(),function(req,res){
    var param = [
       { name: 'datadasar_id_old', sqltype: sql.Int, value: req.params.datadasar_id },
       { name: 'unit_id_old', sqltype: sql.Int, value: req.params.unit_id },
       { name: 'datadasar_id', sqltype: sql.Int, value: req.body.datadasar_id },
       { name: 'unit_id', sqltype: sql.Int, value: req.body.unit_id },
       { name: 'waktu', sqltype: sql.Date, value: req.body.waktu },
       { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
     ]
     //console.log(param)
     var qr = "update capaian_unit set waktu = @waktu, capaian = @capaian, datadasar_id = @datadasar_id, unit_id = @unit_id WHERE datadasar_id = @datadasar_id_old AND unit_id = @unit_id_old ;"
     query(res, qr, param);
 })
 
 app.delete('/api/capaian_unit/:datadasar_id&:unit_id', function (req, res, next) {
    var qr = "delete from capaian_unit where datadasar_id = " + req.params.datadasar_id + " AND unit_id = " + req.params.unit_id;
    query(res, qr, null);
 })
 



// Console will print the message
app.listen(8015, function () {
   console.log('CORS-enabled web server listening on port 8015')
})
