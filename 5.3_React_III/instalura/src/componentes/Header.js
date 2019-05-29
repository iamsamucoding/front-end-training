import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Pubsub from "pubsub-js";


export default class Header extends Component {
    pesquisa(event){
        event.preventDefault();
        fetch(`https://instalura-api.herokuapp.com/api/public/fotos/${this.loginPesquisado.value}`)
            .then(response => response.json())
            .then(fotos => {
                console.log("pesquisa: ", fotos);
                Pubsub.publish('timeline', fotos);
            });
    }


    render(){
        return (
            <header className="header container">
                <h1 className="header-logo">
                    Instalura
                </h1>

                <form className="header-busca" onSubmit={this.pesquisa.bind(this)}>
                    <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo" ref={input => this.loginPesquisado = input}/>
                    <input type="submit" value="Buscar" className="header-busca-submit"/>
                </form>


                <nav>
                    <ul className="header-nav">
                        <li className="header-nav-item">
                            <Link to={"/"} />
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}