const crypto = require('crypto');

class Usuario {
    constructor(usuario){
        this.id_usuario = usuario.id_usuario;
        this.nome = usuario.nome_usuario.toUpperCase();
        this.usuario = usuario.usuario.toLowerCase().trim();
        this.senha = usuario.senha_usuario ? crypto.createHash("md5").update(usuario.senha_usuario.trim()).digest("hex") : '';
        this.email = usuario.email_usuario.toUpperCase();
        this.ativo = usuario.situacao_usuario;
        this.grupo = usuario.grupo_usuario;
        this.cliente = usuario.codigo_cliente;
    }
}
module.exports = Usuario;