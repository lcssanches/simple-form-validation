
[![npm](https://img.shields.io/npm/v/simple-form-validation.svg)](https://www.npmjs.com/package/simple-form-validation)
[![Build Status](https://travis-ci.org/lcssanches/simple-form-validation.svg?branch=master)](https://travis-ci.org/lcssanches/simple-form-validation)


# Simple Form Validation


An easy-to-use **react-native form validation** highly customizable.

With this module you can render an error message and prevent form submission with invalid data.

- [Simple Form Validation](#simple-form-validation)
  - [How to use](#how-to-use)
    - [Installation](#installation)
    - [Basic usage](#basic-usage)
  - [How to ...](#how-to-)
    - [... check if a number is greater than 5](#-check-if-a-number-is-greater-than-5)
    - [... check if an email is valid](#-check-if-an-email-is-valid)
    - [... check if the name was provided](#-check-if-the-name-was-provided)
    - [... check if a the value matches the regex](#-check-if-a-the-value-matches-the-regex)
    - [... check if a specific field has error](#-check-if-a-specific-field-has-error)
  - [Advanced use](#advanced-use)
    - [Options](#options)
    - [Rendering errors](#rendering-errors)
    - [Sync validation vs Promise Validation](#sync-validation-vs-promise-validation)
    - [Custom validators](#custom-validators)
    - [Reset](#reset)
  - [Cheat Sheet](#cheat-sheet)
    - [Validators](#validators)
      - [ValidatorNumeric](#validatornumeric)
      - [ValidatorText](#validatortext)
      - [ValidatorEmail](#validatoremail)
      - [ValidatorDate](#validatordate)
      - [ValidatorCPF](#validatorcpf)
      - [Custom Validator](#custom-validator)
    - [Contributing](#contributing)
    - [Third-party Components](#third-party-components)

## How to use

### Installation
```
npm install simple-form-validation --save
```
### Basic usage
```
import SimpleFormValidation from 'simple-form-validation';

class SFVTestComponent extends Component {
  constructor(props){
    super(props);
    
    this.SFV = new SimpleFormValidation(sfvOptions);
    this.SFV.field('email').email().required('Required').valid('Invalid e-mail');
  }
  state = {
    email: ''
  }
  onButtonPress() {
    if( this.SFV.validateSync() ) {
	    alert('OK, no errors found');
	} else {
		alert('There are errors');
	}
    // You can pass the values here too...
    // this.SFV.validateSync(this.state);
    // The same as .setValues() before .validate()
  }
  render() {
    
    this.SFV.setValues(this.state);
    // OR - this.SFV.field('email').setValue(this.state.email);
    return (
      <View>
        <Text>Enter you e-mail</Text>
        <TextInput onChangeText={email=>this.setState({email})}/>
        <Button onPress={()=>{this.onButtonPress()}}>
	        <Text>Press me</Text>
        <Button>
        {this.SFV.renderError('email')}
      </View>
      <View>
        E-mail has error? { this.SFV.field('email').hasError()
                              ? 'Yes...'
                              : 'No, all good'}
      </View>
    );
  }
}
```


## How to ...

### ... check if a number is greater than 5
```
this.sfv.field('myNumericField').numeric().min(6, 'The number should be >5.');
```
### ... check if an email is valid
```
this.sfv.field('emailField').email().valid('The address you provided is invalid.');
```
### ... check if the name was provided
```
this.sfv.field('nameField').text().required('Name is required.')
```
### ... check if a the value matches the regex
```
this.sfv.field('password').text().regex(/^(asdf)$/, 'You password is too weak.')
```
### ... check if a specific field has error
This is useful to style the field with error
```
this.sfv.field('password').hasError(); // return true/false
```
See [validators](#validators).

## Advanced use

### Options
```
// This are the default options, you don't need to pass it, 
// but you can change if you want.
const sfvOptions  = {
  justRenderAfterValidate:  true,
  defaultMessage:  '',
  displayErrorCallback:  text  => {
  return  text;
  }
};
this.sfv = new SimpleFormValidation(sfvOptions);
```
|Option|Description|Default|
|--|--|--|
|justRenderAfterValidate|If `false`, will render errors as soon as form is shown. If `true` it will wait until you call `.validate()` or `.validateSync()` for the first time.|`true`|
|defaultMessage|This message will be passed over validators if you do not provide an default message to the validator|*empty*
|displayErrorCallback|This callback is called on .renderError()|`text=>{return text;}`|

### Rendering errors
`displayErrorCallback` allows you to define you own custom renderer.

> **Important!** If a field has error, but no message was set, a warning will be generated before it's rendered. It will call the renderer callback anyway.
```
{
	displayErrorCallback: text => {
		return <Text style={{color: '#d00'}}>{text}</Text>
	}
}
```

### Sync validation vs Promise Validation
There's no big difference. Internally, `.validate()` calls `.validateSync()`.
```
if ( SFV.validateSync({field: 'value'}) ){
	// all good
} else {
	// one or more things are wrong...
	// SFV.errors hold the list of errors
}

// - OR

SFV.validate({field:'value'}).then(()=>{
	// all good
}).catch(errors => {
	// one or more things are wrong...
	// errors hold the list of errors
});
```

### Custom validators
You can define you own custom validator, to meet you requirements.
```
class IsNumberOneValidator extends Validator {
  isNumberOne(message){
    this.addStep(
      'isNumberOne',         // rule name
      v => return v === 1,   // rule callback
      message                // error message
    );
  }
}
/* *** */
SFV.field('AmINumberOne')
  .custom(new IsNumberOneValidator())
  .isNumberOne('You shall not pass!');
/* *** */
SFV.renderError('AmINumberOne', 1); //return null
SFV.renderError('AmINumberOne', 2); //return "You shall not pass!"
```

### Reset
You can reset the SFV, if you want.
```
SFV.reset(); // cleans all fields, rules and errors
```

## Cheat Sheet

### Validators

Messages from rules are always optional.

#### ValidatorNumeric

```
SFV.field('fieldName')
  .numeric(defaultMessage)
  .min(minValue, message)
  .max(maxValue, message)
```

#### ValidatorText

Internally, .regex() uses `regex.test(v)`.

```
SFV.field('fieldName')
  .text(defaultMessage)
  .minLength(minLength, message)
  .maxLength(maxLength, message)
  .regex(regex, message);
```
#### ValidatorEmail

ValidatorEmail use the following regex to check if an e-mail is valid or not.

`/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`

```
SFV.field('fieldName')
  .email(defaultMessage)
   // const domains = "@hotmail.com" 
   // const domains = "@hotmail.com,@gmail.com"
   // const domains = ['@hotmail.com','@gmail.com']
  .notFrom(domains)
  .valid(message);
```

#### ValidatorDate

```
SFV.field('fieldName')
  .date(dateFormat, defaultMessage)
  .valid(message)
  .minAge(age, message)
  .maxAge(age, message)
```

#### ValidatorCPF

```
SFV.field('fieldName')
  .cpf(defaultMessage)
  .valid(message);
```
#### Custom Validator
See custom validators.

### Contributing

Please create issues and suggest PRs.

### Third-party Components

[moment.js](https://momentjs.com/)