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

function validate(rawCpf) {

  var cpf = rawCpf.replace(/\.|-|\s/g, '')

  if ( cpf.length != 11 ) return false;
  if (/^(.)\1+$/.test(cpf)) return false;

  cpf = cpf.split('');

  var sum1 = 0;
  for( let c = 10; c>=2 ; c--){
    sum1 += c * cpf[10-c];
  }
  var checkSum1 = sum1  % 11
  checkSum1 = checkSum1 < 2 
                  ? 0 
                  : 11 - checkSum1;

  if (cpf[9] != checkSum1) return false;

  var sum2 = 0;
  for( let c = 11; c>=2 ; c--){
    sum2 += c*cpf[11-c];
  }
  var checkSum2 = sum2 % 11
  checkSum2 = checkSum2 < 2 
                  ? 0 
                  : 11 - checkSum2;

  if (cpf[10] != checkSum2) return false;

  return true;
}