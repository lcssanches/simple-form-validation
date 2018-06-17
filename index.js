import ValidationRule from './ValidationRule';
export default class SimpleFormValidation { 
  constructor(justRenderAfterValidate = true) {
    //TODO: Add tests to 'justRenderAfterValidate'
    this.rules = [];
    this.errors = {};
    this.displayErrorCallback = function(text) {
      return text;
    }
    this._validateHasRan = false;
    this.justRenderAfterValidate = justRenderAfterValidate;
  }

  canRender(){
    if(!this.justRenderAfterValidate) return true;

    return this.justRenderAfterValidate && this._validateHasRan;
  }

  reset() {
    this.rules = [];
    this._validateHasRan = false;
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
 
  isValid(){
    return !this.hasErrors();
  }
  
  hasErrors(){
    return Object.keys(this.errors).length > 0;
  }

  hasError(key){
    if ( typeof key === 'undefined' ) return false;
    if ( typeof this.errors[key] === 'undefined') return false;
    return true;
  }

  renderAllErrors() {
    if(!this.canRender()) return null;
    const errorList = [];
    for(var key in this.errors){
      errorList.push(this.displayErrorCallback(this.errors[key]));
    }    
    return errorList;
  }
  
  renderError(key, value) {
    if(!this.canRender()) return null;
    if (typeof this.rules[key] === 'undefined') return null;
    const result = this.rules[key].validator.run(value);
    if (result !== true) {
      this.addError(key, this.rules[key].validator.getMessage());
      return this.displayErrorCallback(this.errors[key]);
    } else {
      delete this.errors[key];
      return null;
    }
  }

  field(fieldName, reset = false){
    if(reset || typeof this.rules[fieldName] === 'undefined') {
      this.rules[fieldName] = new ValidationRule();
    }
    return this.rules[fieldName];
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
    this._validateHasRan = true;
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
