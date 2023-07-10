module.exports = function (application) {
  let version = require('../../../package').version;
  let app_name = require('../../../package').app_name;
  let copyright = require('../../../package').copyright;

  application.get('/cadastrar_produto', async (req, res) => {
    res.render("produto/cadastra_produto", {
      "version": version,
      "app_name": app_name,
      "copyright": copyright
    });
  });

  application.get('/alterar_produto', async (req, res) => {
    res.render("produto/altera_produto", {
      "version": version,
      "app_name": app_name,
      "copyright": copyright
    });
  });
};