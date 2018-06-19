import Field from './Field';

const defaultOptions = {
  justRenderAfterValidate: true,
  defaultMessage: '',
  displayErrorCallback: text => {
    return text;
  }
};

export default class SimpleFormValidation {
  constructor(params) {

    //TODO: Add tests to 'justRenderAfterValidate'

    this.options = {...defaultOptions, ...params};

    this.rules = [];
    this.errors = {};
    
    this._validateHasRan = false;
    
  }

  canRender() {
    if (!this.options.justRenderAfterValidate) return true;

    return this.options.justRenderAfterValidate && this._validateHasRan;
  }

  reset() {
    this.rules = [];
    this._validateHasRan = false;
    this.resetErrors();
  }

  addError(stateKeyName, msg) {
    this.errors[stateKeyName] = msg;
  }

  resetErrors() {
    this.errors = {};
  }

  isValid() {
    return !this.hasErrors();
  }

  hasErrors() {
    return Object.keys(this.errors).length > 0;
  }

  renderAllErrors() {
    if (!this.canRender()) return null;
    const errorList = [];
    for (var key in this.errors) {
      errorList.push(this.options.displayErrorCallback(this.errors[key]));
    }
    return errorList;
  }

  renderError(field, value) {
    if (!this.canRender()) return null;
    if (typeof this.rules[field] === 'undefined') return null;

    this.rules[field].run(value);

    if (this.rules[field].hasError()) {
      const errorMessage = this.rules[field].getMessage();
      this.addError(field, errorMessage);
      if (errorMessage == '') {
        console.warn(`Empty validator message to '${field}'.`);
      }
      return this.options.displayErrorCallback(errorMessage);
    } else {
      delete this.errors[field];
      return null;
    }
  }

  field(fieldName, reset = false) {
    if (reset || typeof this.rules[fieldName] === 'undefined') {
      this.rules[fieldName] = new Field(this.options.defaultMessage);
    }
    return this.rules[fieldName];
  }

  validate(state) {
    return new Promise((resolve, reject) => {
      if (this.validateSync(state)) {
        resolve();
      } else {
        throw this.errors;
      }
    });
  }
  validateSync(state) {
    this._validateHasRan = true;
    this.resetErrors();
    for (var key in this.rules) {
      const validator = this.rules[key].validator;
      const result = validator.run(state[key]);

      if (result !== true) {
        this.addError(key, validator.getMessage());
      }
    }
    return !this.hasErrors();
  }
}
