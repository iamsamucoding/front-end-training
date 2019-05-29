import Pubsub from "pubsub-js";


// Como essa classe só tem métodos estáticos e não tem atributos, ela poderia tranquilamente virar um arquivo com
// as funções estáticas só.

export default class TimelineApi {
    // OLD FUNCTION
    // static lista(urlPerfil, store) {
    //     fetch(urlPerfil)
    //         .then(response => response.json())
    //         .then(fotos => {
    //             // A Redux store tem o método dispatch() para "despacharmos" uma nova ação. No caso, a ação "LISTAGEM".
    //             //
    //             // Se a ação que vier de LISTAGEM esperamos que seja feito algo.
    //             // As informações que passamos além do type (action) recebem o nome de "payload" da action.
    //             // A seguir, adicionaremos a nova propriedade no dispatch():
    //             //
    //             // Nosso caso, nosso payload é uma propriedade chamada fotos (que será acessível pela store) que tem os valores
    //             // de listaFixa
    //             store.dispatch({type:'LISTAGEM', fotos}); // lembre-se que estamos usando shorthand operator, logo
    //                                                       // fotos === fotos: fotos
    //         });
    // }


    // Como o método não lida com mais nenhum dado da classe, não é necessário que seja de instância,
    // podendo ser estático (static).
    //
    // Agora, a função lista() não executa mais os fetch no momento em que é chamada, ela retornará um
    // função com o argumento: justamente o método dispatch() da store, por isso não precisaremos mais
    // passá-la como argumento do lista().
    //
    // Para isto que o Redux Thunk serve, ele irá se meter no Redux, possibilitando esse tipo de invocação do dispatch.
    // No segundo then não precisaremos mais ter acesso a store. Antes tínhamos acesso total ao que se referia a
    // store do Redux. Agora, só temos acesso ao método dispatch.
    //
    // lista é uma função que retorna outra função. Esta função (interna) recebe como parâmetro o dispatch do Redux.
    // Sendo assim, uma vez que criamos a Redux store passando o Redux Thunk como seu middleware (veja a criação em App.js)
    // quando chamarmos a seguinte linha do componentDidMount da Timeline,js:
    //
    // this.props.store.dispatch(TimelineApi.lista(urlPerfil));
    //
    // estaremos executando a função dispatch do Redux que é implicitamente passada como parâmetro para a
    // função interna retornada por lista() que, por sua vez, a usa para disparar a real ação.
    //
    // No final das contas, toda essa maracutaia é pra evitar de se passar um parâmetro extra para as callbacks toda vez
    static lista(urlPerfil) {
        return (dispatch) => {
            fetch(urlPerfil)
                .then(response => response.json())
                .then(fotos => {
                    // A Redux store tem o método dispatch() para "despacharmos" uma nova ação. No caso, a ação "LISTAGEM".
                    //
                    // Se a ação que vier de LISTAGEM esperamos que seja feito algo.
                    // As informações que passamos além do type (action) recebem o nome de "payload" da action.
                    // A seguir, adicionaremos a nova propriedade no dispatch():
                    //
                    // Nosso caso, nosso payload é uma propriedade chamada fotos (que será acessível pela store) que tem os valores
                    // de listaFixa
                    dispatch({type:'LISTAGEM', fotos}); // lembre-se que estamos usando shorthand operator, logo
                                                        // fotos === fotos: fotos
                    return fotos;
                });
        }
    }


    static like(fotoId) {
        return dispatch => {
            fetch(`https://instalura-api.herokuapp.com/api/fotos/${fotoId}/like`)
                .then(response => {
                    console.log(response);
                    if(response.ok) {
                        return response.json();
                    } else {
                        if ((response.status === 403) || (response.status === 405)) {
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
                    dispatch({type:'LIKE', fotoId, liker});
                    return liker;
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
}