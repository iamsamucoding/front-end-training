import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Pubsub from 'pubsub-js';

class FotoAtualizacoes extends Component {
    constructor(props){
        super(props);
        this.state = {likeada : this.props.foto.likeada};
    }


    like(event){
        event.preventDefault();

        fetch(`https://instalura-api.herokuapp.com/api/fotos/${this.props.foto.id}/like`)
            .then(response => {
                console.log(response);
                if(response.ok) {
                    return response.json();
                } else {
                    if ((response.status == 403) || (response.status == 405)) {
                        // since we cannot change the CORS problem of the provided heroku api, let's pretend that
                        // the liked worked.
                        // we won't throw an error because we don't want to break the flow.
                        // Thus, the next .then will be called
                        console.log("não foi possível realizar o like da foto: erro de CORS");
                    }
                    else {
                        throw new Error("erro do like da foto");
                    }
                }
            })
            .then(liker => {
                this.setState({likeada : !this.state.likeada});
                // when passing only an object to a dict, it creates a key with the name of the object.
                // i.e.: {liker} == {liker: liker}
                // this calls shorthand property
                Pubsub.publish('atualiza-liker', {fotoId: this.props.foto.id, liker});
            })
            .catch(error => {
               console.log(error);
            });
    }

    render(){
        return (
            <section className="fotoAtualizacoes">
                <a onClick={this.like.bind(this)} className={this.state.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Linkar</a>
                <form className="fotoAtualizacoes-form">
                    <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo"/>
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
                </form>

            </section>
        );
    }
}

class FotoInfo extends Component {
    constructor(props){
        super(props);
        this.state = {likers : this.props.foto.likers};
        console.log(this.props.foto.likers);
    }

    componentWillMount() {
        Pubsub.subscribe('atualiza-liker',(topico,infoLiker) => {
            if(this.props.foto.id === infoLiker.fotoId){

                // gambiara: por algum motivo, uma lista [] está entrando no find, de modo que o liker dentro é undefined
                const possivelLiker = [];
                if (this.state.likers.length) {
                    this.state.likers.find(liker => liker.login === infoLiker.liker.login);
                }

                if(possivelLiker === undefined){
                    // NUNCA altere diretamente os dados de um estado seu, removendo ou adicionando, p. ex, elementos
                    // da lista de likers.
                    // Cria uma nova lista a parte da primeira e set a lista inteira
                    const novosLikers = this.state.likers.concat(infoLiker.liker);
                    this.setState({likers:novosLikers});
                } else {
                    const novosLikers = this.state.likers.filter(liker => liker.login !== infoLiker.liker.login);
                    this.setState({likers:novosLikers});
                }
            }
        })
    }

    render(){
        return (
            <div className="foto-info">
                <div className="foto-info-likes">
                    {
                        this.state.likers.map((liker, index) => {
                            if (liker != undefined) {
                                // creating a unique key for the element to avoid:
                                // Warning: Each child in a list should have a unique "key" prop.
                                return(<Link key={liker.login} href={`/timeline/${liker.login}`} >{liker.login},</Link>)
                            }
                        })
                    }
                </div>

                <p className="foto-info-legenda">
                    <a className="foto-info-autor">autor </a>
                    {this.props.foto.comentario}
                </p>

                <ul className="foto-info-comentarios">
                    {
                        this.props.foto.comentarios.map(comentario => {
                            return (
                                <li className="comentario" key={comentario.id}>
                                    <Link to={`/timeline/${comentario.login} `} className="foto-info-autor">{comentario.login} </Link>
                                    {comentario.texto}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

class FotoHeader extends Component {
    render(){
        return (
            <header className="foto-header">
                <figure className="foto-usuario">
                    <img src={this.props.foto.urlPerfil} alt="foto do usuario"/>
                    <figcaption className="foto-usuario">
                        <Link to={`/timeline/${this.props.foto.loginUsuario}`}>
                            {this.props.foto.loginUsuario}
                        </Link>
                    </figcaption>
                </figure>
                <time className="foto-data">{this.props.foto.horario}</time>
            </header>
        );
    }
}

export default class FotoItem extends Component {
    render(){
        return (
            <div className="foto">
                <FotoHeader foto={this.props.foto} />
                <img alt="foto" className="foto-src" src={this.props.foto.urlFoto}/>
                <FotoInfo foto={this.props.foto}/>
                <FotoAtualizacoes foto={this.props.foto} />
            </div>
        );
    }
}