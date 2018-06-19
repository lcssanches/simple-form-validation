import SFV from '../index';
import Validator from '../Validator';
import assert, { equal } from 'assert';


describe('SimpleFormValidation', function () {



  describe('Validator', function () {
    it('should add new step', function () {
      //const Validator = require('../Validator');
      const _validator = new Validator();
      _validator.addStep('name', function () { }, 'message');
      equal(_validator.steps.length, 1);
    });
    describe('.required()', function () {

      const _sfv = new SFV();
      _sfv.field('name', true).text().required('Required');

      it('should has no error', function () {
        _sfv.validateSync({ name: 'test' })
        //console.log(_sfv.field('name').hasError());
        assert(_sfv.field('name').hasError() === false);
      });

      it('null should has no error because has not run yet', function () {
        _sfv.field('name', true).text().required('Required');
        //_sfv.validateSync({name: null})
        assert(!_sfv.field('name').hasError());
      });

      it('null should has error', function () {
        _sfv.validateSync({ name: null })
        assert(_sfv.field('name').hasError());
      });

      it('undefined should has error', function () {
        _sfv.validateSync({ name: undefined })
        assert(_sfv.field('name').hasError());
      });

      it('empty should has error', function () {
        _sfv.validateSync({ name: '' })
        assert(_sfv.field('name').hasError());
      });

      it('0 should NOT has error', function () {
        _sfv.validateSync({ name: 0 })
        assert(_sfv.field('name').hasError() === false);
      });

    });
  });


  describe('ValidatorText', function () {

    describe('.maxLength(5)', function () {

      const _sfv = new SFV();
      _sfv.field('testkey').text().maxLength(5);

      it(`should "1234" pass`, function () {
        _sfv.validateSync({ "testkey": "1234" });
        assert(_sfv.isValid());
      });

      it(`should "12345" pass`, function () {
        _sfv.validateSync({ "testkey": "12345" });
        assert(_sfv.isValid());
      });

      it(`should "123456" NOT pass`, function () {
        _sfv.validateSync({ "testkey": "123456" });
        assert(!_sfv.isValid());
      });

    });

    describe('.minLength(2)', function () {
      const _sfv = new SFV();
      _sfv.field('testkey').text().minLength(2);

      it(`should "123" pass`, function () {
        _sfv.validateSync({ "testkey": "123" });
        assert(_sfv.isValid());
      });

      it(`should "12" pass`, function () {
        _sfv.validateSync({ "testkey": "12" });
        assert(_sfv.isValid());
      });

      it(`should "1" NOT pass`, function () {
        _sfv.validateSync({ "testkey": "1" });
        assert(!_sfv.isValid());
      });
    });


    describe('.minLength(6).maxLength(10)', function () {
      const _sfv = new SFV();
      _sfv.field('testkey').text().minLength(6, 'minLength(6) failed').maxLength(10, 'maxLength(10) failed');

      it(`should "123456" pass`, function () {
        _sfv.validateSync({ "testkey": "123456" });
        assert(_sfv.isValid());
      });

      it(`should "1234567890" pass`, function () {
        _sfv.validateSync({ "testkey": "1234567890" });
        assert(_sfv.isValid());
      });

      it(`should "1" NOT pass`, function () {
        _sfv.validateSync({ "testkey": "1" });
        assert(!_sfv.isValid(), _sfv.renderError('testkey'));
      });
      it(`should "12345" NOT pass`, function () {
        _sfv.validateSync({ "testkey": "12345" });
        assert(!_sfv.isValid(), _sfv.renderError('testkey'));
      });
      it(`should "12345678901" NOT pass`, function () {
        _sfv.validateSync({ "testkey": "12345678901" });
        assert(!_sfv.isValid(), _sfv.renderError('testkey'));
      });
    });

    describe('.regex(/^[0-9]+$/)', function () {
      const _sfv = new SFV();
      _sfv.field('testkey').text().regex(/^[0-9]+$/);

      it(`should '12345' pass`, function () {
        _sfv.validateSync({ "testkey": "12345" });
        assert(_sfv.isValid());
      });

      it(`should 'abcde' NOT pass`, function () {
        _sfv.validateSync({ "testkey": "abcde" });
        assert(!_sfv.isValid());
      });
    });
  })

  describe('ValidatorEmail', function () {
    describe('.valid()', function () {
      const _sfv = new SFV();
      _sfv.field('testkey').email().valid();

      const validEmail = "valid@email.com";
      it(`"${validEmail}" should pass`, function () {
        _sfv.validateSync({ "testkey": validEmail });
        assert(_sfv.isValid());
      });

      const invalidEmail = "valid.email.com";
      it(`"${invalidEmail}" should NOT pass`, function () {
        _sfv.validateSync({ "testkey": invalidEmail });
        assert(!_sfv.isValid());
      })
    });

    describe('.notFrom("@fake-domain.com")', function () {
      const _sfv = new SFV();
      _sfv.field('testkey').email().valid().notFrom('@fake-domain.com');

      var validEmail = "valid@email.com";
      it(`"${validEmail}" should pass`, function () {
        _sfv.validateSync({ "testkey": validEmail });
        assert(_sfv.isValid());
      });

      let validEmail2 = "valid-but-not-allowed@fake-domain.com"
      it(`"${validEmail2}" should NOT pass`, function () {
        _sfv.validateSync({ "testkey": validEmail2 });
        assert(!_sfv.isValid());
      });
    });


  })

  describe('ValidatorCPF', function () {
    describe('.valid()', function () {
      let validCPF = "095.211.790-82";

      const _sfv = new SFV();
      _sfv.field('testkey').cpf().valid();
      it(`"${validCPF}" should pass`, function () {
        _sfv.validateSync({ "testkey": validCPF });
        assert(_sfv.isValid());
      });
      validCPF = "31449681026";
      it(`"${validCPF}" should pass`, function () {
        _sfv.validateSync({ "testkey": validCPF });
        assert(_sfv.isValid());
      });
      let invalidCPF = "12653515808";
      it(`"${invalidCPF}" should NOT pass`, function () {
        _sfv.validateSync({ "testkey": invalidCPF });
        assert(!_sfv.isValid());
      });
      invalidCPF = "123456789";
      it(`"${invalidCPF}" should NOT pass`, function () {
        _sfv.validateSync({ "testkey": invalidCPF });
        assert(!_sfv.isValid());
      });
      invalidCPF = "11111111111";
      it(`"${invalidCPF}" should NOT pass`, function () {
        _sfv.validateSync({ "testkey": invalidCPF });
        assert(!_sfv.isValid());
      });
    })

  })

  describe('ValidatorDate', function () {
    describe('.valid() - format YYYY-MM-DD', function () {
      let validDate = "2018-01-01";
      const _sfv = new SFV();
      _sfv.field('testkey').date('YYYY-MM-DD').valid();
      it(`"${validDate}" should pass`, function () {
        _sfv.validateSync({ "testkey": validDate });
        assert(_sfv.isValid());
      });
      let invalidDate = '2018-13-33';
      it(`"${invalidDate}" should NOT pass`, function () {
        _sfv.validateSync({ "testkey": invalidDate });
        assert(!_sfv.isValid());
      });
      let invalidDate2 = '20181212';
      it(`"${invalidDate2}" should NOT pass`, function () {
        _sfv.validateSync({ "testkey": invalidDate2 });
        assert(!_sfv.isValid());
      });
    })
    describe('.valid() - format MM/DD/YYYY', function () {
      const _sfv = new SFV();
      _sfv.field('testkey').date('MM/DD/YYYY').valid();
      let validDate = "06/25/2018";
      it(`"${validDate}" should pass`, function () {
        _sfv.validateSync({ "testkey": validDate });
        assert(_sfv.isValid());
      });
      let invalidDate = '2018-12-11';
      it(`"${invalidDate}" should NOT pass`, function () {
        _sfv.validateSync({ "testkey": invalidDate });
        assert(!_sfv.isValid());
      });
    });
    describe('.minAge(18) - format YYYY-MM-DD', function () {
      let _25years = "1993-01-01";
      const _sfv = new SFV();
      _sfv.field('testkey').date('YYYY-MM-DD').minAge(18);
      it(`"${_25years}" should pass`, function () {
        _sfv.validateSync({ "testkey": _25years });
        assert(_sfv.isValid());
      });

      let _1YearDate = "2018-06-18";
      it(`"${_1YearDate}" should NOT pass`, function () {
        _sfv.validateSync({ "testkey": _1YearDate });
        assert(!_sfv.isValid());
      });
    })
    describe('.maxAge(25) - format YYYY-MM-DD', function () {
      let _25years = "1990-01-01";
      const _sfv = new SFV();
      _sfv.field('testkey').date('YYYY-MM-DD').maxAge(25);
      it(`"${_25years}" should NOT pass`, function () {
        _sfv.validateSync({ "testkey": _25years });
        assert(!_sfv.isValid());
      });

      let _1YearDate = "2015-01-01";
      it(`"${_1YearDate}" should pass`, function () {
        _sfv.validateSync({ "testkey": _1YearDate });
        assert(_sfv.isValid());
      });
    })

    describe('.minAge(18).maxAge(40) - format YYYY-MM-DD', function () {
      const _sfv = new SFV();
      _sfv.field('testkey').date('YYYY-MM-DD').minAge(18, 'minAge(18) failed').maxAge(40, 'maxAge(40) failed');



      let year_1 = "2015-01-01";
      it(`"${year_1}" should NOT pass`, function () {
        _sfv.validateSync({ "testkey": year_1 });
        assert(!_sfv.isValid(), _sfv.renderError('testkey'));
      });

      let year_2 = "1960-01-01";
      it(`"${year_2}" should NOT pass`, function () {
        _sfv.validateSync({ "testkey": year_2 });
        //console.log('1960 ' +  _sfv.renderError('testkey'));
        assert(!_sfv.isValid(), _sfv.renderError('testkey'));
      });

      let year_3 = "2000-01-01";
      it(`"${year_3}" should pass`, function () {
        _sfv.validateSync({ "testkey": year_3 });
        assert(_sfv.isValid(), _sfv.renderError('testkey'));
      });
    })


  })
});