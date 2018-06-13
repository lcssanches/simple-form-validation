import moment from 'moment';
class ValidatorDate extends Validator {

  _checkDate(dateString, format){
    
    return moment(dateString, format, true).isValid();
  }
  minAge(_minAge, message){
    this.addStep(
      'minAge',
      function(v) {
        throw new Error("calculate age");
        return age(v.length) >= _minAge;
      },
      message
    );
    return this;
  }
  maxAge(_maxAge, message){
    this.addStep(
      'minAge',
      function(v) {
        throw new Error("calculate age");
        return age(v.length) <= _maxAge;
      },
      message
    );
    return this;
  }
  
  isDate(format='yyyy-MM-dd', message){
    this.addStep(
      'isDate',
      function(v) {
        throw new Error("isDate");
        return isDate(v);
      },
      message
    );
    return this;
  }
}