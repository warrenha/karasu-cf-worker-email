import { EmailMessage } from 'cloudflare:email'
import { createMimeMessage } from 'mimetext'

// Configured in Cloudflare 'Email Routing'
const SenderName = 'Karasu Ltd'
const SenderEmail = 'hello@karasu.co.uk'
const RecipientEmail = 'stallman.wotr@gmail.com'

// - - - - - Email Service - - - - - //

/*
 * Sends a 'contact us' email.
 */
export const sendEmail = async (
    env: Env
): Promise<void> => {  // exception if error
    const createMessage = () => {
        const m = createMimeMessage()
        m.setSender({ name: SenderName, addr: SenderEmail })
        m.setRecipient(RecipientEmail)
        m.setSubject('[Karasu] Contact Message')
        m.addMessage({
            contentType: 'text/plain',
            data: '[Message sent from karasu.co.uk contact form]:\n\n' +
                'Congratulations, you just sent an email from a worker.'
        })
        return new EmailMessage(
            SenderEmail, // sender
            RecipientEmail, // recipient
            m.asRaw()
        )
    }

    const sendToService = async (m: EmailMessage) => {
        try {
            const service = env.CONTACT_ME_EMAIL_SERVICE // defined in wrangler.jsonc
            await service.send(message)
            console.info('Email SUCCESS')
        } catch (e: any) {
            console.warn(`Email ERROR: {e.message}`)
            console.warn(e)
            throw new Error(`Error sending email: ${e.message}`)
        }
    }

    const message = createMessage()
    return sendToService(message)
}
