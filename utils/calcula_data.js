
module.exports.converte_data = (dataEnsaio, dataVencimento) => {
    return new Promise(async (resolve, reject) => {
        try {

            var qtdeMeses = Number(dataVencimento);
            
            let data_ensaio = !Date.parse(dataEnsaio) || dataEnsaio == '0000-00-00' || dataEnsaio == '0000-00-00 00:00:00' ? new Date() : dataEnsaio;
            
            let data_vencimento = new Date(data_ensaio);
            
            if(qtdeMeses > 0){
                data_vencimento = data_vencimento.setMonth(data_vencimento.getMonth() + qtdeMeses);
            }else{
                data_vencimento = data_vencimento.setDate(data_vencimento.getDate() - 1);
            }

            data_vencimento = new Date(data_vencimento);

            return resolve ({
                dataEnsaio: data_ensaio,
                dataVencimento: data_vencimento
            })
            
        } catch (error) {
            reject(error.message || JSON.stringify(error));
        }
    })
}


module.exports.converte_data_string = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataAux = data.split('-');
            return resolve(dataAux[2] + '/' + dataAux[1] + '/' + dataAux[0])
            
        } catch (error) {
            reject(error.message || JSON.stringify(error));
        }
    })
}