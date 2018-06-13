# simple-form-validation

It's a simple easy-to-use form/data validation, that you can easily use to render errors on your form.

### How to use

#### Install

```
npm install simple-form-validation --save
```

#### Usage

```
import SimpleFormValidation from 'simple-form-validation';

const SFV = new SimpleFormValidation();

SFV.setRuleFor('keyname').numeric('Default error message for numeric').max(10, 'For max(10), use this message').min(2);
SFV.setRuleFor('keyname2').text('Default error message for numeric').maxLength(6, 'Required weak password').regex(/.+/);

const values = {
  keyname: 1,
  keyname2: 'succes',//s
}

//Promise usage
SFV.validate(values).then(()=>{
  //all good, let's go
}).catch((errors)=>{
  //errors -> list of errors :)
});

// OR - sync old-fashion way
SVF.validateSync(values); // returns true/false

// You can access the errors here
SVF.errors;

// OR - render it direct
SVF.renderError('keyname')

// By default, renderError will just return the error message if it exists, what about customize a little?
SVF.setDisplayErrorCallback(function(errorMessage) {
  return `<p style="color: red">ERROR! ${errorMessage}</p>`;
  // Or, maybe, a react-native component?
  //return <Text style{styles.error}>{errorMessage}</Text>
});


// How about adding a custom validator?

class IsNumberOnValidator extends Validator {
  isNumberOne(message){
    this.addStep('isNumberOne', v => return v === 1, message);
  }
}

SVF.reset(); // clear validators and errors
SVFsetRuleFor('AmINumberOne').custom(new IsNumberOnValidator()).isNumberOne('You shall not pass!');

SVF.validate({
  AmINumberOne: 2
}).then(()={
  //you should not be here
}).catch(err =>{
  // all good (?)
});
```
