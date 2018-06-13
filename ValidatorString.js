class ValidatorString extends Validator {

    regex(regex, message){

      const callback = function (v) {
        return !!v.match(regex)
      };
       
      this.addStep(
        'regex',
        callback,
        message
      );
     
      return this;
    }
    minLength(_minLength, message) {
     
      this.addStep(
        'minLenght',
        function(v) {
          return v.length >= _minLength;
        },
        message
      );
      return this;
    }
    maxLength(_maxLength, message) {
      this.addStep(
        'maxLenght',
        function(v) {
          return v.length <= _maxLength;
        },
        message
      );
      return this;
    }
}