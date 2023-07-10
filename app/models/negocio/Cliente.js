class Cliente {
    constructor(cliente){
        this.id_cliente = cliente.cliente_id;
        this.razao_social = cliente.razao_social_cliente.toUpperCase();
        this.email = cliente.endereco_email ? cliente.endereco_email.toLowerCase() : '';
        this.endereco = cliente.endereco_cliente ? cliente.endereco_cliente.toUpperCase() : '';
        this.numero_endereco = cliente.numero_endereco ? cliente.numero_endereco.toUpperCase() : '';
        this.telefone1 = cliente.telefone_cliente1;
        this.telefone2 = cliente.telefone_cliente2;
        this.cidade = cliente.cidade_cliente ? cliente.cidade_cliente.toUpperCase() : '';
        this.bairro = cliente.bairro_cliente ? cliente.bairro_cliente.toUpperCase() : '';
        this.cep = cliente.endereco_cep ? cliente.endereco_cep.toUpperCase() : '';
        this.estado = cliente.estado_cliente ? cliente.estado_cliente.toUpperCase() : '';
        this.cnpj = cliente.cnpj_cliente;
        this.inscricao_estadual = cliente.inscricao_estadual_cliente;
    }
}

module.exports = Cliente;