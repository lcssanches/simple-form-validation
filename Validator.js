export default class Validator {
  constructor(defaultMessage){
    this.defaultMessage = defaultMessage || "<!> UNDEFINED MESSAGE <!>";
    this.message = '';
    this.steps = [];
  }
 
  addStep(name, callback, message){
    this.steps.push({ name, callback, message });
  }
 
  run(value) {
    for(let i = 0; i<this.steps.length; i++){
      if(!this.steps[i].callback(value)){
        return this.fail(this.steps[i].message);
      }
    }
    return true;
  }
  fail(message){
    this.setMessage(message);
    return false;
  }
  setMessage(message){
    this.message = message;
  }
  getMessage(){
    if( this.message && this.message != '' ) {
      return this.message;
    } else{
      return this.defaultMessage;
    }
  }
}
