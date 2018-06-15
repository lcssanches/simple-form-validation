import SFV from '../index';
import Validator from '../Validator';
const assert = require('assert');

describe('Validator', function() {
  it('should add new step', function() {
    //const Validator = require('../Validator');
    const _validator = new Validator();
    _validator.addStep('name', function() {}, 'message');
    assert.equal(_validator.steps.length, 1);
  });
  describe('rule:required', function() {
    it('should require callback fail if null or empty', function() {
      const _sfv = new SFV();

      _sfv.setRuleFor('testkey').text().required('Required');
      _sfv.validateSync({"testkey":""});
      assert(_sfv.hasErrors(), true);
    });
    it('should require callback NOT fail if has content', function() {
      const _sfv = new SFV();

      _sfv.setRuleFor('testkey').text().required('Required');
      _sfv.validateSync({"testkey":"test content"});
      assert(_sfv.isValid(), true);
    });
  });
});


describe('ValidatorString', function (){
  
  it(`should maxLength = 5 pass`, function(){
    const _sfv = new SFV();
    _sfv.setRuleFor('testkey').text().maxLength(5);
    _sfv.validateSync({"testkey":"12345"});
    assert(_sfv.isValid());
  });
  it(`should maxLength = 5 not pass`, function(){
    const _sfv = new SFV();
    _sfv.setRuleFor('testkey').text().maxLength(5);
    _sfv.validateSync({"testkey":"123456"});
    assert(!_sfv.isValid());
  });

  it(`should minLength = 2 pass`, function(){
    const _sfv = new SFV();
    _sfv.setRuleFor('testkey').text().minLength(2);
    _sfv.validateSync({"testkey":"123"});
    assert(_sfv.isValid());
  });
  it(`should minLength = 2 not pass`, function(){
    const _sfv = new SFV();
    _sfv.setRuleFor('testkey').text().minLength(2);
    _sfv.validateSync({"testkey":"1"});
    assert(!_sfv.isValid());
  });

})

describe('ValidatorEmail', function (){
  let validEmail = "valid@email.com";
  it(`"${validEmail}" should be an valid email pass`, function(){
    const _sfv = new SFV();
    _sfv.setRuleFor('testkey').email().valid();
    _sfv.validateSync({"testkey":validEmail});
    assert(_sfv.isValid(), true);
  });

  it(`"${validEmail}" should be not from @fake-domain.com pass`, function(){
    const _sfv = new SFV();
    _sfv.setRuleFor('testkey').email().valid().notFrom('@fake-domain.com');
    _sfv.validateSync({"testkey":validEmail});
    assert(_sfv.isValid(), true);
  });

  it(`"${validEmail}" should be not from @email.com not pass`, function(){
    const _sfv = new SFV();
    _sfv.setRuleFor('testkey').email().valid().notFrom('@email.com');
    _sfv.validateSync({"testkey":validEmail});
    assert(_sfv.isValid(), true);
  });

  let invalidEmail = "valid.email.com";
  it(`"${invalidEmail}" should be an invalid email`, function(){
    const _sfv = new SFV();
    _sfv.setRuleFor('testkey').email().valid();
    _sfv.validateSync({"testkey":invalidEmail});
    assert(_sfv.hasErrors(), true);
  })
})


describe('ValidatorCPF', function (){
  let validCPF = "38330181863";
  it(`"${validCPF}" should be an CPF`, function(){
    const _sfv = new SFV();
    _sfv.setRuleFor('testkey').cpf().valid();
    _sfv.validateSync({"testkey":validCPF});
    assert(_sfv.isValid(), true);
  });

  let invalidCPF = "12653515808";
  it(`"${invalidCPF}" should be an invalid CPF`, function(){
    const _sfv = new SFV();
    _sfv.setRuleFor('testkey').cpf().valid();
    _sfv.validateSync({"testkey":invalidCPF});
    assert(_sfv.hasErrors(), true);
  })
  invalidCPF = "11111111111";
  it(`"${invalidCPF}" should be an invalid CPF`, function(){
    const _sfv = new SFV();
    _sfv.setRuleFor('testkey').cpf().valid();
    _sfv.validateSync({"testkey":invalidCPF});
    assert(_sfv.hasErrors(), true);
  })
})