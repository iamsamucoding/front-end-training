import React, { Component } from 'react';
import InputCustomizado from './componentes/InputCustomizado';
import BotaoSubmitCustomizado from "./componentes/BotaoSubmitCustomizado";
import TratadorErros from './TratadorErros';

import PubSub from 'pubsub-js';
import axios from "axios";


class FormularioAutor extends Component {
    constructor() {
        super();
        this.state = {lista : [], nome:'',email:'', senha:''};
        // If we don't `bind` the `this` (object App) in this functions, the `this` will be not defined inside
        // these function.
        // Then, we will have the following error when trying: this.setState(...)
        // Cannot read property 'setState' of undefined.
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
        this.enviaForm = this.enviaForm.bind(this);
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


    enviaForm(evento) {
        evento.preventDefault();  // não desejamos que um evento continue sendo propagado. - não recarrega a página

        let user  = {nome: this.state.nome, email: this.state.email, senha: this.state.senha};
        console.log(user);

        // Configure um Axios Interceptor que faz algo antes que um request seja enviado
        axios.interceptors.request.use(config => {
            console.log(config);
            PubSub.publish("limpa-erros",{}); // limpa mensagens de erros dos campos
            return config; // obrigatorio retornar as config do request que será disparado
        });

        // uma vez que estamos usando arrow functions, o this mantém o contexto, ou seja, ele sempre será referente
        // a FormularioAutor, independente de onde é chamado
        axios.post("http://cdc-react.herokuapp.com/api/autores", user)
            .then(response => {
                // publica/dispara mensagem no tópico/canal 'atualiza-lista-autores' que temos uma nova listagem disponível
                let novaListagem = response.data;
                PubSub.publish('atualiza-lista-autores', novaListagem);
                this.setState({nome:'', email:'', senha:''}); // limpa o formulario
            })
            .catch(error => {
                let response = error.response;
                if (response.status === 400){
                    new TratadorErros().publicaErros(response.data.errors);
                }
            });
    }


    render() {
        return (
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
        );
    }
}



class TabelaAutores extends Component {
    render() {
        return (
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
                        this.props.lista.map(function(autor){
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
        );
    }
}


// Esta classe representa um Higher-order Components.
// São os componentes responsáveis por encapsular um estado que será trabalhado por vários outros componentes
// e que comumente nomeamos utilizando o sufixo Box.
// Depois, de criá-lo, podemos passá-lo como argumento. Pode passar como argumento a função que atualizará o estado.
export default class AutorBox extends Component {
    constructor() {
        super();
        // A component needs state when some data associated with it changes over time.
        // state is managed by the component itself.
        this.state = {lista : []};

        // the function atualizaListagem will always use the `this` of the AutorBox regardless where it is called.
        this.atualizaListagem = this.atualizaListagem.bind(this);
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
                let lista = response.data;

                // mostre-me apenas os 10 últimos registros.
                // Fiz isso pq a API da Alura estava com muitos registros e a página ficava lenta pra exibir tudo
                // isso na tela
                let beginSlice = (lista.length < 10) ? 0 : lista.length - 10;
                let sublista = lista.slice(beginSlice);

                this.setState({lista : sublista}); // changes the states and re-render the HTML component
            })
            .catch(error => {
                this.setState({lista: []});
                alert("Error when loading json");
            });


        // Me inscreva no tópico/canal 'atualiza-lista-autores' de modo que, quando tiver uma atualização neste topico
        // com uma nova listagem, eu chame uma function que têm 2 parâmetros: o tópico e o objeto atualizado no tópico
        //
        // Note que usamos o `this` dentro da function e queremos que ele seja sempre referente a um `AutorBox`,
        // independente de onde ele é chamado.
        // Se a function fosse uma função anônima ou um método da classe, teríamos que usar o .bind(this)
        // para forçar esse `this`.
        // Mas, como estamos usando uma arrow function, isto não é preciso pq ela sempre será chamada com o contexto
        // em que ela foi definida. No caso, AutorBox.
        PubSub.subscribe('atualiza-lista-autores', (topico, novaLista) => {
            // mostre-me apenas os 10 últimos registros.
            // Fiz isso pq a API da Alura estava com muitos registros e a página ficava lenta pra exibir tudo
            // isso na tela
            let beginSlice = (novaLista.length < 10) ? 0 : novaLista.length - 10;
            let novaSublista = novaLista.slice(beginSlice);

            this.setState({lista: novaSublista});
        });
    }


    atualizaListagem(novaLista) {
        this.setState({lista:novaLista});
    }


    render() {
        return (
            <div>
                <div className="header">
                    <h1>Bem-vindo</h1>
                </div>
                <div className="content" id="content">
                    <FormularioAutor callbackAtualizaListagem={this.atualizaListagem}/>
                    <TabelaAutores lista={this.state.lista}/>
                </div>
            </div>
        );
    }
}
