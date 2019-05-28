import React, { Component } from 'react';
import FotoItem from './Foto';


export default class Timeline extends Component {
    constructor() {
        super();
        this.state =  {fotos: []};
    }

    componentDidMount(){
        // the server provide an API whose url accepts a token for a valid user.
        // The token comes after X-AUTH-TOKEN=
        // When a user logs into the page (being authenticate in the server by another API), the
        // server provides a valid token with all information that it needs.
        // Then, we can use this API to get the photos for the logged user.
        //
        // Using token is a way to communicate two different systems (or, similarly, an app/web that consumes a service).
        let url = `https://instalura-api.herokuapp.com/api/fotos/?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        console.log(url);

        fetch(url)
            .then(response => response.json())
            .then(fotos => {
                this.setState({fotos: fotos});
            });
    }

    render(){
        return (
            <div className="fotos container">
                {
                    this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto} />)
                }
            </div>
        );
    }
}
