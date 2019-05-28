import React from 'react';
import PubSub from 'pubsub-js';


// `export default` allows the component be found in other files
// Similary, we could declare this export at the end of this file
export default class InputCustomizado extends React.Component{
    constructor() {
        super();
        this.state = {msgErro: ""};
    }


    componentDidMount() {
        PubSub.subscribe("erro-validacao", (topico, erro) => {
            // Se o campo que resultou no erro é o campo deste input, então mostra o erro na tela
            if (erro.field === this.props.name) {
                this.setState({msgErro: erro.defaultMessage});
            }
        });


        PubSub.subscribe("limpa-erros", topico => this.setState({msgErro:''}));
    }


    // Quando criamos o componente no qual passaremos parâmetros, eles serão recebidos no
    // componente por meio de um atributo que já vem herdado da classe Component chamado props.
    // O atributo guardará todos os parâmetros que foram enviados para este componente.
    //
    // props are inputs to a React component.
    // They are data passed down from a parent component to a child component.
    // Remember that props are readonly.
    // If you need to modify some value in response to user input or a network response, use state instead.
    render() {
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input id={this.props.id} type={this.props.type} name={this.props.nome} value={this.props.value} onChange={this.props.onChange}/>
                <span className="erro">{this.state.msgErro}</span>
            </div>
        );
    }
}

// export default InputCustomizado;