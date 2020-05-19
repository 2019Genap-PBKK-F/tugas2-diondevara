//Load HTTP module
  
const express = require("express");
const app = express();
const sql = require('mssql')
// hostname='127.0.0.1'
const port = 8015;
const hostname = 'localhost';


//cors
app.use(function (req, res, next) {
  //Enabling CORS 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization, *");
  next();
});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

const config = {
    user: 'sa',
    password: 'SaSa1212',
    server: '10.199.13.253',
    database: 'nrp05111740000080'
};

var executeQuery = function(res, query, model, reqType) {
  sql.connect(config, function(err){
    if(err) {
      res.end('Connection Error\n' + err)
    }
    else {
      var request = new sql.Request()
      if(reqType != 0) {
        model.forEach(function(m)
        {
          request.input(m.name, m.sqltype, m.value);
        });
      }
      request.query(query, function(err, response){
        if(err) {
          console.log('Query Error\n' + err)
        }
        else{
          // console.log(response.recordset)
          res.send(response.recordset)
          
        }
     })
    }
  })
}

//GET FUNCTION

app.get("/",function(req, res)
{
  // res.end('45 Butuh Pelukan');
  res.sendFile(__dirname + '/index.html')
});
// datadasar
app.get("/api/DataDasar/", function(req, res)
{
    var query = "select * from DataDasar"
    executeQuery(res, query, null, 0);
});
// publikasi
app.get("/api/publikasi/", function(req, res)
{
    var query = "select * from publikasi"
    executeQuery(res, query, null, 0);
});
// abmas
app.get("/api/abmas/", function(req, res)
{
    var query = "select * from abmas"
    executeQuery(res, query, null, 0);
});
// dosen
app.get("/api/dosen/", function(req, res)
{
    var query = "select * from dosen"
    executeQuery(res, query, null, 0);
});
// penelitian
app.get("/api/penelitian/", function(req, res)
{
    var query = "select * from penelitian"
    executeQuery(res, query, null, 0);
});
app.get("/api/DataDasar/:id", function(req, res)
{
    var query = "select * from DataDasar where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});
// aspek
app.get("/api/Aspek/", function(req, res)
{
    var query = "select * from Aspek"
    executeQuery(res, query, null, 0);
});

app.get("/api/Aspek/:id", function(req, res)
{
    var query = "select * from Aspek where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});
// jenis satker
app.get("/api/JenisSatker/", function(req, res)
{
    var query = "select * from JenisSatker"
    executeQuery(res, query, null, 0);
});

app.get("/api/JenisSatker/:id", function(req, res)
{
    var query = "select * from JenisSatker where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});
// master indikator
app.get("/api/MasterIndikator/", function(req, res)
{
    var query = "select * from MasterIndikator"
    executeQuery(res, query, null, 0);
});

app.get("/api/MasterIndikator/:id", function(req, res)
{
    var query = "select * from MasterIndikator where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});
// periode
app.get("/api/Periode/", function(req, res)
{
    var query = "select * from Periode"
    executeQuery(res, query, null, 0);
});

app.get("/api/Periode/:id", function(req, res)
{
    var query = "select * from Periode where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});
// masterindikator_full
app.get("/api/masterindikator_full/", function(req, res)
{
    var query = "select MI.id, A.aspek, A.komponen_aspek,MI.nama as nama_indik,MI.deskripsi as deskripsi_indik, DD1.nama as pembilang, DD2.nama as penyebut, MI.default_bobot from MasterIndikator as MI inner join  Aspek as A on A.id=MI.id_aspek inner join  DataDasar as DD1 on DD1.id=MI.id_pembilang inner join  DataDasar as DD2 on DD2.id=id_penyebut"
    executeQuery(res, query, null, 0);
});

app.get("/api/masterindikator_full/:id", function(req, res)
{
    var query = "select MI.id, A.aspek, A.komponen_aspek,MI.nama ,MI.deskripsi, DD1.nama as pembilang, DD2.nama as penyebut, MI.default_bobot from MasterIndikator as MI inner join  Aspek as A on A.id=MI.id_aspek inner join  DataDasar as DD1 on DD1.id=MI.id_pembilang inner join  DataDasar as DD2 on DD2.id=id_penyebut where MI.id=" + req.params.id;
    executeQuery(res, query, null, 0);
});
// indikator periode
app.get("/api/Indikator_Periode/", function(req, res)
{
    var query = "select * from Indikator_Periode"
    executeQuery(res, query, null, 0);
});

app.get("/api/Indikator_Periode/:id", function(req, res)
{
    var query = "select * from Indikator_Periode where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});
// satker
app.get("/api/SatuanKerja/", function(req, res)
{
    var query = "select * from SatuanKerja"
    executeQuery(res, query, null, 0);
});
app.get("/api/SatuanKerja/nama", function(req, res)
{
    var query = "SELECT distinct SatuanKerja.id,SatuanKerja.nama from SatuanKerja inner join Indikator_SatuanKerja on SatuanKerja.id=Indikator_SatuanKerja.id_satker"
    executeQuery(res, query, null, 0);
});
app.get("/api/SatuanKerja/:id", function(req, res)
{
    var query = "select * from SatuanKerja where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});
// Capaian_Unit
app.get("/api/Capaian_Unit/", function(req, res)
{
    var query = "select * from Capaian_Unit"
    executeQuery(res, query, null, 0);
});

app.get("/api/Capaian_Unit/:id_satker&:id_datadasar", function(req, res)
{
    var query = "select * from Capaian_Unit where id_satker=" + req.params.id_satker +" id_datadasar="+req.params.id_datadasar;
    executeQuery(res, query, null, 0);
});
// Indikator_SatuanKerja
app.get("/api/Indikator_SatuanKerja/", function(req, res)
{
    var query = "select * from Indikator_SatuanKerja"
    executeQuery(res, query, null, 0);
});
//konkin
app.get("/api/konkin/:id", function(req, res)
{
    var query = "SELECT a.aspek, a.komponen_aspek, mi.nama, isk.bobot,isk.capaian,isk.capaian as cap FROM aspek AS a inner JOIN MasterIndikator AS mi ON a.id=mi.id_aspek inner JOIN Indikator_SatuanKerja as isk ON isk.id_indikator_periode=mi.id where isk.id_satker='"+req.params.id+"'";
    executeQuery(res, query, null, 0);
});
app.get("/api/konkin/", function(req, res)
{
    var query = "SELECT a.aspek, a.komponen_aspek, mi.nama, isk.bobot,isk.capaian,isk.capaian as cap FROM aspek AS a inner JOIN MasterIndikator AS mi ON a.id=mi.id_aspek inner JOIN Indikator_SatuanKerja as isk ON isk.id_indikator_periode=mi.id";
    executeQuery(res, query, null, 0);
});

app.get("/api/Indikator_SatuanKerja/:id", function(req, res)
{
    var query = "select * from Indikator_SatuanKerja where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});
// Indikator_SatuanKerja
app.get("/api/Indikator_SatuanKerja_Log/", function(req, res)
{
    var query = "select * from Indikator_SatuanKerja_Log"
    executeQuery(res, query, null, 0);
});

app.get("/api/Indikator_SatuanKerja_Log/:id", function(req, res)
{
    var query = "select * from Indikator_SatuanKerja_Log where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});
// auth
app.post('/api/login/', function(req, res)
{
  var model = [
    { name: 'username', sqltype: sql.VarChar, value: req.body.username },
	  { name: 'password', sqltype: sql.VarChar, value: req.body.password }
  ]
  var query = 'select id, nama, email from SatuanKerja where email = @username and email=@password'

  executeQuery(res, query, model, 1)
})
// POST FUNCTION
// DataDasar
app.post("/api/DataDasar/", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }    
  ]

  var query = 'insert into DataDasar ( nama, create_date, last_update, expired_date ) values( @nama, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP )';
  executeQuery(res, query, model, 1)
})
// Aspek
app.post("/api/Aspek/", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'aspek', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'komponen_aspek', sqltype: sql.VarChar, value: req.body.komponen_aspek }     
  ]

  var query = 'insert into Aspek ( aspek, komponen_aspek ) values( @aspek, @komponen_aspek )';
  executeQuery(res, query, model, 1)
})
// JenisSatker
app.post("/api/JenisSatker/", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama}     
  ]

  var query = 'insert into JenisSatker ( id, nama, create_date, last_update, expired_date ) values( @id, @nama , CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP )';
  executeQuery(res, query, model, 1)
})
// MasterIndikator
app.post("/api/MasterIndikator/", function( req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_pembilang', sqltype: sql.Int, value: req.body.id_pembilang },
    { name: 'id_penyebut', sqltype: sql.Int, value: req.body.id_penyebut },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'deskripsi', sqltype: sql.VarChar, value: req.body.deskripsi },
    { name: 'default_bobot', sqltype: sql.Int, value: req.body.default_bobot }
  ]
  var query = 'insert into MasterIndikator( id_pembilang, id_penyebut, nama, deskripsi, default_bobot, create_date, last_update, expired_date ) values( @id_pembilang, @id_penyebut, @nama, @deskripsi, @default_bobot, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP )';
  executeQuery(res, query, model, 1)
})
// Periode
app.post("/api/Periode/", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama}  
  ]

  // console.log(req.body.waktu)

  var query = 'insert into Periode( id, nama, create_date, last_update ) values( @id, @nama , CURRENT_TIMESTAMP, CURRENT_TIMESTAMP )';
  executeQuery(res, query, model, 1)
})
// indikator periode
app.post("/api/Indikator_Periode/", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
    { name: 'id_periode', sqltype: sql.Int, value: req.body.id_periode },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot}  
  ]

  // console.log(req.body.waktu)

  var query = 'insert into Indikator_Periode( id_master, id_periode, bobot ) values( @id_master, @id_periode, @bobot )';
  executeQuery(res, query, model, 1)
})
// satker
app.post("/api/SatuanKerja/", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_ins_satker', sqltype: sql.Int, value: req.body.id_ins_satker },
    { name: 'id_induk_satker', sqltype: sql.VarChar, value: req.body.id_induk_satker },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama},
    { name: 'email', sqltype: sql.VarChar, value: req.body.email},
    { name: 'level_unit', sqltype: sql.VarChar, value: req.body.email}
  ]

  // console.log(req.body.waktu)

  var query = 'insert into SatuanKerja( id_ins_satker, id_induk_satker, nama, email,level_unit ) values( @id_ins_satker, @id_induk_satker, @nama, @email, @level_unit )';
  executeQuery(res, query, model, 1)
})
// Capaian_Unit
app.post("/api/Capaian_Unit/", function(req, res)
{
  var model = [
    { name: 'id_satker', sqltype: sql.VarChar, value: req.body.id_satker },
    { name: 'id_datadasar', sqltype: sql.Int, value: req.body.id_datadasar },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian}
    
  ]

  // console.log(req.body.waktu)

  var query = 'insert into Capaian_Unit( id_satker, id_datadasar, waktu, capaian) values( @id_satker, @id_datadasar, CURRENT_TIMESTAMP, @capaian )';
  executeQuery(res, query, model, 1)
})
// Indikator_SatuanKerja
app.post("/api/Indikator_SatuanKerja/", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_indikator_periode', sqltype: sql.Int, value: req.body.id_indikator_periode },
    { name: 'id_satker', sqltype: sql.VarChar, value: req.body.id_satker },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot},
    { name: 'target', sqltype: sql.Float, value: req.body.target},
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian}
    
  ]

  // console.log(req.body.waktu)

  var query = 'insert into Indikator_SatuanKerja( id_indikator_periode, id_satker, bobot, target, capaian, last_update) values( @id_indikator_periode, @id_satker, @bobot, target, @capaian, CURRENT_TIMESTAMP )';
  executeQuery(res, query, model, 1)
})
// Indikator_SatuanKerja_Log
app.post("/api/Indikator_SatuanKerja_Log/", function(req, res)
{
  var model = [
    { name: 'id_indikator_satker', sqltype: sql.Int, value: req.body.id_indikator_satker },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian}
    
  ]

  // console.log(req.body.waktu)

  var query = 'insert into Indikator_SatuanKerja_Log( id_indikator_satker, capaian, create_date) values( @id_indikator_satker, @capaian, CURRENT_TIMESTAMP )';
  executeQuery(res, query, model, 1)
})


// PUT FUNCTION

app.put('/api/mahasiswa/:id',function(req, res ) {
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id }, 
    { name: 'nrp', sqltype: sql.Char, value: req.body.nrp },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'angkatan', sqltype: sql.Char, value: req.body.angkatan },
    { name: 'jk', sqltype: sql.VarChar, value: req.body.jk },
    { name: 'lahir', sqltype: sql.Char, value: req.body.lahir },
    { name: 'ukt', sqltype: sql.VarChar, value: req.body.ukt },
    { name: 'foto', sqltype: sql.VarChar, value: req.body.foto },
    { name: 'aktif', sqltype: sql.Bit, value: req.body.aktif }
  ]
  
  var query = "update mahasiswa set nama = @nama, nrp = @nrp, angkatan = @angkatan, jk = @jk, lahir = @lahir, ukt = @ukt, foto = @foto, aktif = @aktif WHERE id = @id";
  executeQuery(res, query, model, 1);
});
// Data Dasar
app.put("/api/DataDasar/:id", function(req, res) {
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
  ]

  var query = 'update DataDasar set nama = @nama, last_update=CURRENT_TIMESTAMP where id = @id';
  executeQuery(res, query, model, 1)
})
// Aspek
app.put("/api/Aspek/:id", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'aspek', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'komponen_aspek', sqltype: sql.VarChar, value: req.body.komponen_aspek }     
  ]

  var query = 'update Aspek set aspek=@aspek, komponen_aspek=@komponen_aspek where id=@id';
  executeQuery(res, query, model, 1)
})
// JenisSatker
app.put("/api/JenisSatker/:id", function(req, res) {
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
  ]

  var query = 'update JenisSatker set nama = @nama, last_update=CURRENT_TIMESTAMP where id = @id';
  executeQuery(res, query, model, 1)
})
// MasterIndikator
app.put("/api/MasterIndikator/:id", function(req, res) {
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_aspek', sqltype: sql.Int, value: req.body.id_pembilang },
    { name: 'id_pembilang', sqltype: sql.Int, value: req.body.id_pembilang },
    { name: 'id_penyebut', sqltype: sql.Int, value: req.body.id_penyebut },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'deskripsi', sqltype: sql.VarChar, value: req.body.deskripsi },
    { name: 'default_bobot', sqltype: sql.Int, value: req.body.default_bobot }
  ]

  var query = 'update MasterIndikator set id_aspek=@id_aspek ,id_pembilang = @id_pembilang, id_penyebut=@id_penyebut, nama = @nama, deskripsi=@deskripsi, default_bobot=@default_bobot, last_update=CURRENT_TIMESTAMP where id = @id';
  executeQuery(res, query, model, 1)
})
// Periode
app.put("/api/Periode/:id", function(req, res) {
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
  ]

  var query = 'update Periode set nama = @nama, last_update=CURRENT_TIMESTAMP where id = @id';
  executeQuery(res, query, model, 1)
})
// Indikator_Periode
app.put("/api/Indikator_Periode/:id", function(req, res) {
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
    { name: 'id_periode', sqltype: sql.Int, value: req.body.id_periode },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot} 
  ]

  var query = 'update Indikator_Periode set id_master = @id_master, id_periode=@id_periode, bobot=@bobot where id = @id';
  executeQuery(res, query, model, 1)
})
// satker
app.put("/api/SatuanKerja/:id", function(req, res) {
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_ins_satker', sqltype: sql.Int, value: req.body.id_ins_satker },
    { name: 'id_induk_satker', sqltype: sql.VarChar, value: req.body.id_induk_satker },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama},
    { name: 'email', sqltype: sql.VarChar, value: req.body.email},
    { name: 'level_unit', sqltype: sql.VarChar, value: req.body.email} 
  ]

  var query = 'update SatuanKerja set id_ins_satker = @id_ins_satker, id_induk_satker=@id_induk_satker, nama=@nama, email=@email, last_update=CURRENT_TIMESTAMP, level_unit=@level_unit where id = @id';
  executeQuery(res, query, model, 1)
})
// Capaian_Unit
app.put("/api/Capaian_Unit/:id", function(req, res) {
  var model = [
    { name: 'id_satker', sqltype: sql.VarChar, value: req.body.id_satker },
    { name: 'id_datadasar', sqltype: sql.Int, value: req.body.id_datadasar },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian}
    
  ]

  var query = 'update Capaian_Unit set id_satker = @id_satker, id_datadasar=@id_datadasar, capaian=@capaian where id = @id';
  executeQuery(res, query, model, 1)
})
// Indikator_SatuanKerja
app.put("/api/Indikator_SatuanKerja/:id", function(req, res) {
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_indikator_periode', sqltype: sql.Int, value: req.body.id_indikator_periode },
    { name: 'id_satker', sqltype: sql.VarChar, value: req.body.id_satker },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot},
    { name: 'target', sqltype: sql.Float, value: req.body.target},
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian}
    
  ]

  var query = 'update Indikator_SatuanKerja set id_indikator_periode = @id_indikator_periode, id_satker=@id_satker, bobot=@bobot, target=@target, capaian=@capaian where id = @id';
  executeQuery(res, query, model, 1)
})
// Indikator_SatuanKerja_Log
app.put("/api/Indikator_SatuanKerja_Log/:id", function(req, res) {
  var model = [
    { name: 'id_indikator_satker', sqltype: sql.Int, value: req.body.id_indikator_satker },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian}
  ]

  var query = 'update Indikator_SatuanKerja_Log set id_indikator_periode = @id_indikator_periode, id_satker=@id_satker, bobot=@bobot, target=@target, capaian=@capaian where id = @id';
  executeQuery(res, query, model, 1)
})
// DELETE FUNCTION
// datadasar

app.delete("/api/DataDasar/:id", function(req, res)
{
    var query = "delete from DataDasar where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});
// datadasar

app.delete("/api/Aspek/:id", function(req, res)
{
    var query = "delete from Aspek where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});
// jenis satker

app.delete("/api/JenisSatker/:id", function(req, res)
{
    var query = "delete from JenisSatker where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});
// master indikator

app.delete("/api/MasterIndikator/:id", function(req, res)
{
    var query = "delete from MasterIndikator where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});
// periode

app.delete("/api/Periode/:id", function(req, res)
{
    var query = "delete from Periode where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});
// indikator periode

app.delete("/api/Indikator_Periode/:id", function(req, res)
{
    var query = "delete from Indikator_Periode where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});
// satker

app.delete("/api/SatuanKerja/:id", function(req, res)
{
    var query = "delete from SatuanKerja where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});
// Capaian_Unit

app.delete("/api/Capaian_Unit/:id_satker&:id_datadasar", function(req, res)
{
    var query = "delete from Capaian_Unit where id_satker=" + req.params.id_satker +" id_datadasar="+req.params.id_datadasar;
    executeQuery(res, query, null, 0);
});
// Indikator_SatuanKerja

app.delete("/api/Indikator_SatuanKerja/:id", function(req, res)
{
    var query = "delete from Indikator_SatuanKerja where id=" + req.params.id;
    executeQuery(res, query, null, 0);
});
// Indikator_SatuanKerja

app.delete("/api/Indikator_SatuanKerja_Log/:id_indikator_satker", function(req, res)
{
    var query = "delete from Indikator_SatuanKerja_Log where id_indikator_satker=" + req.params.id_indikator_satker;
    executeQuery(res, query, null, 0);
});
//  LISTEN

app.listen(port, hostname, function () {
  var message = "Server runnning on Port: " + port;
  console.log(message);
});
