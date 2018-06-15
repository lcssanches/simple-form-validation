/*
  TODO: Remover adicão da rule no constructor
  TODO: Adicionar rule .valid(message)
  TODO: Adicionar rule .notFrom(domain|domainList|[domains]);
*/
import Validator from './Validator';
export default class ValidatorCPF extends Validator {
  constructor(defaultMessage) {
    super(defaultMessage);
  }

  valid(message) {
    this.addStep(
      'cpf',
      function(v) {
        return validate(v);
      },
      message
    );
  }
}

function calcDigit(firstNineDigits) {
  const _1stDigit = calcDigit1(firstNineDigits);

  const _2ndDigit = calcDigit2(firstNineDigits + _1stDigit);

  return '' + _1stDigit + _2ndDigit;
}
function calcDigit1(firstNineDigits) {
  var sum = 0;

  for (var j = 0; j < 9; ++j) {
    sum += firstNineDigits.toString().charAt(j) * (10 - j);
  }

  const sumChecker = sum % 11;
  const checker1 = sumChecker < 2 ? 0 : 11 - sumChecker;

  return checker1.toString();
}

function calcDigit2(cpfWithChecker1) {
  var sum = 0;

  for (var k = 0; k < 10; ++k) {
    sum += cpfWithChecker1.toString().charAt(k) * (11 - k);
  }

  const sumChecker = sum % 11;
  const checker2 = sumChecker < 2 ? 0 : 11 - sumChecker;

  return checker2.toString();
}
function validate(value) {
  value = String(value);
  
  const cpf = value.replace(/\.|-|\s/g, '');
  if (cpf.length !== 11) return false;

  const firstNineDigits = cpf.substring(0, 9);

  const checker = cpf.substring(9, 11);


  const firstDigit = cpf.substring(0, 1);


  if(/^(.)\1+$/.test(cpf)){
    return false;
  }
  
  return checker === calcDigit(firstNineDigits);
}
