class View {
    constructor(elemento) {
        this._elemento = elemento;
    }

    // This is the JavaScript way to "implement" abstract methods.
    // It is like a "trap" to warn the developer which this method must be developed in sub-classes.
    template() {
        throw new Error('O método template deve ser implementado');
    }

    update(model) {
        this._elemento.innerHTML = this.template(model);
    }
}