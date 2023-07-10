let mysql = require('mysql')

class ServicoProdutoDAO {
    constructor(connection) {
        this._connection = connection;
    }

    gravaProdutoServico(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.servico_id,
                binds.produto_id,
                binds.valor_total,
                binds.quantidade,
                binds.valor_imposto];

            this._connection.query(`INSERT INTO SERVICO_PRODUTOS(SERVICO_ID,
                                                                 PRODUTO_ID,
                                                                 VALOR_TOTAL,
                                                                 QUANTIDADE,
                                                                 VALOR_IMPOSTO)VALUES(?,?,?,?,?)`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err)
                    }
                })
        })
    }

    atualizaProdutoServico(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.valor_total,
                binds.quantidade,
                binds.valor_imposto,
                binds.servico_id,
                binds.produto_id];

            this._connection.query(`UPDATE SERVICO_PRODUTOS SET VALOR_TOTAL = ?, QUANTIDADE = ?, VALOR_IMPOSTO = ? 
                                    WHERE SERVICO_ID = ? AND
                                    PRODUTO_ID = ?`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err)
                    }
                })
        })
    }

    buscaProdutosOrcamento(binds) {
        return new Promise((resolve, reject) => {
            this._connection.query(`SELECT C.DESCRICAO_PRODUTO,B.* FROM SERVICOS A, SERVICO_PRODUTOS B, PRODUTOS C 
            WHERE A.ID_SERVICO = B.SERVICO_ID AND
            B.PRODUTO_ID = C.ID_PRODUTO AND A.ID_SERVICO = ?`, [binds.id_orcamento], (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err);
                }
            })
        })
    }

    buscaProdutoServico(binds) {
        return new Promise((resolve, reject) => {
            this._connection.query(`SELECT 1 FROM SERVICO_PRODUTOS WHERE SERVICO_ID = ? AND PRODUTO_ID = ?`, [binds.id_servico, binds.codigo_produto],
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

module.exports = ServicoProdutoDAO;