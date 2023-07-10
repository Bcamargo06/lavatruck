module.exports = function (application) {
  let version = require('../../../package').version;
  let app_name = require('../../../package').app_name;
  let copyright = require('../../../package').copyright;

  application.get('/cadastrar_cliente', async (req, res) => {
    res.render("cliente/cadastra_cliente", {
      "version": version,
      "app_name": app_name,
      "copyright": copyright
    });
  });

  application.get('/alterar_cliente', async (req, res) => {
    res.render("cliente/altera_cliente", {
      "version": version,
      "app_name": app_name,
      "copyright": copyright
    });
  });
};