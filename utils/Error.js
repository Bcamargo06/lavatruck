class MyError extends Error {
    constructor(name = "Genérico", message = "Sem mensagem", stack = "Sem stack") {
        super(name, message, stack);
        this.name = name;
        this.message = message;
        this.stack = stack;
    }
}

module.exports = MyError;