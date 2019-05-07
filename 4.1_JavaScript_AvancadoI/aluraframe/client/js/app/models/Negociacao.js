

class Negociacao {

    // Data members (or properties for the JS jargon) must be defined in the construction
    // this construction method is called by using `new Negociacao()`

    // JavaScript (up to now) does not provide access modifiers (private, protected, public). Everything is public.
    // We cannot define that a property is read-only, for example.
    // The best we can do for "encapuslation"is to use a name convention of the class data members to indicate
    // that they cannot (or should not) be modified/accessed directly.
    // For this, we use one underline prefix (_).
    //
    // Thus, by following this convention, only methods of this class should access the data members.
    // To access them out of the class, we should use accessors (similar to setters and getters).
    constructor(data, quantidade, valor) {
        // Copy the Date object data to this._data
        // It does not save its reference.
        // This avoids someone change the original Date object externally which consequently will change
        // the `this._data` indirectly.
        //
        // This strategy calls: "Defensive Programming".
        //
        // Although we "freeze" the object in the end of this construction, this freeze is "shallow".
        // That is, it only freezes its properties, not the properties from objects of other classes
        // that it has, like the Date object.
        //
        // Then, someone could do:
        // my_date = new Date(99);
        // let n1 = new Negociacao(my_date, 5, 700);
        // my_date.setDate(10000); // it indirectly changes `this._date` even the object being frozen.
        //
        // See more details in the comment of the method: `get volume()`
        this._data = new Date(data.getTime());

        this._quantidade = quantidade;
        this._valor = valor;


        // Since we want that our objects of Negociacao DON'T BE CHANGED after their creation, we can freeze them.
        // For this, we use the command bellow.
        Object.freeze(this);

        // From this point on, our object (this) becomes READ-ONLY, so that we cannot change
        // its data members inside or outside the class.
    }




    // We should only access data members through accessor methods (getters and setters).
    // By default, we could have these methods below:
    /*
    getQuantidade() {
        return this._quantidade;
    }

    setQuantidade(quantidade) {
        return this._quantidade = quantidade;
    }

    // calling the methods
    let n1 = new Negociacao(new Date(), 5, 700);
    console.log(n1.getQuantidade());
    n1.setQuantidade(100);
    console.log(n1.getQuantidade());
     */





    // For our application, we DON'T want to change the values of a object of Negociacao after its creation.
    // Then, we won't provide setters for its data members.
    //
    // However, note that, since our (this) object was frozen in the end of its constructor, it becomes READ-ONLY.
    // Therefore, even if we have setter methods, they won't work: Uncaught TypeError: Cannot assign to read only property '_quantidade' of object '#<Negociacao>'
    // Without this freezing, setters work fine.
    //
    // Still, in order to leave our getters less verbose, we could define them in a different way:
    get quantidade() {
        return this._quantidade;
    }

    // By using the keyword `get`, we can remove the prefix name "get" of our getters and then, instead of calling
    // the getter by: n1.getQuantidade())
    // we can now simply use: `n1.quantidade`
    //
    // Note we don't need to use () to calling this methods.
    // By convention, the `get` methods should have the name of the corresponding data member (to be returned)
    // without the prefix `_`.
    //
    // Therefore, by using `get`, we have a less-verbose READ-ONLY method to get our data members.
    //
    // Since it is READ-ONLY, we cannot set value thought it:
    // let n1 = new Negociacao(new Date(), 5, 700);
    // n1.valor = 10; // this doesn't work... nothing is done here
    //
    get valor() {
        return this._valor;
    }


    // Since the freezing in the end of the construction is "shallow", it DOESN't freeze the properties of
    // objects from other classes that our object refers: e.g., the Date object.
    // Then, although we gave a `get` method to avoid a direct assign into this._data,
    // when returning `return this._data`, we are returning the reference for the Date object _data.
    // Thus, we could indirectly change it by:
    //
    // let n1 = new Negociacao(new Date(), 5, 700);
    // my_data = n1.data;
    // my_data.setDate(1000);
    //
    // This indirectly changes the `this._data` even our object being frozen and the our getter be read-only.
    //
    // Therefore, let's return a copy of our Date object instead its reference.
    // Thus, any change is the object returned by this getter won't change the `this._date`.
    //
    // This strategy is called: "Defensive Programming"
    get data() {
        // return this._data; // DON'T DO THAT
        return new Date(this._data.getTime());
    }



    // We can use `get` methods not only to access properties (data members).
    // We can still use them when we want to return any value (like this volume here which is computed inside the method)
    // and we want a less verbose function for it.
    //
    // Note that we call this method by: `n1.volume`
    // Therefore, although we don't have a data member `this._volume`, this `get` method gives us the impression
    // of accessing a data member.
    get volume() {
        return this._quantidade * this._valor;
    }
}


// Variables declared with `var` DOESN'T have block scope, even declared inside a block scope (e.g., for (var i = 0; ...))
// They have function or global scope.
// Declare variables with `let` to have block scope.
