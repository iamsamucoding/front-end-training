import React from 'react';


// `export default` allows the component be found in other files
// Similary, we could declare this export at the end of this file
export default class InputCustomizado extends React.Component{

    // Quando criamos o componente no qual passaremos parâmetros, eles serão recebidos no
    // componente por meio de um atributo que já vem herdado da classe Component chamado props.
    // O atributo guardará todos os parâmetros que foram enviados para este componente.
    //
    // props are inputs to a React component.
    // They are data passed down from a parent component to a child component.
    // Remember that props are readonly.
    // If you need to modify some value in response to user input or a network response, use state instead.
    render() {
        return(
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input id={this.props.id} type={this.props.type} name={this.props.nome} value={this.props.value} onChange={this.props.onChange}/>
            </div>
        );
    }
}

// export default InputCustomizado;