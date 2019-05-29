import { Component } from 'react';

export default class Logout extends Component {
    componentWillMount(){
        localStorage.removeItem('auth-token');
        this.props.history.push('/');
    }

    // Nosso objetivo será retornar para a tela de login, porém, não iremos colar aqui o código do Login.
    // A equipe do Facebook pensou em uma "gambiarra". Eles consideraram que em algumas situações, existiriam
    // componentes em que não seria necessário renderizar nada e trabalharíamos apenas com componentes de configuração.
    // Então, o retorno pode ser null.
    // O React sabe que quando o retorno é null, ele não precisa renderizar o componente.
    render(){
        return null;
    }
}