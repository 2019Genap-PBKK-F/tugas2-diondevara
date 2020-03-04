var express = require('express');
var app = express();
const hostname = '10.199.14.46';
const port = 8015;

var mahasiswaController = require('./Controller/MahasiswaController')();

app.get("/",function(request, response)
{
  response.json({"Message":"Welcome"});
});
app.use("/api/Mahasiswa", mahasiswaController);

//listen for request on port 3000, and as a callback function have the port listened on logged
app.listen(port, function () {
  var message = "Server running on Port: " + port;
  console.log(message);
});
