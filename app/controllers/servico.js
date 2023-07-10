require('dotenv').config({
    path: '../../.env'
});
const dbConnection = require('../../database/dbMysql');
const ServicoDAO = require('../models/dao/ServicoDAO');
const ServicoProdutoDAO = require('../models/dao/ServicoProdutoDAO');
const Servico = require('../models/negocio/Servico');
const ServicoProduto = require('../models/negocio/ServicoProduto');
const Laudo = require('../../utils/laudo');
const PrintServico = require('../../utils/print_servico');
const mysql = require('mysql');

module.exports = function (application) {

    application.get('/servico/produtos/orcamento/:id', async (req, res) => {
        let connection, servicoProdutoModel, rows, recordsTotal, records, draw = req.query.draw || 1;
        try {
            connection = await mysql.createConnection(dbConnection);
            servicoProdutoModel = new ServicoProdutoDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await servicoProdutoModel.buscaProdutosOrcamento({
                "id_orcamento": req.params.id
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

    application.post('/servico/produto', async (req, res) => {
        let connection, servicoModel, idServico;
        try {
            connection = await mysql.createConnection(dbConnection);
            servicoModel = new ServicoDAO(connection);
            servicoProdutoModel = new ServicoProdutoDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            if (!req.body.id_servico || req.body.id_servico == '0') {
                await servicoModel.gravaCabecalhoServico(new Servico(req.body));
                // Busca o id do servico criado.
                idServico = await servicoModel.buscaUltimoRegistroInserido();
                req.body.id_servico = idServico[0].SERVICOS;
            }

            if (req.body.id_servico) {
                let buscaProdutoServico = await servicoProdutoModel.buscaProdutoServico({
                    "id_servico": req.body.id_servico,
                    "codigo_produto": req.body.codigo_produto
                });

                if(buscaProdutoServico.length == 0){
                    await servicoProdutoModel.gravaProdutoServico(new ServicoProduto(req.body));
                }else{
                    await servicoProdutoModel.atualizaProdutoServico(new ServicoProduto(req.body));
                }
            }

            res.status(200).json({
                "tipo": 'success',
                "message": 'Produto incluído com sucesso. <br>',
                "ID_SERVICO": req.body.id_servico
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

    application.get('/servico/orcamento/cliente/:id', async(req, res) => {
        let connection, servicoModel, records;
        try {
            connection = await mysql.createConnection(dbConnection);
            servicoModel = new ServicoDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await servicoModel.buscaOrcamentoCliente({
                "cliente": req.params.id
            });

            res.status(200).json({
                "tipo": 'success',
                "message": records.length > 0 ? 'Rascunho do cliente carregado na tela.' : 'Cliente sem rascunho!<br>Prossiga com o novo Orçamento.',
                "VEICULO1": records.length > 0 ? records[0].VEICULO1 : '',
                "VEICULO2": records.length > 0 ? records[0].VEICULO2 : '',
                "MOTORISTA": records.length > 0 ? records[0].MOTORISTA : '',
                "DEPARTAMENTO": records.length > 0 ? records[0].DEPARTAMENTO : '',
                "LACRE": records.length > 0 ? records[0].LACRE : '',
                "CARGA1": records.length > 0 ? records[0].CARGA1 : '',
                "CARGA2": records.length > 0 ? records[0].CARGA2 : '',
                "CARGA3": records.length > 0 ? records[0].CARGA3 : '',
                "VALOR_DESCONTO": records.length > 0 ? records[0].VALOR_DESCONTO : '',
                "DATA_SERVICO": records.length > 0 ? records[0].DATA_SERVICO.toISOString().substring(0,10) : '',
                "ID_SERVICO": records.length > 0 ? records[0].ID_SERVICO : ''
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

    application.get('/servicos/:id', async(req, res) => {
        let connection, servicoModel, rows, recordsTotal, records, draw = req.query.draw || 1;
        try {
            connection = await mysql.createConnection(dbConnection);
            servicoModel = new ServicoDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            records = await servicoModel.buscaServicos({
                "id": req.params.id
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

    application.put('/servico/fechar', async(req, res) => {
        let connection, servicoModel, idServico;
        try {
            connection = await mysql.createConnection(dbConnection);
            servicoModel = new ServicoDAO(connection);
            servicoProdutoModel = new ServicoProdutoDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            await servicoModel.fechaServico(new Servico(req.body));

            res.status(200).json({
                "tipo": 'success',
                "message": 'Serviço fechado com sucesso! <br>'
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

    application.get('/servico/laudo/:id', async(req, res) => {
        let connection, servicoModel, record, dadosGerais = {};
        dadosGerais.produtos = [];
        let produtos = []

        try {
            connection = await mysql.createConnection(dbConnection);
            servicoModel = new ServicoDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            record = await servicoModel.buscaDadosGeraisServico({"id_servico": req.params.id});

            produtos = record.map((data) => {
                return {
                    "idProduto": data.ID_PRODUTO,
                    "descricao": data.DESCRICAO_PRODUTO,
                    "valorTotal": data.VALOR_TOT_ITEM,
                    "quantidade": data.QUANTIDADE,
                }
            });

            dadosGerais.idServico = record[0].ID_SERVICO;
            dadosGerais.valorTotal = record[0].VALOR_TOTAL;
            dadosGerais.valorImpostos = record[0].VALOR_IMPOSTO;
            dadosGerais.valorDesconto = record[0].VALOR_DESCONTO;
            dadosGerais.veiculo1 = record[0].VEICULO1;
            dadosGerais.veiculo2 = record[0].VAICULO2;
            dadosGerais.departamento = record[0].DEPARTAMENTO;
            dadosGerais.lacre = record[0].LACRE;
            dadosGerais.carga1 = record[0].CARGA1;
            dadosGerais.carga2 = record[0].CARGA2;
            dadosGerais.carga3 = record[0].CARGA3;
            dadosGerais.motorista = record[0].MOTORISTA;
            dadosGerais.dataServico = record[0].DATA_SERVICO.toLocaleString().substring(0,10);
            dadosGerais.razaoSocial = record[0].RAZAO_SOCIAL;
            dadosGerais.dataAtual = new Date().toLocaleString().substring(0,10);

            dadosGerais.produtos = produtos;

            await Laudo.laudoToPdf(dadosGerais);

            res.status(200).json({
                "tipo": 'success',
                "message": 'Serviço fechado com sucesso! <br>'
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

    application.get('/servico/imprime/:id', async(req, res) => {
        let connection, servicoModel, record, dadosGerais = {};
        dadosGerais.produtos = [];
        let produtos = []

        try {
            connection = await mysql.createConnection(dbConnection);
            servicoModel = new ServicoDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            record = await servicoModel.buscaDadosGeraisServico({"id_servico": req.params.id});

            produtos = record.map((data) => {
                return {
                    "idProduto": data.ID_PRODUTO,
                    "descricao": data.DESCRICAO_PRODUTO,
                    "valorTotal": data.VALOR_TOT_ITEM,
                    "quantidade": data.QUANTIDADE,
                }
            });

            dadosGerais.idServico = record[0].ID_SERVICO;
            dadosGerais.valorTotal = record[0].VALOR_TOTAL;
            dadosGerais.valorImpostos = record[0].VALOR_IMPOSTO;
            dadosGerais.valorDesconto = record[0].VALOR_DESCONTO;
            dadosGerais.veiculo1 = record[0].VEICULO1;
            dadosGerais.veiculo2 = record[0].VAICULO2;
            dadosGerais.departamento = record[0].DEPARTAMENTO;
            dadosGerais.lacre = record[0].LACRE;
            dadosGerais.carga1 = record[0].CARGA1;
            dadosGerais.carga2 = record[0].CARGA2;
            dadosGerais.carga3 = record[0].CARGA3;
            dadosGerais.ordemServico = record[0].ORDEM_SERVICO;
            dadosGerais.motorista = record[0].MOTORISTA;
            dadosGerais.dataServico = record[0].DATA_SERVICO.toLocaleString().substring(0,10);
            dadosGerais.razaoSocial = record[0].RAZAO_SOCIAL;
            dadosGerais.dataAtual = new Date().toLocaleString().substring(0,10);

            dadosGerais.produtos = produtos;

            await PrintServico.print(dadosGerais);

            res.status(200).json({
                "tipo": 'success',
                "message": 'Serviço fechado com sucesso! <br>'
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