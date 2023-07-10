require('dotenv').config({
  path: '../../../.env'
});

const dbConnection = require('../../../database/dbMysql');
const ClienteDAO = require('../../models/dao/ClienteDAO');
const ProdutoDAO = require('../../models/dao/ProdutoDAO');
const mysql = require('mysql');

module.exports = function (application) {
  let version = require('../../../package').version;
  let app_name = require('../../../package').app_name;
  let copyright = require('../../../package').copyright;

  application.get('/gerar_servico', async (req, res) => {
    let connection, clienteModel, produtoModel;

    try {
      connection = await mysql.createConnection(dbConnection);
      clienteModel = new ClienteDAO(connection);
      produtoModel = new ProdutoDAO(connection);

      connection.connect(function (err) {
        if (!err) {
          return connection;
        }
      });

      let recordsClientes = await clienteModel.buscarClientes();
      let recordsProdutos = await produtoModel.getProdutos();

      res.render("servico/gera_servico", {
        "version": version,
        "app_name": app_name,
        "copyright": copyright,
        "recordsClientes": recordsClientes,
        "recordsProdutos": recordsProdutos
      });
    } catch (error) {
      res.render("servico/gera_servico", {
        "version": version,
        "app_name": app_name,
        "copyright": copyright,
        "recordsClientes": [],
        "recordsProdutos": []
      });
    }

  });
};