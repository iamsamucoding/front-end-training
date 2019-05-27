import React from 'react';
import './css/pure-min.css';
import './css/side-menu.css';

class App extends React.Component {
    constructor() {
        super();
        // A component needs state when some data associated with it changes over time.
        // state is managed by the component itself.
        //
        this.state = {lista: []};
    }


    // O React fornece funções que serão chamadas em determinados ciclos de vida do componente.
    // Uma delas é componentDidMount() usada quando o componente acabou de ser montado.
    // Ela será chamada logo após o método render() ser invocado pela primeira vez.
    //
    // Uma outra função é o componentWillMount(), que será chamada antes da invocação do render().
    componentWillMount() {

        // Where we're fetching data from
        fetch("http://cdc-react.herokuapp.com/api/autores")
            // We get the API response and receive data in JSON format...
            .then(response => response.json())
            // ...then we update the state
            .then(
                data => {
                    this.setState({lista : data}); // changes the states and re-render the HTML component
                }
            )
            // Catch any errors we hit and update the app
            .catch(
                error => {
                    this.setState({lista: []});
                    alert("Error when loading json");
                }
            );
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
                            <form className="pure-form pure-form-aligned">
                                <div className="pure-control-group">
                                    <label htmlFor="nome">Nome</label>
                                    <input id="nome" type="text" name="nome" defaultValue=""/>
                                </div>
                                <div className="pure-control-group">
                                    <label htmlFor="email">Email</label>
                                    <input id="email" type="email" name="email" defaultValue=""/>
                                </div>
                                <div className="pure-control-group">
                                    <label htmlFor="senha">Senha</label>
                                    <input id="senha" type="password" name="senha"/>
                                </div>
                                <div className="pure-control-group">
                                    <label></label>
                                    <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                                </div>
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
