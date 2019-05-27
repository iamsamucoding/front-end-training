import React from 'react';
import axios from 'axios'; // to manipulate HTTP requests

import InputCustomizado from './componentes/InputCustomizado';
import BotaoSubmitCustomizado from './componentes/BotaoSubmitCustomizado';

import './css/pure-min.css';
import './css/side-menu.css';

class App extends React.Component {
    constructor() {
        super();
        // A component needs state when some data associated with it changes over time.
        // state is managed by the component itself.
        //
        this.state = {lista: [], nome: "", email: "", senha: ""};


        // If we don't `bind` the `this` (object App) in this functions, the `this` will be not defined inside
        // these function.
        // Then, we will have the following error when trying: this.setState(...)
        // Cannot read property 'setState' of undefined.
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }


    setNome(evento) {
        this.setState({nome:evento.target.value});
    }

    setEmail(evento) {
        this.setState({email:evento.target.value});
    }

    setSenha(evento) {
        this.setState({senha:evento.target.value});
    }


    // O React fornece funções que serão chamadas em determinados ciclos de vida do componente.
    // Uma delas é componentDidMount() usada quando o componente acabou de ser montado.
    // Ela será chamada logo após o método render() ser invocado pela primeira vez.
    //
    // Uma outra função é o componentWillMount(), que será chamada antes da invocação do render().
    componentWillMount() {
        axios.get("http://cdc-react.herokuapp.com/api/autores")
            // handle success
            .then(response => {
                    this.setState({lista : response.data}); // changes the states and re-render the HTML component
            })
            .catch(error => {
                    this.setState({lista: []});
                    alert("Error when loading json");
            });
    }


    enviaForm(evento) {
        evento.preventDefault();  // não desejamos que um evento continue sendo propagado. - não recarrega a página

        let user  = {nome: this.state.nome, email: this.state.email, senha: this.state.senha};
        console.log(user);

        axios.post("http://cdc-react.herokuapp.com/api/autores", user)
            .then(response => {
                console.log(response);
                // updates the state with the new lista
                // then, the html is re-rendering
                console.log(response);
                console.log(response.data);
                this.setState({lista: response.data});
            })
            .catch(error => {
                console.log(error);
            });
    }


    render() {
        return (
            <div id="layout">
                <a href="#menu" id="menuLink" className="menu-link">
                    <span></span>
                </a>

                <div id="menu">
                    <div className="pure-menu">
                        <a className="pure-menu-heading" href="#">Company</a>

                        <ul className="pure-menu-list">
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>
                        </ul>
                    </div>
                </div>

                <div id="main">
                    <div className="header">
                        <h1>Cadastro de Autores</h1>
                    </div>
                    <div className="content" id="content">
                        <div className="pure-form pure-form-aligned">
                            <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">

                                {/* Quando criamos o componente no qual passaremos parâmetros, eles serão recebidos no
                                    componente por meio de um atributo que já vem herdado da classe Component chamado props.
                                    O atributo guardará todos os parâmetros que foram enviados para este componente.

                                    props are inputs to a React component.
                                    They are data passed down from a parent component to a child component.
                                    Remember that props are readonly.
                                    If you need to modify some value in response to user input or a network response, use state instead.
                                */}
                                <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"/>
                                <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email"/>
                                <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha"/>
                                <BotaoSubmitCustomizado label="Gravar"/>
                            </form>

                        </div>
                        <div>
                            <table className="pure-table">
                                <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>email</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.lista.map(function(autor){
                                        return (
                                            // we added a primary key for each element in order to
                                            // speed up the data value checking after calling setState()
                                            // for re-rendering the HTML component.
                                            <tr key={autor.id}>
                                                <td>{autor.nome}</td>
                                                <td>{autor.email}</td>
                                            </tr>
                                        );
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
