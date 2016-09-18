class Message {
  type: string;

  constructor(){
    var constructor = <any> this.constructor;
    this.type = constructor.name;
  }
}
