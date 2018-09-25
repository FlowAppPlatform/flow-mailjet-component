/**
 *
 * This class constructs an email that can be sent with the send() method
 * The class uses Mailjet to send emails
 * 
 *
 */

API_VERSION = 'v3.1';
const API_KEY_PUBLIC = 'ccf7c44ea1ddb60dd36bbd8f50aa2d24';
const API_KEY_PRIVATE = '29f62c2654193c5fb746500769a7cefd';

const mailjet = require('node-mailjet');
const validator = require('email-validator');

class Mail {

	constructor(receivers, subject, body) {
		this.receivers = receivers;
		this.subject = subject;
		this.body = body;

		this.sender = {
			'Email': 'hello@fyipe.com',
			'Name': 'Fyipe'
		};

		this.mailjet = mailjet
			.connect(API_KEY_PUBLIC, API_KEY_PRIVATE);
	}

	send() {
		if (!this.mailValid()) return new Error('Mailer error, please check \'Mail\' contructor');
		return (
			this.mailjet
				.post('send', {
					'version': API_VERSION
				})
				.request({
					'Messages': [{
						'From': this.sender,
						'To': this.receivers.map(receiver => {
							return {
								'Email': receiver
							};
						}),
						'Subject': this.subject,
						'TextPart': this.body,
						'HTMLPart': this.body,
					}]
				})
		);
	}

	mailValid() {
		return (
			this.receiversValid() &&
      Boolean(this.subject) &&
      Boolean(this.body) &&
      Boolean(this.mailjet)
		);
	}

	receiversValid() {
		try {
			return !this.receivers.find(receiver => !validator.validate(receiver)) && this.receivers.length > 0;
		} catch(e) { return false; }
	}

}

module.exports = Mail;