import React from 'react';
import { Link } from 'react-router-dom';

import Home from './Home';
import AutorBox from './Autor';

import './css/pure-min.css';
import './css/side-menu.css';


class App extends React.Component {
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
                            {/* Utilizamos um <Link> porque já queremos gerar um <a> com o evento associado ao router.
                                Quando clicamos nele, não queremos que seja feita uma nova requisição, queremos apenas
                                que o conteúdo da página seja trocado pelo do componente associado com o link. */}
                            <li className="pure-menu-item"><Link to="/" className="pure-menu-link">Home</Link></li>
                            <li className="pure-menu-item"><Link to="/autor" className="pure-menu-link">Autor</Link></li>
                            <li className="pure-menu-item"><Link to="/livro" className="pure-menu-link">Livro</Link></li>
                        </ul>
                    </div>
                </div>

                <div id="main">
                    {/* Rendering the child component of App.js accessed by a given route */}
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
