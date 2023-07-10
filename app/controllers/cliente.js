require('dotenv').config({
    path: '../../.env'
});

const dbConnection = require('../../database/dbMysql');
const ClienteDAO = require('../models/dao/ClienteDAO');
const Cliente = require('../models/negocio/Cliente');
const mysql = require('mysql');


module.exports = function (application) {

    application.post('/cadastrar_cliente', async (req, res) => {
        let connection, clienteModel;
        try {
            connection = await mysql.createConnection(dbConnection);
            clienteModel = new ClienteDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await clienteModel.cadastrarCliente(new Cliente(req.body));

            res.redirect('/alterar_cliente');
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

    application.get('/listar_clientes', async (req, res) => {
        let connection, clienteModel, rows, recordsTotal, records, draw = req.query.draw || 1;
        try {
            connection = await mysql.createConnection(dbConnection);
            clienteModel = new ClienteDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await clienteModel.buscarClientes();

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

    application.patch('/alterar_cliente', async (req, res) => {
        let connection, clienteModel;
        try {
            connection = await mysql.createConnection(dbConnection);
            clienteModel = new ClienteDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await clienteModel.alterarCliente(new Cliente(req.body));

            res.status(200).json({
                "tipo": 'success',
                "message": 'Registro alterado com sucesso! <br>'
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

    application.delete('/excluir_cliente/:id', async (req, res) => {
        let connection, clienteModel;;
        try {
            connection = await mysql.createConnection(dbConnection);
            clienteModel = new ClienteDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            await clienteModel.excluirCliente({ id: req.params.id });

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