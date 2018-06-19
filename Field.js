import ValidatorNumeric from './ValidatorNumeric';
import ValidatorText from './ValidatorText';
import ValidatorDate from './ValidatorDate';
import ValidatorEmail from './ValidatorEmail';
import ValidatorCPF from './ValidatorCPF';
export default class Field {
  constructor(defaultMessage) {
    this.validator = null;
    this.defaultMessage = defaultMessage;
    this.value = undefined;
    this.hasRan = false;
  }

  getType(){
    return this.validator.constructor.name;
  }

  setValue(value) {
    this.value = value;
  }

  hasError() {
    
    if(!this.hasRan) return false;

    this.run();

    return this.validator.failed === true;
  }

  run(value) {
    if (typeof value !== 'undefined') {
      if (typeof this.value !== 'undefined' && this.value === value) {
        // If the value is equal the last one,
        // we do not need to run validator again.
        return !this.hasError();
      }
      this.value = value;
    }
    
    this.hasRan = true;
    return this.validator.run(this.value);
  }

  getMessage() {
    return this.validator.getMessage();
  }

  customValidator(validator) {
    this.validator = validator;
    return this.validator;
  }

  numeric(m) {
    this.validator = new ValidatorNumeric(m || this.defaultMessage);
    return this.validator;
  }

  text(m) {
    this.validator = new ValidatorText(m || this.defaultMessage);
    return this.validator;
  }

  date(format, m) {
    this.validator = new ValidatorDate(format, m || this.defaultMessage);
    return this.validator;
  }

  email(m) {
    this.validator = new ValidatorEmail(m || this.defaultMessage);
    return this.validator;
  }

  cpf(m) {
    this.validator = new ValidatorCPF(m || this.defaultMessage);
    return this.validator;
  }
}
