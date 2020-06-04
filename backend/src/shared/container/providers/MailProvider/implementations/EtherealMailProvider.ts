import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '../models/IMailProvider';

interface IMessage {
  to: string;
  body: string;
}

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then(account => {
        console.log('Credentials obtained...');

        // Create a SMTP transporter object
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });
        this.client = transporter;
      })
      .catch(err => {
        if (err) {
          console.error(`Failed to create a testing account. ${err.message}`);
        }
      });
  }

  public async sendEmail(to: string, body: string): Promise<void> {
    // Message object

    console.log('Sending message...');
    const message = await this.client.sendMail({
      from: 'Equipe Gobarber <equipe@gobarber.com.br>',
      to,
      subject: 'Recuperação de senha',
      text: body,
    });

    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default new EtherealMailProvider();
