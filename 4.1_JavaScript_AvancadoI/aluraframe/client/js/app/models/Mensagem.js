class Mensagem {
    constructor(texto='') {
        this._texto = texto;
    }

    // getter
    get texto() {
        return this._texto;
    }

    // setter
    set texto(texto) {
        this._texto = texto;
    }
}