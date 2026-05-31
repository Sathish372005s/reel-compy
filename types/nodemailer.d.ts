declare module "nodemailer" {
  type AuthOptions = {
    user: string;
    pass: string;
  };

  type Address = {
    name?: string;
    address: string;
  };

  type TransportOptions = {
    service?: string;
    host?: string;
    port?: number;
    secure?: boolean;
    auth: AuthOptions;
  };

  type SendMailOptions = {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
    replyTo?: string | Address;
  };

  type Transporter = {
    verify(): Promise<true>;
    sendMail(options: SendMailOptions): Promise<unknown>;
  };

  const nodemailer: {
    createTransport(options: TransportOptions): Transporter;
  };

  export default nodemailer;
}
