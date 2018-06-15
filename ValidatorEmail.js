import Validator from './Validator';
export default class ValidatorEmail extends Validator {
  constructor(defaultMessage) {
    super(defaultMessage);
  }

  valid(message) {
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.addStep(
      'email',
      v => {
        return regexEmail.test(String(v).toLowerCase());
      },
      message
    );

    return this;
  }

  notFrom(domains, message) {
    var domainValue = null;
    if (typeof domains === 'string' && domains.indexOf(',') !== -1) {
      domainValue = domains.split(',');
    } else if (domains instanceof Array) {
      domainValue = domains;
    } else {
      domainValue = [domains];
    }

    this.addStep(
      'notFrom',
      function(v) {
        let domainListLength = domainValue.length;
        for (; --domainListLength; ) {
          if (v.endsWith(domainValue[domainListLength])) return false;
        }
        return true;
      },
      message
    );
    return this;
  }
}
