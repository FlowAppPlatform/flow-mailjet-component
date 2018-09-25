var SendEmailComponent = require('./src/component');

// testing component 
var component = new SendEmailComponent();

component.getProperty('receivers').data = ['jeredebua@gmail.com'];
component.getProperty('subject').data = 'Testing code';
component.getProperty('body').data = 'Hello there, <strong>Jerry Edebua</strong>, Again, ignore this message.';

component.getPort('Result').onEmit(function () {
  if (component.getPort('Result').getProperty('sent').data) {
    console.log('Mail sent');
  } else
    console.log("Mail not sent");
});

// component.execute();

describe('should isServer & isClient works', function () {
  it('isServer returns true for node env', function (done) {
    done()
  })
})

/* new Mail(
  ['jeredebua@gmail.com'],
  'Testing code',
  'Hello there, <strong>Jerry Edebua</strong>, Ignore this message.'
).send()
  .then(result => {
    console.log(result.body)
  })
  .catch(err => {
    throw err;
  }); */