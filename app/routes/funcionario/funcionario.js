module.exports = function (application) {
    let version = require('../../../package').version;
    let app_name = require('../../../package').app_name;
    let copyright = require('../../../package').copyright;

    application.get('/cadastrar_funcionario', async (req, res) => {
        res.render("funcionario/cadastra_funcionario", {
            "version": version,
            "app_name": app_name,
            "copyright": copyright
        });
    });

    application.get('/alterar_funcionario', async (req, res) => {
        res.render("funcionario/altera_funcionario", {
            "version": version,
            "app_name": app_name,
            "copyright": copyright
        });
    });

};