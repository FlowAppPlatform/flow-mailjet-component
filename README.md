# Flow Mailjet component
The component is an npm package that sends email using Mailjet and is designed to work with Flow SDK

*To use the component, install the package in your NodeJS project*

```
npm install flow-mailjet-component --save
```

*Use the component as below*

```javascript
// require the component
const Component = require('flow-mailjet-component');

// create instance of the component
const component = new Component();
```

*Provide mailjet credentials, public and private api keys*

```javascript
component.getProperty('API_KEY_PUBLIC').data = 'Your_Public_Mailjet_Key';
component.getProperty('API_KEY_PRIVATE').data = 'Your_Private_Mailjet_Key';
```

*Provide email fields*

```javascript
// provide from and to address of the email
component.getProperty('From').data = 'fro@domain';
component.getProperty('To').data = 'to@domain';

// provide the subject and body for the email
component.getProperty('Subject').data = 'Checking your availability';
component.getProperty('Body').data = 'Hello, Merrari.';
```

*Listen in for port emit events*
```javascript
component.getPort('Sent').onEmit(function(){
  // email was sent
  // the server response can be accessed through the 'Data' property of the port
  let response = component.getPort('Sent').getProperty('Data').data;
  // the response is stored as a json encoded string
  response = JSON.parse(response);
});

component.getPort('Bounced').onEmit(function(){
  // email bounced
  // the actual error can be accessed through the 'Data' property of the port
  let err = component.getPort('Bounced').getProperty('Data').data;
  // the error is stored as a json encoded string
  err = JSON.parse(err);
});

component.getPort('Error').onEmit(function(){
  // a seperate error occured
  // the actual error can be accessed through the 'Data' property of the port
  let err = component.getPort('Error').getProperty('Data').data;
  // the error is stored as a json encoded string
  err = JSON.parse(err);
});


// mandatory to execute the component
component.execute();
```

#### Conclusion

And that's it! You've successfully used the Flow Mailjet component.

If you are having trouble sending emails, check that you are using the correct [Mailjet API keys](https://app.mailjet.com/account/setup) and the right [sender address](https://app.mailjet.com/account/sender).