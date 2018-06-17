import Validator from './Validator';
import moment from 'moment';
export default class ValidatorDate extends Validator {

  minAge(_minAge, message){
    this.addStep(
      'minAge',
      function(v) {
        
        if(!moment(v).isValid()){
          return false;
        }
        return moment().diff(v, 'years',false) >= _minAge;
      },
      message
    );
    return this;
  }
  maxAge(_maxAge, message){
    this.addStep(
      'minAge',
      function(v) {
        if(!moment(v).isValid()){
          return false;
        }
        return moment().diff(v, 'years',false) <= _maxAge;
      },
      message
    );
    return this;
  }
  
  valid(format='YYYY-MM-DD', message){
    this.addStep(
      'valid',
      (v) => {

        return moment(v, format, true).isValid();

      },
      message
    );
    return this;
  }
}