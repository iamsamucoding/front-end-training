
class NegociacaoController {
    constructor() {
        // We want to provide an alias for the method `document.querySelector`.
        // Internally, `querySelector` has a call for the `this`, which is the context/object where the method is called.
        // Thus, `this` is the `document` for this case.
        // However, when assign `querySelector` to $, it is executed out of the context of the object `document`,
        // therefore the code below DOES NOT work.
        /* let $ = document.querySelector; */

        // Now, we are informing that `querySelector` will be assigned to $ but it will still have its association
        // with the object `document`.
        let $ = document.querySelector.bind(document);


        // By adding the codes below, our object only searches/gets the DOM elements once, instead of doing that for
        // every calls from adiciona().
        // Thus, we have a better performance.
        this._inputData = $('#data');
        this._inputQuantidade =  $('#quantidade');
        this._inputValor = $('#valor');
    }

    adiciona(event) {
        event.preventDefault();

        // We have some alternatives to create a Date from the input date in the form.
        // The sent data from the form is a string with the following format: "yyyy-mm-dd"
        // We can then:

        // 1) Create Date by using this string directly (the simplest alternative)
        // let data = new Date(this._inputData.value);
        // console.log(data);

        // 2) Pass an array with ["year", "month", "day"]
        // let data = new Date(this._inputData.value.split("-"));
        // console.log(data);

        // 3) Pass a list of integer numbers: [year, month, day]
        // let data = new Date([2019, 11, 1]);
        // console.log(data); // prints: Nov 1, 2019

        // 4) Pass integers numbers as parameters: year, month, day (the worst solution)
        // let data = new Date(2019, 11, 1);
        // console.log(data); // prints: Dec 1, 2019
        //
        // Note that it was printed Dec instead of Nov.
        // This happens because this constructor of Date considers that the month numbers start at 0 (I don't know why)
        // 0 = Jan; 1 = Feb; ...; 11 = Dec
        //
        // The same happens when passing the parameters as string:
        // let data = new Date("2019", "11", "1");
        // console.log(data); // prints: Dec 1, 2019
        //
        // This is the worst and most confusion alternative. But, since we want to introduce 3 new concepts,
        // we are gonna use this alternative. Let's use functional programming.

        // let date_str_arr = this._inputData.value.split("-");;
        // console.log(date_str_arr);

        // map the anonymous function for each element from date_str_arr
        // the function decrease the module of 2, i.e., no decreasing for even indices (0 (year) and 2 (day)), and
        // decreasing of 1 to odd indices (just 1 (month)).
        // A number as string is implicity converted to a number before the aritmetic, but its return is a number.
        // Ex: "12" - 1 = 11
        // let new_date_str_arr = date_str_arr.map(function (item, idx) {
        //                             return item - (idx % 2);
        // });
        // console.log(new_date_str_arr);

        // To transform each element of this array as a function argument, we can use the "spread operator" ...
        // Ex: new_date_str_arr = [2010, 11, 1]
        // new Date(...new_date_str_arr) = new Date(2010, 11, 1)
        // let data = new Date(...new_date_str_arr);
        // console.log(data);

        // Ex:
        // this._inputData = "2019-12-01"
        // date_str_arr = ["2019", "12", "01"]
        // new_date_str_arr = [2019, 11, 1]
        // new Date(...new_date_str_arr) = new Date(2019, 11, 1) = Dec 1, 2019

        // Putting them all together:
        // let data = new Date(...this._inputData.value
        //                            .split('-')
        //                            .map(function(item, indice) {
        //                                     return item - indice % 2;
        // }));
        // console.log(data);


        // To leave our code less verbose, we can use "arrow functions =>" instead `function`
        // The behaviour is the same.
        // let data = new Date(...this._inputData.value
        //                            .split('-')
        //                            .map((item, indice) => {
        //                                     return item - indice % 2;
        // }));
        // console.log(data);


        // Since we our arrow function has only a single instruction, we can leave our code even less verbose.
        let data = new Date(...
            this._inputData.value
                .split('-')
                .map((item, indice) => item - indice % 2)
        );

        let negociacao = new Negociacao(
            data,
            this._inputQuantidade.value,
            this._inputValor.value
        );

        console.log(negociacao);
    }

}