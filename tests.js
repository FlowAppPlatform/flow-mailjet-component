var Mail = require('./src/mail');
var Component = require('./send-email');

describe(`Mail Tests
`, function () {
  it(`Mail instance "new Mail()" should not be valid`, function (done) {
    const mail = new Mail();
    done(!mail.mailValid() ? null : new Error('Invalid mail instance read valid'));
  })
  it(`Mail instance "new Mail(
    'ccf7c44ea1ddb60dd36bbd8f50aa2d24','29f62c2654193c5fb746500769a7cefd',
    '','to@sample.com','Subject','Body')" should not be valid`, function (done) {
    const mail = new Mail(
      'ccf7c44ea1ddb60dd36bbd8f50aa2d24', '29f62c2654193c5fb746500769a7cefd',
      '', 'to@sample.com', 'Subject', 'Body');
    done(!mail.mailValid() ? null : new Error('Invalid mail instance read valid'));
  })
  it(`Mail instance "new Mail(
    'ccf7c44ea1ddb60dd36bbd8f50aa2d24','29f62c2654193c5fb746500769a7cefd',
    from@sample.com','hello','Hello there','Checking you')" should not be valid`, function (done) {
    const mail = new Mail(
      'ccf7c44ea1ddb60dd36bbd8f50aa2d24', '29f62c2654193c5fb746500769a7cefd',
      'from@sample.com',
      'hello',
      'Hello there',
      'Checking you'
    );
    done(!mail.mailValid() ? null : new Error('Invalid mail instance read valid'));
  })
  it(`Mail instance "new Mail(
    'ccf7c44ea1ddb60dd36bbd8f50aa2d24','',
    from@sample.com','to@sample.com','Hello there','Checking you')" should be valid`, function (done) {
    const mail = new Mail(
      'ccf7c44ea1ddb60dd36bbd8f50aa2d24', '',
      'from@sample.com',
      'to@sample.com',
      'Hello there',
      'Checking you'
    );
    done(!mail.mailValid() ? null : new Error('Inalid mail instance read valid'));
  })
  it(`Mail instance "new Mail(
    'ccf7c44ea1ddb60dd36bbd8f50aa2d24','29f62c2654193c5fb746500769a7cefd',
    from@sample.com','to@sample.com','Hello there','Checking you')" should be valid`, function (done) {
    const mail = new Mail(
      'ccf7c44ea1ddb60dd36bbd8f50aa2d24', '29f62c2654193c5fb746500769a7cefd',
      'from@sample.com',
      'to@sample.com',
      'Hello there',
      'Checking you'
    );
    done(mail.mailValid() ? null : new Error('Valid mail instance read invalid'));
  })
})

describe(`Component Tests
`, function () {
  it('Component should have all required properties', function (done) {
    try {
      const component = new Component();
      component.getProperty('API_KEY_PUBLIC');
      component.getProperty('API_KEY_PRIVATE');
      component.getProperty('From');
      component.getProperty('To');
      component.getProperty('Subject');
      component.getProperty('Body');
      done();
    } catch(e) { done(new Error('Component missing required properties')); }
  })
  it('Component should have all required ports', function (done) {
    try {
      const component = new Component();
      component.getPort('Sent');
      component.getPort('Bounced');
      component.getPort('Error');
      done();
    } catch(e) { done(new Error('Component missing required ports')); }
  })
})