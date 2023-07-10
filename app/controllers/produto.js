require('dotenv').config({
    path: '../../.env'
});

const dbConnection = require('../../database/dbMysql');
const ProdutoDAO = require('../models/dao/ProdutoDAO');
const Produto = require('../models/negocio/Produto');
const mysql = require('mysql');


module.exports = function (application) {

    application.post('/cadastrar/produto', async (req, res) => {
        let connection, produtoModel;
        try {
            connection = await mysql.createConnection(dbConnection);
            produtoModel = new ProdutoDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await produtoModel.postProduto(new Produto(req.body));

            res.redirect('/alterar_produto');
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

    application.get('/produtos', async (req, res) => {
        let connection, produtoModel, rows, recordsTotal, records, draw = req.query.draw || 1;
        try {
            connection = await mysql.createConnection(dbConnection);
            produtoModel = new ProdutoDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await produtoModel.getProdutos();

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

    application.patch('/produto', async (req, res) => {
        let connection, produtoModel;
        try {
            connection = await mysql.createConnection(dbConnection);
            produtoModel = new ProdutoDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await produtoModel.alterarProduto(new Produto(req.body));

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

    application.delete('/produto/:id', async (req, res) => {
        let connection, produtoModel;;
        try {
            connection = await mysql.createConnection(dbConnection);
            produtoModel = new ProdutoDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            await produtoModel.deleteProduto({ id: req.params.id });

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