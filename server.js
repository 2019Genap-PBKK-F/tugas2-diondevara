var express = require('express');
var app = express();
const hostname = '10.199.14.46';
const port = 8015;

var bodyParser = require('body-parser');
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));
// create application/json parser
app.use(bodyParser.json());

var mahasiswaController = require('./Controller/MahasiswaController')();
app.use("/api/Mahasiswa", mahasiswaController);

//listen for request on port 3000, and as a callback function have the port listened on logged
app.listen(port, function () {
  var message = "Server running on Port: " + port;
  console.log(message);
});
