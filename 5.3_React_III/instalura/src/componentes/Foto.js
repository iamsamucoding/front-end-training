import React, { Component } from 'react';
import {Link} from 'react-router-dom';


// A ideia é que a maioria dos componentes sejam de visualização. Porém, trabalhamos com lógica, logo, ela
// deverá estar contida em algum componente.
//
// Nós fizemos uma divisão: a maior parte das lógicas ficou na Timeline, e os elementos relacionados com as
// imagens ficou no Foto. Esse componente que contem apenas coisas do React - focado em visualização -
// recebe o nome de "presentational components".
// São componentes cujo foco é a apresentação.
// Observe também que removemos o estado do componentes, fazendo uso apenas dos argumentos que foram
// passados - uma ótima prática.
//
// Nós poderíamos transformar a classe simplesmente em uma função que recebe como argumento o props, no React,
// isto recebe o nome de "Functinal Component".
//
// Enfim, o objetivo é concentrarmos as lógicas em alguns componentes e termos uma maioria de componentes
// focados apenas em visualização.
// Desta forma, conseguimos melhorar a manutenção, aumentamos a coesão e diminuímos o acoplamento das nossas classes.





class FotoAtualizacoes extends Component {
    like(event){
        event.preventDefault();
        // this.props.like is a function passed for this component that runs the logic of liking.
        // Thus, we are delegating the action of like for this function.
        // This function was passed by the Timeline.
        //
        // The focus of the current component is Presentation.
        this.props.like(this.props.foto.id);
    }

    render(){
        return (
            <section className="fotoAtualizacoes">
                <Link to={"#"} onClick={this.like.bind(this)} className={this.props.foto.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Linkar</Link>
                <form className="fotoAtualizacoes-form">
                    <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo"/>
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
                </form>

            </section>
        );
    }
}

class FotoInfo extends Component {
    render(){
        return (
            <div className="foto-info">
                <div className="foto-info-likes">
                    {
                        this.props.foto.likers.map((liker, index) => {
                            if (liker !== undefined) {
                                // creating a unique key for the element to avoid:
                                // Warning: Each child in a list should have a unique "key" prop.
                                return(<Link key={liker.login} href={`/timeline/${liker.login}`} >{liker.login},</Link>)
                            }
                            else return null;
                        })
                    }
                </div>

                <p className="foto-info-legenda">
                    <Link to={"#"} className="foto-info-autor">autor </Link>
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
                {/* The function like, which was delegated to make a like and is passed from Timeline, is also
                 passed to <FotoAtualizacoes />

                 Note that we are using "spread operator" for this.props to unpack all keys and values from the dict this.props which
                 are passed as properties.
                 The code below is the same of the last commented code.
                 */}
                <FotoAtualizacoes {...this.props}/>
                {/*<FotoAtualizacoes foto={this.props.foto} like={this.props.like}/>*/}
            </div>
        );
    }
}