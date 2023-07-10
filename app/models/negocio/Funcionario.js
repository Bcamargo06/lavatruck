class Cliente {
    constructor(cliente){
        this.id_funcionario = cliente.funcionario_id
        this.nome_completo = cliente.nome_completo_funcionario.toUpperCase();
        this.cpf_cnpj = cliente.cpf_cnpj_funcionario;
        this.funcao = cliente.funcao_funcionario ? cliente.funcao_funcionario.toUpperCase() : null;
        this.data_admissao = cliente.data_admissao;
        this.data_demissao = cliente.data_demissao || null;
    }
}

module.exports = Cliente;