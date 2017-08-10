###### Events

# Usage

```javascript
    $('#myInput').on('field:validate', function(){
        
    });
```

# Events List

| Event                       | Description                                                             |
|-----------------------------|-------------------------------------------------------------------------|
| form:validate               | Fires when a **form** is validated, regardless of success or errors     |
| form:success                | Fires when a **form** is validated and **all** fields succeed           |
| form:error                  | Fires when a **form** is validated and **any** fields error             |
| field:validate              | Fires when a **field** is validated, regardless of success or errors    |
| field:success               | Fires when a **field** is validated and succeeds                        |
| field:error                 | Fires when a **field** is validated and errors                          |
