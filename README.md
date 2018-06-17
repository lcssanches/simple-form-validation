# Simple Form Validation

Easily render validation errors on your form.

It's a simple easy-to-use form/data validation, that you can easily use to render errors on your form.

It was built with react/react-native in mind, but you can use in *vanilla* Javascript.

Stop talking, let's code!

### How to use

#### Installation

As simple as:
```
npm install simple-form-validation --save
```

#### Usage

##### Setup
Import and create your validation.
```
import SimpleFormValidation from 'simple-form-validation';

const SFV = new SimpleFormValidation();
```
Create your rules

*! Hint: you can set a default error message, or set it to specific rule*
```
SFV.field('keyname').numeric('Default message').max(10);
SFV.field('keyname2').text('Default message').maxLength(6, 'Max length is 6');
```
You also can chain rules of a Validator.

*! Hint: the rules are executed on the same order they're chained*
```
// Number between 2 and 10
SFV.field('keyname').numeric('Default message').max(10, 'For max(10), use this message').min(2);
// Must be 6 characters long and met the regex
SFV.field('keyname2').text('Default message').maxLength(6, 'Required weak password').regex(/.+/);
```
##### Single Validation
```
/* some logic */
const values = {
  keyname: 1,
  keyname2: 'succes',//s
}
/* more logic */
SFV.renderError('keyname', values.keyname); //returns the message of the error.
```

React-native simple example:
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
SFV.hasErrors();
SFV.isValid();
```

##### Bulk Validation
```
//Promise usage
SFV.validate(values).then(()=>{
  //all good, let's go
}).catch((errors)=>{
  //errors -> list of errors :)
});

// OR - sync old-fashion way
SFV.validateSync(values); // returns true/false

// You can access the errors here
SFV.errors;
```

##### Rendering

By default, renderError will just return the error message (if it exists), so you can customize a little
```
SFV.setDisplayErrorCallback(function(errorMessage) {
  return `<p style="color: red">ERROR! ${errorMessage}</p>`;
  // Or, maybe, a react-native component?
  //return <Text style={styles.error}>{errorMessage}</Text>
});
```

##### Custom validators
You can also add custom validators with your own rules. 

To do that create a class extending the class Validator and add rules (functions) to your Validator:
```
// How about adding a custom validator?
class IsNumberOnValidator extends Validator {
  isNumberOne(message){
    //this.addStep(ruleName, callback, errorMessage);
    this.addStep('isNumberOne', v => return v === 1, message);
  }
}

// clear validators and errors
SFV.reset();

// set new rules with `custom` validator
SFV.field('AmINumberOne').custom(new IsNumberOnValidator()).isNumberOne('You shall not pass!');

// render error
SFV.renderError('AmINumberOne', 1); //return null
SFV.renderError('AmINumberOne', 2); //return "You shall not pass!"

SFV.validate({
  AmINumberOne: 2
}).then(()={
  // you should not be here
}).catch(err =>{
  // 
});
```


### Contributing

Please create issues and suggest PRs.

### Third-party Components

Currently we're using just [moment.js](https://momentjs.com/).
