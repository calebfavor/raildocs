###### Methods

# Usage

```javascript
    var myValidation = validate['myForm'];

    myValidation.insertMethodHere();
```

# editValidationMessages

| Method                                  |  Description                                             |
|-----------------------------------------|----------------------------------------------------------|
| editValidationMessages(object)          |  Edits the validation error messages                     |

```javascript
    myValidation.editValidationMessages({
        defaultMessage: 'This is a new default message.',
        required: 'This is a new required message.',
        email: 'This is a new email message'
    });
```

# validateForm

| Method                                  | Returns      |  Description                                             |
|-----------------------------------------|--------------|----------------------------------------------------------|
| validateForm                            | boolean      |  Runs through all of the inputs, validates them and returns a boolean based on the success of the validation.  |

```javascript
    myValidation.validateForm();
```

# validateInput

| Method                                  | Returns      |  Description                                             |
|-----------------------------------------|--------------|----------------------------------------------------------|
| validateInput(selector)                 | JSON         |  Validates the input specified in the paramter and returns a JSON object with all of the validation rules passed and a booleon based on their success.  |

```javascript
    myValidation.validateInput($('#myInput'));
```