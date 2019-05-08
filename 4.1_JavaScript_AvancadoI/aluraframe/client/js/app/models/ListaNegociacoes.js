class ListaNegociacoes {
    constructor() {
        this._negociacoes = []
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }


    get negociacoes() {
        // To guarantee that only this class will change its data member this._negociacoes,
        // we cannot return its reference: return this._negociacoes;
        // Instead, let's return a copy of the list/array...
        // DEFENSIVE PROGRAMMING

        return [].concat(this._negociacoes);
    }
}