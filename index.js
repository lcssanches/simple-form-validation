import ValidationRule from './ValidationRule';
export default class SimpleFormValidation { 
  constructor() {
    this.rules = [];
    this.errors = {};
    this.displayErrorCallback = function(text) {
      return text;
    }
  }

  reset() {
    this.rules = [];
    this.resetErrors();
  }

  addError(stateKeyName, msg) {
    this.errors[stateKeyName] = msg;
  }

  setDisplayErrorCallback(callback){
    this.displayErrorCallback = callback;
  }
  resetErrors() {
    this.errors = {};
  }
 
  hasErrors(){
    return Object.keys(this.errors).length > 0;
  }

  renderAllErrors() {
    const errorList = [];
    for(var key in this.errors){
      errorList.push(this.displayErrorCallback(this.error[key]));
    }    
    return errorList;
  }
  
  renderError(key) {
    if(typeof this.error[key] === 'undefined') return;
    return this.displayErrorCallback(this.error[key]);
  }
  
  setRuleFor(stateKeyName) {
    const validationRule = new ValidationRule();
    this.rules[stateKeyName] = validationRule;
    return validationRule;
  }
 
  validate(state){
    return new Promise ((resolve, reject) => {
      if ( this.validateSync(state) ) {
        resolve();
      } else {
        throw this.errors;
      }
    });
  }
  validateSync(state){
    this.resetErrors();
    for(var key in this.rules){
   
      const validator = this.rules[key].validator;
      const result = validator.run(state[key]);
     
      if ( result!==true ) {
        this.addError(key, validator.getMessage());
      }
    }
    return !this.hasErrors();
  }

}
