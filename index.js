import ValidationRule from 'ValidationRule';
export default class SimpleFormValidation { 
  constructor() {
    this.rules = [];
    this.errors = {};
  }

  reset() {
    this.rules = [];
    this.resetErrors();
  }

  addError(stateKeyName, msg) {
    this.errors[stateKeyName] = msg;
  }

  resetErrors() {
    this.errors = {};
  }
 
  hasErrors(){
    return Object.keys(this.errors).length > 0;
  }

  renderError(key) {
    if(typeof key === 'undefined') {
      document.write('<p style="color: red;">Errors</p>');
      document.write('<ul>');
      for(var key in sfv.errors){
        document.write('<li>'+key+' - '+sfv.errors[key]+'</li>');
      }
      document.write('</ul>');
      return;
    }
   
    if(typeof this.error[key] === 'undefined') return;
   
    document.write('<p>'+key+' - '+this.error[key]+'</p>');
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
