import ValidatorNumeric from './ValidatorNumeric';
import ValidatorText from './ValidatorText';
import ValidatorDate from './ValidatorDate';
import ValidatorEmail from './ValidatorEmail';
import ValidatorCPF from './ValidatorCPF';
export default class Field {
  constructor(defaultMessage) {
    this.validator = null;
    this.defaultMessage = defaultMessage;
    this.lastValueTested = undefined;
  }

  hasError() {
    return this.validator.failed === true;
  }

  run(value) {
    if (typeof this.lastValueTested !== 'undefined' && this.lastValueTested === value) {
      // If the value is equal the last one,
      // we do not need to run validator again.
      return !this.hasError();
    }
    this.lastValueTested = value;
    return this.validator.run(value);
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
