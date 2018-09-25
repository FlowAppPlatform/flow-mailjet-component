var Mail = require('./src/mail');
var SendEmailComponent = require('./src/component');

// testing component 
var component = new SendEmailComponent();

component.getProperty('receivers').data = ['jeredebua@gmail.com'];
component.getProperty('subject').data = 'Testing code';
component.getProperty('body').data = 'Hello there, <strong>Jerry Edebua</strong>, Again, ignore this message.';

component.getPort('result').onEmit(function () {
  if (component.getPort('result').getProperty('sent').data) {
    console.log('Mail sent');
  } else
    console.log('Mail not sent');
});

// component.execute();

describe('Mail Tests', function () {
  it(`Mail instance "new Mail()" should not be valid`, function (done) {
    const mail = new Mail();
    done(!mail.mailValid() ? null : new Error('Invalid mail instance read valid'));
  })
  it(`Mail instance "new Mail([], 'Subject', 'Body')" should not be valid`, function (done) {
    const mail = new Mail([], 'Subject', 'Body');
    done(!mail.mailValid() ? null : new Error('Invalid mail instance read valid'));
  })
  it(`Mail instance "new Mail(['hello'],'Hello there','Checking you')" should not be valid`, function (done) {
    const mail = new Mail(
      ['hello'],
      'Hello there',
      'Checking you'
    );
    done(!mail.mailValid() ? null : new Error('Invalid mail instance read valid'));
  })
  it(`Mail instance "new Mail(['hello@sample.com'],'Hello there','Checking you')" should be valid`, function (done) {
    const mail = new Mail(
      ['hello@sample.com'],
      'Hello there',
      'Checking you'
    );
    done(mail.mailValid() ? null : new Error('Valid mail instance read invalid'));
  })
})

describe('Component Tests', function () {
  it('Component should have all required properties', function (done) {
    try {
      const component = new SendEmailComponent();
      component.getProperty('receivers');
      component.getProperty('subject');
      component.getProperty('body');
      done();
    } catch(e) { done(new Error('Component missing required properties')); }
  })
  it(`Component should have 'result' port with 'sent' property`, function (done) {
    try {
      const component = new SendEmailComponent();
      component.getPort('result').getProperty('sent');
      done();
    } catch(e) { done(new Error(`Component missing 'result' port or 'sent' property`)); }
  })
})