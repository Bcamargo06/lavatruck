require('dotenv').config({
    path: '../../.env'
});

const dbConnection = require('../../database/dbMysql');
const VeiculoDAO = require('../models/dao/VeiculoDAO');
const Veiculo = require('../models/negocio/Veiculo');
const mysql = require('mysql');


module.exports = function (application) {
    application.post('/cadastrar/veiculo/cliente', async (req, res) => {
        let connection, veiculoModel;
        try {
            connection = await mysql.createConnection(dbConnection);
            veiculoModel = new VeiculoDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await veiculoModel.postVeiculo(new Veiculo(req.body));

            res.status(200).json({
                "tipo": 'success',
                "message": 'Veiculo cadastrado com sucesso! <br>'
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        } finally {
            if (connection) {
                try {
                    connection.end();
                } catch (error) {
                    console.log(error.message);
                }
            }
        }
    })

    application.get('/veiculos/cliente/:id', async (req, res) => {
        let connection, veiculoModel, rows, recordsTotal, records, draw = req.query.draw || 1;
        try {
            connection = await mysql.createConnection(dbConnection);
            veiculoModel = new VeiculoDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await veiculoModel.getVeiculos({
                "cliente_id": req.params.id
            });

            recordsTotal = records ? records.length : 0;
            rows = records != 0 ? records : [];

            var tableData = {
                draw: draw,
                recordsTotal: recordsTotal,
                recordsFiltered: recordsTotal
            };

            tableData.data = rows;
            res.status(200).json(tableData);
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        } finally {
            if (connection) {
                try {
                    connection.end();
                } catch (error) {
                    console.log(error.message);
                }
            }
        }
    })

    application.delete('/veiculo/cliente/:id', async (req, res) => {
        let connection, veiculoModel;;
        try {
            connection = await mysql.createConnection(dbConnection);
            veiculoModel = new VeiculoDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            await veiculoModel.deleteVeiculo({ id_veiculo: req.params.id });

            res.status(200).json({
                "tipo": 'success',
                "message": 'Registro excluído com sucesso! <br>'
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        } finally {
            if (connection) {
                try {
                    connection.end();
                } catch (error) {
                    console.log(error.message);
                }
            }
        }
    })
}