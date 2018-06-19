import ValidatorNumeric from './ValidatorNumeric';
import ValidatorText from './ValidatorText';
import ValidatorDate from './ValidatorDate';
import ValidatorEmail from './ValidatorEmail';
import ValidatorCPF from './ValidatorCPF';
export default class Field {
  constructor(defaultMessage) {
    this.validator = null;
    this._defaultMessage = defaultMessage;
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
    this.validator = new ValidatorNumeric(m || this._defaultMessage);
    return this.validator;
  }
 
  text(m){
    this.validator = new ValidatorText(m || this._defaultMessage);
    return this.validator;
  }
  
  date(format, m) {
    this.validator = new ValidatorDate(format, m || this._defaultMessage);
    return this.validator;
  }

  email(m){
    this.validator = new ValidatorEmail(m || this._defaultMessage);
    return this.validator;
  }

  cpf(m){
    this.validator = new ValidatorCPF(m || this._defaultMessage);
    return this.validator;
  }

}
