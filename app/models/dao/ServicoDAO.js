let mysql = require('mysql')

class ServicoDAO {
    constructor(connection) {
        this._connection = connection;
    }

    gravaCabecalhoServico(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.cliente_id,
                binds.motorista,
                binds.valor_total,
                binds.valor_imposto,
                binds.valor_desconto,
                binds.ordem_servico,
                binds.veiculo1,
                binds.vaiculo2,
                binds.departamento,
                binds.lacre,
                binds.carga1,
                binds.carga2,
                binds.carga3,
                binds.data_servico,
                binds.unidade];

            this._connection.query(`INSERT INTO SERVICOS(CLIENTE_ID,
                                                         MOTORISTA,
                                                         VALOR_TOTAL,
                                                         VALOR_IMPOSTO,
                                                         VALOR_DESCONTO,
                                                         ORDEM_SERVICO,
                                                         VEICULO1,
                                                         VAICULO2,
                                                         DEPARTAMENTO,
                                                         LACRE,
                                                         CARGA1,
                                                         CARGA2,
                                                         CARGA3,
                                                         DATA_SERVICO,UNIDADE)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err)
                    }
                })
        })
    }

    buscaUltimoRegistroInserido() {
        return new Promise((resolve, reject) => {
            this._connection.query("SELECT LAST_INSERT_ID() SERVICOS", [], (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err);
                }
            })
        })
    }

    buscaOrcamentoCliente(binds) {
        return new Promise((resolve, reject) => {
            this._connection.query(`
            SELECT ID_SERVICO,
                    CLIENTE_ID,
                    FUNCIONARIO_ID,
                    VALOR_TOTAL,
                    VALOR_IMPOSTO,
                    EMAIL_ZAP_ENVIADO,
                    VALOR_DESCONTO,
                    NOTA_GERADA,
                    VEICULO1,
                    VAICULO2,
                    DEPARTAMENTO,
                    LACRE,
                    CARGA1,
                    CARGA2,
                    CARGA3,
                    MOTORISTA,
                    DATA_CRIACAO,
                    DATA_SERVICO,
                    RASCUNHO 
            FROM SERVICOS WHERE CLIENTE_ID = ? AND RASCUNHO = 'S'`, [binds.cliente], (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err);
                }
            })
        })
    }

    buscaServicos(binds) {
        return new Promise((resolve, reject) => {
            this._connection.query(`
            SELECT B.RAZAO_SOCIAL,A.*
            FROM SERVICOS A
            INNER JOIN CLIENTES B ON A.CLIENTE_ID = B.ID_CLIENTE
            WHERE A.RASCUNHO = 'N'
            AND A.UNIDADE = ?`, [binds.id], (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err);
                }
            })
        })
    }

    fechaServico(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.cliente_id,
                binds.motorista,
                binds.valor_total,
                binds.valor_imposto,
                binds.valor_desconto,
                binds.veiculo1,
                binds.vaiculo2,
                binds.departamento,
                binds.lacre,
                binds.carga1,
                binds.carga2,
                binds.carga3,
                binds.data_servico,
                binds.unidade,
                binds.id_servico];

            this._connection.query(`UPDATE SERVICOS SET  CLIENTE_ID = ?,
                                                         MOTORISTA = ?,
                                                         VALOR_TOTAL = ?,
                                                         VALOR_IMPOSTO = ?,
                                                         VALOR_DESCONTO = ?,
                                                         VEICULO1 = ?,
                                                         VAICULO2 = ?,
                                                         DEPARTAMENTO = ?,
                                                         LACRE = ?,
                                                         CARGA1 = ?,
                                                         CARGA2 = ?,
                                                         CARGA3 = ?,
                                                         DATA_SERVICO = ?,
                                                         UNIDADE = ?,
                                                         RASCUNHO = 'N' WHERE ID_SERVICO = ?`, values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err)
                    }
                })
        })
    }

    buscaDadosGeraisServico(binds) {
        return new Promise((resolve, reject) => {
            this._connection.query(`
            SELECT A.*,
                   B.VALOR_TOTAL VALOR_TOT_ITEM,
                   B.QUANTIDADE,
                   C.RAZAO_SOCIAL,
                   D.ID_PRODUTO,
                   CONCAT(D.DESCRICAO_PRODUTO, ' ', D.DESCRICAO_COMPL_PRODUTO) DESCRICAO_PRODUTO
            FROM SERVICOS A
            INNER JOIN SERVICO_PRODUTOS B 
                ON A.ID_SERVICO = B.SERVICO_ID
            INNER JOIN CLIENTES C 
                ON A.CLIENTE_ID = C.ID_CLIENTE
            INNER JOIN PRODUTOS D
                ON B.PRODUTO_ID = D.ID_PRODUTO
            WHERE A.ID_SERVICO = ?`, [binds.id_servico], (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err);
                }
            })
        })
    }

}

module.exports = ServicoDAO;