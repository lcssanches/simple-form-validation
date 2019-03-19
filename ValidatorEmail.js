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

  onlyFrom(domains, message) {

    var domainValue = normalizeDomains(domains);

    this.addStep(
      'onlyFrom',
      function(v) {
        let domainListLength = domainValue.length;
        for (; domainListLength--; ) {
          if (v.toLowerCase().endsWith(domainValue[domainListLength].toLowerCase())) return true;
        }
        return false;
      },
      message
    );
    return this;
  }
  
  notFrom(domains, message) {
    var domainValue = normalizeDomains(domains);

    this.addStep(
      'notFrom',
      function(v) {
        let domainListLength = domainValue.length;
        for (; domainListLength--; ) {
          if (v.toLowerCase().endsWith(domainValue[domainListLength].toLowerCase())) return false;
        }
        return true;
      },
      message
    );
    return this;
  }
}

function normalizeDomains(domains){
  if (typeof domains === 'string' && domains.indexOf(',') !== -1) {
    return domains.split(',');
  } else if (domains instanceof Array) {
    return domains;
  } else {
    return [domains];
  }
}