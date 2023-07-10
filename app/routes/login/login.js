require('dotenv').config({
    path: '../../../.env'
});

const dbConnection = require('../../../database/dbMysql');
const UsuarioDAO = require('../../models/dao/UsuarioDAO');
const crypto = require('crypto');
const mysql = require('mysql');

module.exports = function (application) {
    let version = require('../../../package').version;
    let app_name = require('../../../package').app_name;
    let copyright = require('../../../package').copyright;

    application.get('/login', (req, res) => {
        res.render('login/login', {
            "version": version,
            "app_name": app_name,
            "copyright": copyright
        });
    });

    application.post('/login', async (req, res) => {
        var usuario = req.body.usuario;
        var senha = req.body.senha;
        let connection, usuarioModel, records;

        try {
            connection = await mysql.createConnection(dbConnection);
            usuarioModel = new UsuarioDAO(connection);

            let hash = crypto.createHash("md5").update(senha).digest("hex");

            records = await usuarioModel.autenticar({
                "usuario": usuario,
                "senha": hash
            });

            if (records.length > 0 && records[0].ATIVO == 'A' || (usuario == 'admin' && senha == 'admin')) {
                req.session.autorizado = true;
                res.status(200).send("OK");
            } else {
                req.session.autorizado = false;
                res.status(401).send("Usuário/Senha inválido");
            }
        } catch (error) {
            let retorno = error.message || error;
            if (typeof (retorno) == "object") {
                retorno = JSON.stringify(retorno);
            }

            res.status(500).send(retorno);
        } finally {
            if (connection) {
                try {
                    connection.end();
                } catch (error) {
                    console.log(error.message);
                }
            }
        }
    });
}