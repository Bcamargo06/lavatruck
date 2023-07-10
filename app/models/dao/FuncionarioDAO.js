let mysql = require('mysql')

class FuncionarioDAO {
    constructor(connection) {
        this._connection = connection;
    }

    buscarFuncionarios() {
        return new Promise((resolve, reject) => {
            this._connection.query(`
            SELECT ID_FUNCIONARIO,
                   NOME,
                   CPF_CNPJ,
                   CARGO,
                   DATE_FORMAT(DATA_ADMISSAO,'%d/%m/%Y')DATA_ADMISSAO,
                   DATE_FORMAT(DATA_DEMISSAO,'%d/%m/%Y')DATA_DEMISSAO
            FROM FUNCIONARIOS`, [],
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err)
                    }
                })
        })
    }

    postFuncionario(binds) {
        return new Promise((resolve, reject) => {
            const values = [
                binds.nome_completo,
                binds.cpf_cnpj,
                binds.funcao,
                binds.data_admissao,
                binds.data_demissao];

            this._connection.query("INSERT INTO FUNCIONARIOS(NOME,CPF_CNPJ,CARGO,DATA_ADMISSAO,DATA_DEMISSAO)VALUES(?,?,?,?,?)", values,
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

module.exports = FuncionarioDAO;