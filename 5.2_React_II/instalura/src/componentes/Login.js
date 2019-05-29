import React, { Component } from 'react';

export default class Login extends Component {

    // Como passamos o parâmetro `msg` no state de um <Redirect /> para '/', o ideal é colocá-lo na mensagem
    // já existente no componente de login.
    //
    // Uma coisa que não comentamos é que sempre acessamos os argumentos que vem no componente
    // (as props) no componentDidMouth() ou no render(), porém, também é possível acessá-lo pelo constructor().
    //
    // O React, se pedirmos pelo primeiro argumento do construtor, desta forma será passado justamente os
    // parâmetros no momento da construção do componente.
    constructor(props) {
        // Passamos o props para o super(), e teremos acesso com this com o props configurado corretamente.
        super(props);

        // Agora, conseguiremos pegar a mensagem que foi enviada pelo redirecionamento feito no interceptador de
        // entradas nas rotas, disponível no index.js
        // Se existe um estado para a url passada (paramêtros nessa url), vc pega a msg
        let msg = (this.props.location.state) ? this.props.location.state.msg : "";
        this.state = {msg: msg};
    }

    envia(event){
        event.preventDefault();

        // this is the configuration for the request
        // we are sending the login data as a json via post
        const requestInfo = {
            method:'POST',
            body:JSON.stringify({login: this.login.value, senha: this.senha.value}),
            headers: new Headers({
                'Content-type':'application/json'
            })
        };

        fetch('https://instalura-api.herokuapp.com/api/public/login', requestInfo)
            .then(response => {
                if (response.ok) {
                    console.log("response.ok");
                    return response.text();
                } else {
                    // stop the fetch flow by throwing an exception that is caught by .catch
                    throw new Error('não foi possível fazer o login');
                }
            })
            // `token` is returned by the API from the server and has all information of the user
            // The returned token follows the specification JSON Web Tokens (WT).
            // It is a big string and is a cryptographic JSON.
            .then(token => {
                console.log("oioioioi");
                // localStorage property allows you to access a session Storage object for the current origin
                // with no expiration time.
                // The only difference with sessionStorage is that data stored in sessionStorage gets
                // cleared when the page session ends
                localStorage.setItem("auth-token", token); // stores the token into the session in the key "auth-token"

                // react router v4 has the `history` object that allows you to manage and handle the browser
                // history inside your views or components.
                // (I think) it is in the props of the <BrowserRouter> in index.js
                this.props.history.push('/timeline');
            })
            .catch(error => {
                this.setState({msg:'não foi possível fazer o login'});
            })
    }


    render() {
        return (
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span>{this.state.msg}</span>

                {/* Note we bind the this for the function */}
                <form onSubmit={this.envia.bind(this)}>
                    {/*
                    Refs provide a way to access DOM nodes or React elements created in the render method.

                    In the typical React dataflow, props are the only way that parent components interact with
                    their children. To modify a child, you re-render it with new props.
                    However, there are a few cases where you need to imperatively modify a child outside of
                    the typical dataflow.
                    The child to be modified could be an instance of a React component, or it could be a DOM element.
                    For both of these cases, React provides an escape hatch.
                    */}
                    <input type="text" ref={input => this.login = input} />
                    <input type="password" ref={input => this.senha = input} />
                    <input type="submit" value="login"/>
                </form>
                <span>Use: usuario: alots, senha: 123456</span><br/>
                <span>Or:  usuario: rafael, senha: 123456</span>
            </div>
        );
    }
}