var Flow = require('flow-platform-sdk');
var Mail = require('./src/mail');

/*
*
* This component sends email
* 
* The component has 6 properties - `Public API Key`, `Private API Key`, From`, `To`, `Subject`, and `Body`
* The component has 3 ports respective to the mail statuses `Sent`, `Bounced`, `Error`
* The ports each have the `Data` property, the response from Mailjet
*
*/

class SendEmailComponent extends Flow.Component {
  
  constructor() {

    super();    
    this.name = 'Send Email';

    var key_public = new Flow.Property('API_KEY_PUBLIC', 'text');
    key_public.required = true;

    var key_private = new Flow.Property('API_KEY_PRIVATE', 'text');
    key_private.required = true;

    var from = new Flow.Property('From', 'email');
    from.required = true;

    var to = new Flow.Property('To', 'email');
    to.required = true;

    var subject = new Flow.Property('Subject', 'text');
    var body = new Flow.Property('Body', 'text');
    
    this.addProperty(key_public);
    this.addProperty(key_private);
    this.addProperty(from);
    this.addProperty(to);
    this.addProperty(subject);
    this.addProperty(body);

    var sent = new Flow.Port('Sent');
    var error = new Flow.Port('Error');
    var bounced = new Flow.Port('Bounced');
    
    var response = new Flow.Property('Data', 'object');
    response.required = true;
    sent.addProperty(response);
    
    var generalError = new Flow.Property('Data', 'object');
    generalError.required = true;
    error.addProperty(generalError);
    
    var bouncedError = new Flow.Property('Data', 'object');
    bouncedError.required = true;
    bounced.addProperty(bouncedError);

    this.addPort(sent);
    this.addPort(error);
    this.addPort(bounced);

    // send the email here
    this.attachTask(function () {
      let doTask = 
        new Mail(
          this.getProperty('API_KEY_PUBLIC').data,
          this.getProperty('API_KEY_PRIVATE').data,
          this.getProperty('From').data,
          this.getProperty('To').data,
          this.getProperty('Subject').data,
          this.getProperty('Body').data
        ).send();
      
      if (doTask instanceof Error) {
        const port = this.getPort('Error');
        port.getProperty('Data').data = response;
        port.emit();
        this.taskComplete();
        return;
      }
      doTask
        .then(response => {
          const port = this.getPort('Sent');
          port.getProperty('Data').data = response;
          port.emit();
          this.taskComplete();
        })
        .catch(err => {
          let port = this.getPort('Error');
          if (err.statusCode === 422) // receipient mail box full
            port = this.getPort('Bounced');
          port.getProperty('Data').data = err;
          port.emit();
          this.taskComplete();
        });
    });

  }

}

module.exports = SendEmailComponent;