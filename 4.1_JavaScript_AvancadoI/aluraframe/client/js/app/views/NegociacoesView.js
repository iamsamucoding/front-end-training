class NegociacoesView {
    constructor(elemento) {
        this._elemento = elemento;
    }



    // This function inserts the data of our list of negotiations (model) into a HTML code which we defined (template),
    // and return the resulting HTML.
    //
    // Note that the HTML code is surrounded by ` backticks (template string).
    // This allows us to use the notation $() to insert JS codes inside it.
    // We then apply an anonymous function (arrow function in the case) for each element
    // of our list/array of negotiations.
    // This is possible by the `map` function (we could use `forEach` instead).
    //
    // This arrow function creates a table row <tr> for each element/negotiation, and table cells <td> for each
    // one of its values.
    // This function must return a string to fill the HTML template. Then, we are using template strings for it.
    // For each element, a final string is returned.
    //
    // Finally, as the arrow function will return a new list/array (with the strings for this case),
    // we have to join all its string elements into a single string.
    // We do that by using the array method .join (for this case, we join each element with the blank string ""
    // separating them.
    //
    // Final comments:
    // Since we have a single parameter for this arrow function, we can remove the parameters around it.
    // Since we have a single instruction in this arrow function, we can remove the { }
    // Since this single instruction is a return instruction, we can remove the keyword `return`
    //
    _template(model) {
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>
                <tbody>
                    ${model.negociacoes.map(neg => `
                        <tr>
                            <td>${DateHelper.dataParaTexto(neg.data)}</td>
                            <td>${neg.quantidade}</td>
                            <td>${neg.valor}</td>
                            <td>${neg.volume}</td>
                        </tr>
                        `).join('')}
                </tbody>
                
                <tfoot>
                    <td colspan="3"></td>
                    <td>
                        ${ model.negociacoes.reduce((total, neg) => total + neg.volume, 0.0)}
                    </td>
                <tfoot>
            </table>
        `;
    }


    // Extra comments for the <tfoot> generation.
    // We want to sum all volumes from the negotiations of our list/array `model.negociacoes`.
    // We then use functional programming for that: we use the `reduce` function.
    //
    // The reduce function executes a given function for each element, and reduce all their results in a single one.
    // For that, its first parameter is a function which in turn must have two arguments: the accumulator and
    // the current array element (for our case, `total` and `neg`, respectively).
    // The second parameter of `reduce` is the initial value of the accumulator.
    //
    // Since we want to sum up the volumes of the negotiation, our accumulator `total` starts with value 0.0.
    // Then, for each element, the function receives the accumulator and accumulates the volume of the element/negotiation.
    //
    // Note that we used arrow function without return inside it, because it has a single instruction.




    update(model) {
        this._elemento.innerHTML = this._template(model);
    }
}