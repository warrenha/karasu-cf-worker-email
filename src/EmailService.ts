import { EmailMessage } from 'cloudflare:email'
import { createMimeMessage } from 'mimetext'

// Configured in Cloudflare 'Email Routing'
const SenderName = 'Karasu Ltd'
const SenderEmail = 'hello@karasu.co.uk'
const RecipientEmail = 'hello@karasu.co.uk'
//const RecipientEmail = 'stallman.wotr@gmail.com'

// - - - - - Email Service - - - - - //

/*
 * Sends a 'contact us' email.
 */
export const sendEmail = async (
    env: Env
): Promise<any> => {  // exception if error
    console.log({ service: 'sendEmail'});

    const createMessage = () => {
        console.log({ method: 'createMessage'});
        const m = createMimeMessage()
        m.setSender({ name: SenderName, addr: SenderEmail })
        m.setRecipient(RecipientEmail)
        m.setSubject('[Karasu] Contact Message')
        m.addMessage({
            contentType: 'text/plain',
            data: '[Message sent from karasu.co.uk contact form]:\n\n' +
                'Congratulations, you just sent an email from a worker. v3'
        })
        return new EmailMessage(
            SenderEmail, // sender
            RecipientEmail, // recipient
            m.asRaw()
        )
    }

    const sendToService = async (m: EmailMessage) => {
        console.log({ method: 'sendToService'});
        try {
            const service = env.CONTACT_ME_EMAIL_SERVICE // defined in wrangler.jsonc
            console.log({ info: `service: ${typeof service}` })
            await service.send(message)
            console.log({ success: 'Email SUCCESS' })
            return { status: 'success', message: 'Email sent!' }
        } catch (e: any) {
            console.log({ error: 'Email ERROR' })
            console.log(e)
            return { status: 'error', message: 'Error sending email' }  // ${e?.message}`
        }
    }

    const message = createMessage()
    return await sendToService(message)
}
