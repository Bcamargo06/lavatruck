let mysql = require('mysql')

class UsuarioDAO {
    constructor(connection) {
        this._connection = connection;
    }

    autenticar(binds) {
        return new Promise((resolve, reject) => {
            this._connection.query(`SELECT * FROM USUARIOS WHERE USUARIO = ? AND SENHA = ?`, [binds.usuario, binds.senha],
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err)
                    }
                })
        })
    }

    postUsuario(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.nome,
                binds.usuario,
                binds.senha,
                binds.email,
                binds.ativo,
                binds.grupo,
                binds.cliente];

            this._connection.query("INSERT INTO USUARIOS(NOME,USUARIO,SENHA,EMAIL,ATIVO,GRUPO,ID_CLIENTE)VALUES(?,?,?,?,?,?,?)", values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err)
                    }
                })
        })
    }

    getUsuarios() {
        return new Promise((resolve, reject) => {
            this._connection.query(`SELECT A.ID_USUARIO,
                                           A.NOME,
                                           A.USUARIO,
                                           A.EMAIL,
                                           CASE WHEN A.ATIVO = 'A' THEN 'ATIVO' ELSE 'INATIVO' END AS ATIVO,
                                           A.ID_CLIENTE,
                                           B.RAZAO_SOCIAL,
                                           A.GRUPO 
                                    FROM USUARIOS A 
                                    LEFT JOIN CLIENTE B ON A.ID_CLIENTE = B.ID_CLIENTE `, [],
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err)
                    }
                })
        })
    }

    getAcessos(binds) {
        return new Promise((resolve, reject) => {
            this._connection.query(`SELECT A.ATIVO,A.GRUPO,B.PERMISSOES,D.NOME,A.ID_CLIENTE FROM USUARIOS A, GRUPO_ACESSOS B, ACESSOS_MENU C, TELAS D
            WHERE A.GRUPO = B.DESCRICAO AND
            A.GRUPO = C.GRUPO AND
            C.ID_TELA = D.ID AND A.ID_USUARIO = ?`, [binds.id],
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err)
                    }
                })
        })
    }

    alterarCadastroUsuario(binds) {
        return new Promise((resolve, reject) => {
            let sql = `
            UPDATE USUARIOS SET NOME = '${binds.nome}',
                                                        USUARIO = '${binds.usuario}',
                                                        ${binds.senha ? "SENHA = '" + binds.senha + "'," : ''}
                                                        EMAIL = '${binds.email}',
                                                        ATIVO = '${binds.ativo}',
                                                        GRUPO = '${binds.grupo}',
                                                        ID_CLIENTE = ${binds.cliente}
                                     WHERE ID_USUARIO = ${binds.id_usuario}`;

            this._connection.query(sql, [],
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err)
                    }
                })
        })
    }

    deleteUsuario(binds) {
        return new Promise((resolve, reject) => {
            this._connection.query(`DELETE FROM USUARIOS WHERE ID_USUARIO = ?`, [binds.id],
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err)
                    }
                })
        })
    }
}

module.exports = UsuarioDAO;