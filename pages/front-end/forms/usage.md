###### Usage

# Form Instantiation

* To instantiate the validation plugin, add the *data-validate-form="true"* attribute to your form

```html
    <form id="myForm" data-validate-form="true">
        ...
    </form>
```

# Field Instantiation

* To instantiate a form input or field to be validated add a *data-validate-{{ rule }}* attribute to your input

```html
    <input id="myInput" 
           type="text" 
           data-validate-required="true">
```