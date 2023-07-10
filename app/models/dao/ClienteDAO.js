let mysql = require('mysql')

class ClienteDAO {
    constructor(connection) {
        this._connection = connection;
    }

    buscarClientes() {
        return new Promise((resolve, reject) => {
            this._connection.query(`SELECT * FROM CLIENTES`, [],
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err)
                    }
                })
        })
    }

    cadastrarCliente(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.razao_social,
                binds.email,
                binds.endereco,
                binds.numero_endereco,
                binds.telefone1,
                binds.telefone2,
                binds.cidade,
                binds.bairro,
                binds.estado,
                binds.cep,
                binds.inscricao_estadual,
                binds.cnpj];

            this._connection.query(`INSERT INTO CLIENTES(RAZAO_SOCIAL,
                                                        EMAIL,
                                                        ENDERECO,
                                                        NUMERO,
                                                        TELEFONE1,
                                                        TELEFONE2,
                                                        CIDADE,
                                                        BAIRRO,
                                                        ESTADO,
                                                        CEP,
                                                        INSCRICAO_ESTADUAL,
                                                        CNPJ)VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err)
                    }
                })
        })
    }

    alterarCliente(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.razao_social,
                binds.email,
                binds.endereco,
                binds.numero_endereco,
                binds.telefone1,
                binds.telefone2,
                binds.cidade,
                binds.bairro,
                binds.estado,
                binds.cep,
                binds.inscricao_estadual,
                binds.cnpj,
                binds.id_cliente];

            this._connection.query(`UPDATE CLIENTES SET RAZAO_SOCIAL = ?,
                                                        EMAIL = ?,
                                                        ENDERECO = ?,
                                                        NUMERO = ?,
                                                        TELEFONE1 = ?,
                                                        TELEFONE2 = ?,
                                                        CIDADE = ?,
                                                        BAIRRO = ?,
                                                        ESTADO = ?,
                                                        CEP = ?,
                                                        INSCRICAO_ESTADUAL = ?,
                                                        CNPJ = ? WHERE ID_CLIENTE = ?`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err)
                    }
                })
        })
    }

    excluirCliente(binds){
        return new Promise((resolve, reject) => {
            this._connection.query(`DELETE FROM CLIENTES WHERE ID_CLIENTE = ?`, [binds.id],
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

module.exports = ClienteDAO;