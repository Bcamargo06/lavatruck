let mysql = require('mysql')

class ProdutoDAO {
    constructor(connection) {
        this._connection = connection;
    }

    getProdutos() {
        return new Promise((resolve, reject) => {
            this._connection.query(`SELECT * FROM PRODUTOS`, [],
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err)
                    }
                })
        })
    }

    postProduto(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.descricao_produto,
                binds.descricao_compl_produto,
                binds.valor
            ];

            this._connection.query(`INSERT INTO PRODUTOS(DESCRICAO_PRODUTO,
                                                         DESCRICAO_COMPL_PRODUTO,
                                                         VALOR)VALUES(?,?,?)`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err)
                    }
                })
        })
    }

    alterarProduto(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.descricao_produto,
                binds.descricao_compl_produto,
                binds.valor,
                binds.id_produto];

            this._connection.query(`UPDATE PRODUTOS SET DESCRICAO_PRODUTO = ?,
                                                        DESCRICAO_COMPL_PRODUTO = ?,
                                                        VALOR = ?
                                                        WHERE ID_PRODUTO = ?`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err)
                    }
                })
        })
    }

    deleteProduto(binds){
        return new Promise((resolve, reject) => {
            this._connection.query(`DELETE FROM PRODUTOS WHERE ID_PRODUTO = ?`, [binds.id_produto],
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

module.exports = ProdutoDAO;