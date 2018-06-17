export default class Validator {
  constructor(defaultMessage) {
    this.defaultMessage = defaultMessage || '<!> UNDEFINED MESSAGE <!>';
    this.message = '';
    this.steps = [];

    this.failed = false;
  }

  _stepExists(name) {
    for (let i = 0; i < this.steps.length; i++) {
      if (this.steps[i].name == name) {
        return true;
      }
    }

    return false;
  }

  addStep(name, callback, message) {
    this.steps.push({ name, callback, message });
  }

  required(message) {
    this.addStep(
      'required',
      v => {
        if (typeof v === 'undefined') return false;
        if (String(v) === '') return false;
        return true;
      },
      message
    );
    return this;
  }

  run(value) {
    this.failed = false;
    for (let i = 0; i < this.steps.length; i++) {
      if (!this.steps[i].callback(value)) {
        return this.fail(this.steps[i].message);
      }
    }
    return true;
  }

  fail(message) {
    this.failed = true;
    this.setMessage(message);
    return false;
  }

  setMessage(message) {
    this.message = message;
  }

  getMessage() {
    if (this.message && this.message != '') {
      return this.message;
    } else {
      return this.defaultMessage;
    }
  }
}
