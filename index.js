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

    this.options = { ...defaultOptions, ...params };

    this.fields = [];
    this.errors = {};

    this._validateHasRan = false;

  }

  canRender() {
    if (!this.options.justRenderAfterValidate) return true;

    return this.options.justRenderAfterValidate && this._validateHasRan;
  }

  reset() {
    this.fields = [];
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
    if (typeof this.fields[field] === 'undefined') return null;


    this.fields[field].run(value);



    if (this.fields[field].hasError()) {
      const errorMessage = this.fields[field].getMessage();
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

  /**
   * 
   * @param {object} obj Object with the values that fields must be setted.
   * @param {boolean} reset If true, the the fields that are not found on obj, will be setted as null. Default true.
   */
  setValues(obj, reset = true) {
    for (let k in this.fields) {
      if (typeof obj[k] === 'undefined') {
        if (reset) {
          this.fields[k].setValue(null);
        }
      } else {
        this.fields[k].setValue(obj[k]);
      }
    }
  }

  field(fieldName, reset = false) {
    if (reset || typeof this.fields[fieldName] === 'undefined') {
      this.fields[fieldName] = new Field(this.options.defaultMessage);
    }
    return this.fields[fieldName];
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
    
    if (typeof state !== 'undefined') {
      this.setValues(state);
    }

    for (var key in this.fields) {
      const result = this.fields[key].run();

      if (result !== true) {
        this.addError(key, this.fields[key].validator.getMessage());
      }
    }
    return !this.hasErrors();
  }
}
