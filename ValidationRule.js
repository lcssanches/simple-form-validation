import ValidatorOnlyNumbers from './ValidatorOnlyNumbers';
import ValidatorString from './ValidatorString';
import ValidatorDate from './ValidatorDate';
import ValidatorEmail from './ValidatorEmail';
import ValidatorCPF from './ValidatorCPF';
export default class ValidationRule {
  constructor() {
    this.validator = null;
  }

  hasError(){
    return this.validator.failed === true;
  }

  run(value){
    return this.validator.run(value);
  }

  getMessage(){
    return this.validator.getMessage();
  }

  customValidator(validator) {
    this.validator = validator;
    return this.validator;
  }

  numeric(m) {
    this.validator = new ValidatorOnlyNumbers(m);
    return this.validator;
  }
 
  text(m){
    this.validator = new ValidatorString(m);
    return this.validator;
  }
  
  date(format, m) {
    this.validator = new ValidatorDate(format, m);
    return this.validator;
  }

  email(m){
    this.validator = new ValidatorEmail(m);
    return this.validator;
  }

  cpf(m){
    this.validator = new ValidatorCPF(m);
    return this.validator;
  }

}
