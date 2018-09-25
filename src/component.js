var Flow = require('flow-platform-sdk');
var Mail = require('./mail');

/*
*
* SendEmailComponent sends email
* The component has 3 properties - `receivers`, `subject`, and `body` which are all required to send the email
* The component has 1 output port - The output port, `Result` has a property, `sent`, a boolean which denotes the result of the email sending
*
*/

class SendEmailComponent extends Flow.Component {
  
  constructor() {

    super();    
    this.name = 'Send Email';

    var receivers = new Flow.Property('receivers', 'list');
    receivers.required = true;

    var subject = new Flow.Property('subject', 'text');
    subject.required = true;

    var body = new Flow.Property('body', 'text');
    body.required = true;

    this.addProperty(receivers);
    this.addProperty(subject);
    this.addProperty(body);

    var port = new Flow.Port('Result');
    var sent = new Flow.Property('sent', 'boolean');
    sent.required = true;
     
    port.addProperty(sent);
    this.addPort(port);

    // send the email here
    this.attachTask(function () {      
      new Mail(
        this.getProperty('receivers').data,
        this.getProperty('subject').data,
        this.getProperty('body').data,
      )
        .send()
        .then(result => {
          this.emitResult(result.body);
        })
        .catch(err => {
          this.emitResult(err);
        });
    });

  }

  emitResult(result) {
    this.getPort('Result').getProperty('sent').data = !(result instanceof Error);
    this.getPort('Result').emit();
    this.taskComplete();
  }

}

module.exports = SendEmailComponent;