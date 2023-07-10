class Produto {
    constructor(produto){
        this.id_produto = produto.produto_id;
        this.descricao_produto = produto.descricao_produto.toUpperCase();
        this.descricao_compl_produto = produto.decricao_complementar_produto ? produto.decricao_complementar_produto.toUpperCase() : '';
        this.valor = produto.valor_produto;
    }
}

module.exports = Produto;