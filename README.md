
[![npm](https://img.shields.io/npm/v/simple-form-validation.svg)](https://www.npmjs.com/package/simple-form-validation)


# Simple Form Validation

An easy-to-use **react-native form validation** highly customizable.

With this module you can render an error message and prevent form submission with invalid data.


### How to use

#### Installation


```
npm install simple-form-validation --save
```

#### Usage

##### Setup
Import and create your instance.

```
import SimpleFormValidation from 'simple-form-validation';
const SFV = new SimpleFormValidation();
```

Create your rules. 

You can set a default error message, or set it to specific rule

```
SFV.field('keyname')
  .numeric('Default message')
  .max(10);
SFV.field('keyname2')
  .text('Default message')
  .maxLength(6, 'Max length is 6');
```

You also can chain rules of a Validator. Rules are executed on the same order they're chained

```
// Number between 2 and 10
SFV.field('keyname')
  .numeric('Default message')
  .max(10, 'For max(10), use this message')
  .min(2); 

// Must be 6 characters long and met the regex
SFV.field('keyname2')
  .text('Default message')
  .maxLength(6, 'Required weak password')
  .regex(/.+/);
```

##### Single Validation

```
/* some logic */
this.state = {
  keyname: 1,
  keyname2: 'succes',//s
}
/* more logic */
//returns the message of the error.
SFV.renderError('keyname', this.values.keyname); 
```

Example:

```
render() {
  return (
    <View>
      <Text>Email</Text>
      <TextInput onChangeText={email=>this.setState({email})}/>
      {this.SFV.renderError('email', this.state.email)}
    </View>
  );
}
```

##### Check if rules are valid

Required to prevent form submission when has errors.

```
SFV.hasErrors(); // true|false
SFV.isValid();   // true|false
```

Ofcourse you can check for a specific field

```
SFV.field('fieldname').hasError(); // true|false
```

It's important to mention that this will not run validation for this field again.

##### Bulk Validation

```
//Promise usage
SFV.validate(state).then(()=>{
  //all good, let's go
}).catch((errors)=>{
  //errors -> list of errors :)
});

// OR - sync old-fashion way
SFV.validateSync(state); // returns true/false

// You can access the errors here
SFV.errors;
```

##### Rendering

By default, renderError will just return the error message (if it exists)

```
const styles = StyleSheet.create({
  error:{
    color: '#d00',
    fontSize: 12,
  }
});
SFV.setDisplayErrorCallback(function(message) {
  return <Text style={styles.error}>{message}</Text>
});
```

> If a field has error, but no message was set, a warning will be generated before it's rendered. It will call the renderer callback anyway.

##### Custom validators

You can also add custom validators with your own rules. 

To do that create a class extending the class Validator and add rules (functions) to your Validator:

```
class IsNumberOnValidator extends Validator {
  isNumberOne(message){
    this.addStep(
      'isNumberOne',         // rule name
      v => return v === 1,   // rule callback
      message                // error message
    );
  }
}

// set new rules with `custom` validator
SFV.field('AmINumberOne')
  .custom(new IsNumberOnValidator())
  .isNumberOne('You shall not pass!');

// render error
SFV.renderError('AmINumberOne', 1); //return null
SFV.renderError('AmINumberOne', 2); //return "You shall not pass!"

SFV.validate({
  AmINumberOne: 2
}).then(()={
  // you should not be here
}).catch(err =>{
  // ok...
});
```

You can also reset all rules for any reason you can:

```
SFV.reset(); 
```

### Cheat Sheet

Messages from rules are always optional.

#### ValidatorNumeric

```
SFV.field('fieldName')
  .numeric(defaultMessage)
  .min(minValue, message)
  .max(maxValue, message)
```

#### ValidatorText

Internally, .regex uses `regex.test(v)`.

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

### Contributing

Please create issues and suggest PRs.

### Third-party Components

[moment.js](https://momentjs.com/)