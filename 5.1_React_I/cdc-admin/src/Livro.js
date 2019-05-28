import React, { Component } from 'react';
import InputCustomizado from './componentes/InputCustomizado';
import BotaoSubmitCustomizado from "./componentes/BotaoSubmitCustomizado";
import TratadorErros from './TratadorErros';

import PubSub from 'pubsub-js';
import axios from "axios";


class TabelaLivros extends Component {
    render() {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                    <tr>
                        <th>Título</th>
                        <th>Preço</th>
                        <th>Autor</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.lista.map(function (livro) {
                            return (
                                <tr key={livro.id}>
                                    <td>{livro.titulo}</td>
                                    <td>{livro.preco}</td>
                                    <td>{livro.autor.nome}</td>
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


class FormularioLivro extends Component {

    constructor() {
        super();
        this.state = {titulo: '', preco: '', autorID: ''};
        this.enviaForm = this.enviaForm.bind(this);
        this.setTitulo = this.setTitulo.bind(this);
        this.setPreco = this.setPreco.bind(this);
        this.setAutorId = this.setAutorId.bind(this);
    }


    setTitulo(evento){
        this.setState({titulo: evento.target.value});
    }

    setPreco(evento){
        this.setState({preco: evento.target.value});
    }

    setAutorId(evento){
        this.setState({autorId: evento.target.value});
    }


    enviaForm(evento) {
        evento.preventDefault();

        let livro  = {titulo: this.state.titulo, preco: this.state.preco, autorId: this.state.autorId};
        console.log(livro);

        // Configure um Axios Interceptor que faz algo antes que um request seja enviado
        axios.interceptors.request.use(config => {
            console.log(config);
            PubSub.publish("limpa-erros",{}); // limpa mensagens de erros dos campos
            return config; // obrigatorio retornar as config do request que será disparado
        });

        axios.post("http://cdc-react.herokuapp.com/api/livros", livro)
            .then(response => {
                let novaListagem = response.data;
                PubSub.publish('atualiza-lista-livros', novaListagem);
                this.setState({titulo:'', preco:'', autorId:''}); // limpa o formulario
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
                    <InputCustomizado id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.setTitulo} label="Título"/>
                    <InputCustomizado id="preco" type="preco" name="preco" value={this.state.preco} onChange={this.setPreco} label="Preço"/>
                    <InputCustomizado id="autorId" type="password" name="autorId" value={this.state.autorId} onChange={this.setAutorId} label="Autor ID"/>
                    <BotaoSubmitCustomizado label="Gravar"/>
                </form>
            </div>
            );
    }
}


export default class LivroBox extends Component {
    constructor() {
        super();
        this.state = {lista : []};
    }

    componentWillMount() {
        axios.get("http://cdc-react.herokuapp.com/api/livros")
            .then(response => {
                let lista = response.data;

                // mostre-me apenas os 10 últimos registros.
                let beginSlice = (lista.length < 10) ? 0 : lista.length - 10;
                let sublista = lista.slice(beginSlice);

                this.setState({lista : sublista});
            })
            .catch(error => {
                this.setState({lista: []});
                alert("Error when loading json of Livros");
            });


        PubSub.subscribe('atualiza-lista-livros', (topico, novaLista) => {
            // mostre-me apenas os 10 últimos registros.
            let beginSlice = (novaLista.length < 10) ? 0 : novaLista.length - 10;
            let novaSublista = novaLista.slice(beginSlice);

            this.setState({lista: novaSublista});
        });
    }


    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de livros</h1>
                </div>
                <div className="content" id="content">
                    <TabelaLivros lista={this.state.lista} />
                </div>
            </div>
        );
    }
}