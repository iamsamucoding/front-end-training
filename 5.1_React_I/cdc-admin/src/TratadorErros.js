import PubSub from 'pubsub-js';


export default class TratadorErros {
    publicaErros(erros) {
        console.log("oioioi");

        for (let i = 0; i < erros.length; i++) {
            PubSub.publish("erro-validacao", erros[i]);
        }
    }
}