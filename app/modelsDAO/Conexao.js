class Conexao{

    constructor() {
       
      }
    set type(type) {
        this._typeDB = type;
    }
    get type(){
        return this._typeDB ;
    }
    sayHello() {
       console.log('Hello, my name is ' + this.name + ', I have ID: ' + this.id);
    }

    save(){
        db.insert(
            this
        );
    }
}