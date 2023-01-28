class Strats{
  constructor(){
    this.processors = [];
  }
  installProcessor(processor){
    if(processor.name){
      this[processor.name] = processor
    }else{
      console.error('Internal Error: processor must have a name')
    }
  }
}

module.exports = Strats;
