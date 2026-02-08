import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST(req: Request) {
    try{
        const body = await req.json();
        const {email} = body;
    }
}
resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'kalihrishikesh@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});