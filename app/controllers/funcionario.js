require('dotenv').config({
    path: '../../.env'
});

const dbConnection = require('../../database/dbMysql');
const FuncionarioDAO = require('../models/dao/FuncionarioDAO');
const Funcionario = require('../models/negocio/Funcionario');
const mysql = require('mysql');


module.exports = function (application) {

    application.post('/cadastrar_funcionario', async (req, res) => {
        let connection, funcionarioModel;
        try {
            connection = await mysql.createConnection(dbConnection);
            funcionarioModel = new FuncionarioDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await funcionarioModel.postFuncionario(new Funcionario(req.body));

            res.redirect('/')
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

    application.get('/listar_funcionarios', async (req, res) => {
        let connection, funcionarioModel, rows, recordsTotal, records, draw = req.query.draw || 1;
        try {
            connection = await mysql.createConnection(dbConnection);
            funcionarioModel = new FuncionarioDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await funcionarioModel.buscarFuncionarios();

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
}