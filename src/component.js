var Flow = require('flow-platform-sdk');
var Mail = require('./mail');

/*
*
* SendEmailComponent sends email
* The component has 6 properties - `Public API Key`, `Private API Key`, From`, `To`, `Subject`, and `Body` which are all required to send the email
* The component has 3 ports respective to the mail statuses `Sent`, `Bounced`, `Error`
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
    subject.required = true;

    var body = new Flow.Property('Body', 'text');
    body.required = true;

    this.addProperty(key_public);
    this.addProperty(key_private);
    this.addProperty(from);
    this.addProperty(to);
    this.addProperty(subject);
    this.addProperty(body);

    var sent = new Flow.Port('Sent');
    var error = new Flow.Port('Error');
    var bounced = new Flow.Port('Bounced');
    
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
        this.emitResult(this.getPort('Error'));
      } else
        doTask
          .then(() => {
            this.emitResult(this.getPort('Sent'));
          })
          .catch(err => {
            if (err.statusCode === 422) { // receipient mail box full
              this.emitResult(this.getPort('Bounced'));
            } else
              this.emitResult(this.getPort('Error'));
          });
    });

  }

  emitResult(port) {
    port.emit();
    this.taskComplete();
  }

}

module.exports = SendEmailComponent;