class ServicoProduto {
    constructor(produto){
        this.servico_id = produto.id_servico,
        this.produto_id = produto.codigo_produto,
        this.valor_total = produto.valor_produto * produto.quantidade,
        this.quantidade = produto.quantidade,
        this.valor_imposto = produto.valor_imposto
    }
}
module.exports = ServicoProduto;