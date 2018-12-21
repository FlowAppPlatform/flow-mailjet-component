var Mail = require('./src/mail');
var Component = require('./send-email');

describe(`Mail Tests
`, function () {
  it(`Mail instance should not be valid`, function (done) {
    const mail = new Mail();
    done(!mail.isMailValid() ? null : new Error('Invalid mail instance read valid'));
  })
  it(`Mail instance should not be valid`, function (done) {
    const mail = new Mail(
      'ccf7c44ea1ddb60dd36bbd8f50aa2d24', '29f62c2654193c5fb746500769a7cefd',
      'from@sample.com',
      'hello',
      'Test',
      'Hello there.'
    );
    done(!mail.isMailValid() ? null : new Error('Invalid mail instance read valid'));
  })
  it(`Mail instance should be valid`, function (done) {
    const mail = new Mail(
      'ccf7c44ea1ddb60dd36bbd8f50aa2d24', '',
      'from@sample.com',
      'to@sample.com',
      'Test',
      'Hello there.'
    );
    done(!mail.isMailValid() ? null : new Error('Invalid mail instance read valid'));
  })
})

describe(`Component Tests
`, function () {
  it('Component should execute without errors', function (done) {
    try {
      const Graph = require('flow-platform-sdk').Graph;
      const Component = require('./send-email');

      const component = new Component();

      component.getProperty('API_KEY_PUBLIC').data = 'Your_Public_Mailjet_Key';
      component.getProperty('API_KEY_PRIVATE').data = 'Your_Private_Mailjet_Key';

      component.getProperty('From').data = 'fro@domain.store';
      component.getProperty('To').data = 'to@domain.store';
      
      component.getProperty('Subject').data = 'Checking your availability';
      component.getProperty('Body').data = 'Hello, Merrari.';

      component.getPort('Sent').onEmit(function(){
        done();
      });

      new Graph("graph-1").addComponent(component);
      component.execute();

    } catch(e) { done(e); }
  })
  it('Component ports should have Data property', function (done) {
    try {
      const component = new Component();
      const ports = [
        component.getPort('Sent'),
        component.getPort('Bounced'),
        component.getPort('Error')
      ]
      ports[0].getProperty('Data');
      ports[1].getProperty('Data');
      ports[2].getProperty('Data');
      done();
    } catch(e) { done(new Error('Component missing required ports or Data property on some ports')); }
  })
})