export default class ValidatorOnlyNumbers extends Validator {

  min(minValue, message) {
   
    this.addStep(
      'minimum',
      function(v) {
        return v >= minValue;
      },
      message
    );
    return this;
  }

  max(maxValue, message) {
    this.addStep(
      'minimum',
      function(v) {
        return v <= maxValue;
      },
      message
    );
    return this;
  }
}
