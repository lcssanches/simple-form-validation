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

SFV.validate(values).then(()=>{
  //all good, let's go
}).catch((errors)=>{
  //errors -> list of errors :)
});

// OR - SFV.validateSync(values): returns bool
//      SFV.errors //list of errors

//Display all errors
SFV.renderError();
// OR - specific item, usefull for forms
SFV.renderError('keyname');
```
