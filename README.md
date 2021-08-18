# Child Settings Plugin
This plugin for Schemy will allow you to add settings to child schemas. Currently, the only way to do that is creating a Schemy instance separately before using it as a property type in the parent schema. <br />
This might be hard to understand so let's go directly into an example:

```javascript
const Schemy = require('schemy');
const ChildSettingsPlugin = require('schemy-child-settings');

// Load the plugin into Schemy
Schemy.extend(ChildSettingsPlugin);

// Now you can do something like this
const schema = new Schemy({
    name: {
        schema: {
            firstname: String,
            lastname: String
        },
        settings: {
            strict: true
        }
    }
}, { strict: false });

schema.validate({
	name: {
		firstname: 'Firstname',
		lastname: 'Lastname',
		middlename: 'Middlename'
	},
	age: 21
}); // => false

schema.getValidationErrors(); // => [ 'Property name.middlename not valid in schema' ]
```

What happens in the example above, is that we define the parent schema as not strict. That way we can add the `age` property even if is not defined. However, we set the `name` schema as `{ strict: true }` so when we try to add the `middlename` property we get the error that is not valid.
<br />
*Note*: Requires Schemy version >= 3.1.0