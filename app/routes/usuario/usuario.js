module.exports = function (application) {
    let version = require('../../../package').version;
    let app_name = require('../../../package').app_name;
    let copyright = require('../../../package').copyright;
    application.get('/cadastrar_usuario', async (req, res) => {
        res.render("usuario/cadastrar_usuario", {
            "version": version,
            "app_name": app_name,
            "copyright": copyright
        });
    });
};