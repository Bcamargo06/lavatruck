class Servico {
    constructor(servico){
            this.id_servico = servico.id_servico,
            this.cliente_id = servico.cliente,
            this.motorista = servico.motorista,
            this.unidade = servico.codigo_unidade,
            this.valor_total = servico.valor_total || 0,
            this.valor_imposto = servico.valor_impostos || 0,
            this.valor_desconto = servico.valor_desconto || 0,
            this.ordem_servico = servico.ordem_servico,
            this.veiculo1 = servico.veiculo_1,
            this.vaiculo2 = servico.veiculo_2,
            this.departamento = servico.departamento,
            this.lacre = servico.lacre,
            this.carga1 = servico.carregamento_1,
            this.carga2 = servico.carregamento_2,
            this.carga3 = servico.carregamento_3,
            this.data_servico = new Date(servico.data_servico)
    }
}
module.exports = Servico;