require('dotenv').config({
    path: '../../.env'
});
const dbConnection = require('../../database/dbMysql');
const UsuarioDAO = require('../models/dao/UsuarioDAO');
const Usuario = require('../models/negocio/Usuario');
const mysql = require('mysql');

module.exports = function (application) {

    application.post('/cadastrar_usuario', async (req, res) => {
        let connection, usuarioModel;
        try {
            connection = await mysql.createConnection(dbConnection);
            usuarioModel = new UsuarioDAO(connection);

            connection.connect(function (err) {
                if (!err) {
                    return connection;
                }
            });

            await usuarioModel.postUsuario(new Usuario(req.body));

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
                    console.log({
                        "name": "usuario.cadastrar_usuario",
                        "message": err.message,
                        "stack": err.stack
                    });
                }
            }
        }
    })
}