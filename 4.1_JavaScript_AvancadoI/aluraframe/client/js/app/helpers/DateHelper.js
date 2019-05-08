class DateHelper {
    constructor() {
        throw new Error('DateHelper não pode ser instanciada');
    }


    // One option to return a formatted date is to concatenate the day, month, and year in a string
    // static dataParaTexto(data) {
    //     return data.getDate()
    //         + '/' + (data.getMonth() + 1) // remember that date as an integer number starts at 0 = Jan, 1 = Feb, ...
    //         + '/' + data.getFullYear();
    // }


    // Template String:
    // When surrounding a string/text with ` (backtick), we can use ${} to interpolate variable values inside it.
    // Put the variable inside ${} for that.
    static dataParaTexto(data) {
        let regex = /\d{4}-\d{2}-\d{2}/;

        // fail fast
        if (!regex.test(data)) {
            throw new Error('Deve estar no formato aaaa-mm-dd');
        }

        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }

    static textoParaData(texto) {
        return new Date(...texto.split('-').map((item,indice) => item - indice % 2));
    }
}