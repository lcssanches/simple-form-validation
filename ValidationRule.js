import ValidatorOnlyNumbers from './ValidatorOnlyNumbers';
import ValidatorString from './ValidatorString';
import ValidatorDate from './ValidatorDate';
import ValidatorEmail from './ValidatorEmail';
export default class ValidationRule {
  constructor() {
    this.validator = null;
  }

  customValidator(validator) {
    this.validator = validator;
    return this.validator;
  }

  numeric(message) {
    this.validator = new ValidatorOnlyNumbers(message);
    return this.validator;
  }
 
  text(message){
    this.validator = new ValidatorString(message);
    return this.validator;
  }
  
  date(message) {
    this.validator = new ValidatorDate(message);
    return this.validator;
  }

  email(message){
    this.validator = new ValidatorEmail(message);
  }

}
