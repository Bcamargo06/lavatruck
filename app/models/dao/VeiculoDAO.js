let mysql = require('mysql')

class VeiculoDAO {
    constructor(connection) {
        this._connection = connection;
    }

    postVeiculo(binds) {
        return new Promise((resolve, reject) => {
            const values = [binds.cliente_id,
            binds.chassi,
            binds.placa
            ];

            this._connection.query("INSERT INTO VEICULOS(CLIENTE_ID,CHASSI,PLACA) VALUES (?,?,?)", values,
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "postVeiculo.postVeiculo",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    getVeiculos(binds) {
        return new Promise((resolve, reject) => {
            this._connection.query("SELECT * FROM VEICULOS WHERE CLIENTE_ID = ?", [binds.cliente_id],
                (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject({
                            "name": "postVeiculo.getVeiculos",
                            "message": err.message,
                            "stack": err.stack
                        })
                    }
                })
        })
    }

    deleteVeiculo(binds){
        return new Promise((resolve, reject) => {
            this._connection.query(`DELETE FROM VEICULOS WHERE ID_VEICULO = ?`, [binds.id_veiculo],
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

module.exports = VeiculoDAO;