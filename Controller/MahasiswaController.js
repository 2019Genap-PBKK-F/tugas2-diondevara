var express = require('express');
var router = express.Router();
var sql = require("mssql");
var conn = require("../Connection/connect")();

var routes = function()
{
    router.route('/')
        .get(function(req, res)
        {
            conn.connect().then(function()
            {
                var sqlQuery = "Select * from Mahasiswa";
                var req = new sql.Request(conn);
                req.query(sqlQuery).then(function(recordset)
                {
                    res.json(recordset.recordset);
                    conn.close();
                })
                    .catch(function(err){
                        conn.close();
                        res.status(400).send("Error");
                    });
            })
                .catch(function(err){
                    conn.close();
                    res.status(400).send("Error");
                });
        });
        router.route('/')
        .post(function (req, res) {
            conn.connect().then(function () {
                var transaction = new sql.Transaction(conn);
                transaction.begin().then(function () {
                    var request = new sql.Request(transaction);
                    request.input("ID", sql.Int, req.body.ID)
                    request.input("NRP", sql.VarChar(50), req.body.NRP)
                    request.input("Nama", sql.NChar(4), req.body.Nama)
                    request.input("Angkatan", sql.Int, req.body.Angkatan)
                    request.input("Tgl_lahir", sql.Date, req.body.Tgl_lahir)
                    request.execute("Usp_InsertProduct").then(function () {
                        transaction.commit().then(function (recordSet) {
                            conn.close();
                            res.status(200).send(req.body);
                        }).catch(function (err) {
                            conn.close();
                            res.status(400).send("Error while inserting data");
                        });
                    }).catch(function (err) {
                        conn.close();
                        res.status(400).send("Error while inserting data");
                    });
                }).catch(function (err) {
                    conn.close();
                    res.status(400).send("Error while inserting data");
                });
            }).catch(function (err) {
                conn.close();
                res.status(400).send("Error while inserting data");
            });
        });

        router.route('/')
        .put(function (req, res) {
            var _productID = req.params.ID;
            conn.connect().then(function () {
                var transaction = new sql.Transaction(conn);
                transaction.begin().then(function () {
                    var request = new sql.Request(transaction);
                    request.input("ID", sql.Int, req.body.ID)
                    request.input("NRP", sql.VarChar(50), req.body.NRP)
                    request.input("Nama", sql.NChar(4), req.body.Nama)
                    request.input("Angkatan", sql.Int, req.body.Angkatan)
                    request.input("Tgl_lahir", sql.Date, req.body.Tgl_lahir)
                    request.execute("Usp_Tes").then(function () {
                        transaction.commit().then(function (recordSet) {
                            conn.close();
                            res.status(200).send(req.body);
                        }).catch(function (err) {
                            conn.close();
                            res.status(400).send("Error while updating data" + err);
                        });
                    }).catch(function (err) {
                        conn.close();
                        res.status(400).send("Error while updating data" + err);
                    });
                }).catch(function (err) {
                    conn.close();
                    res.status(400).send("Error while updating data" + err);
                });
            }).catch(function (err) {
                conn.close();
                res.status(400).send("Error while updating data");
            });
        });

        router.route('/')
        .delete(function (req, res) {
            //var _productID = req.params.id;
            conn.connect().then(function () {
                var transaction = new sql.Transaction(conn);
                transaction.begin().then(function () {
                    var request = new sql.Request(transaction);
                    request.input("ID", sql.Int, req.body.ID)
                    request.input("NRP", sql.VarChar(50), req.body.NRP)
                    request.input("Nama", sql.NChar(4), req.body.Nama)
                    request.input("Angkatan", sql.Int, req.body.Angkatan)
                    request.input("Tgl_lahir", sql.Date, req.body.Tgl_lahir)
                    request.execute("Usp_Remove").then(function () {
                        transaction.commit().then(function (recordSet) {
                            conn.close();
                            res.status(200).json("ProductID:" + req.param.ID);
                        }).catch(function (err) {
                            conn.close();
                            res.status(400).send("Error while Deleting data:" + err);
                        });
                    }).catch(function (err) {
                        conn.close();
                        res.status(400).send("Error while Deleting data:" + err);
                    });
                }).catch(function (err) {
                    conn.close();
                    res.status(400).send("Error while Deleting data:" + err);
                });
            })
        });

    return router;       
};
module.exports = routes;