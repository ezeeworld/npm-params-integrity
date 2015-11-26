**params-integrity**

[![npm version](https://badge.fury.io/js/params-integrity.svg)](http://badge.fury.io/js/params-integrity)

Performs basic presence-checking of a list of keys from an object.

*Install via npm*
```
npm install params-integrity
```


*Basic usage*

```javascript
var paramsIntegrity = require("params-integrity");

// example object to be checked
var objectToCheck = {
    parameter1: "lorem",
    parameter2: "ipsum",
    parameter3: "sit"
};

paramsIntegrity.checkRequiredParams([
        'parameter1',
        'parameter2',
        'parameter3',
    ], objectToCheck)
    .then(function(validatedParams){
        // do what you want with the validatedParams
    })
    .catch(function(error){
        // perform error handling here
    });
```