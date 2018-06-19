import Validator from './Validator';
import moment from 'moment';
export default class ValidatorDate extends Validator {

  constructor(format, message){
    super(message);
    
    if(typeof format === 'undefined' || format == '')
      throw new Error('date format cannot be null');
      
    this._dateFormat = format;
  }
  minAge(_minAge, message){
    this.addStep(
      'minAge',
      function(v) {
        
        if(!moment(v, this._dateFormat).isValid()){
          return false;
        }
        return moment().diff(moment(v, this._dateFormat), 'years',false) >= _minAge;
      },
      message
    );
    return this;
  }
  maxAge(_maxAge, message){
    this.addStep(
      'maxAge',
      function(v) {
        if(!moment(v, this._dateFormat).isValid()){
          return false;
        }
        return moment().diff(moment(v, this._dateFormat), 'years',false) <= _maxAge;
      },
      message
    );
    return this;
  }
  
  valid(message){
    this.addStep(
      'valid',
      (v) => {

        return moment(v, this._dateFormat, true).isValid();

      },
      message
    );
    return this;
  }
}