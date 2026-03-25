import { EmailMessage } from 'cloudflare:email'
import { createMimeMessage } from 'mimetext'

// Configured in Cloudflare 'Email Routing'
const SenderEmail = 'hello@karasu.co.uk'
const ReceiverEmail = 'hello@karasu.co.uk'

/*
 * Cloudflare Worker.
 *   Receive an API request, and send a test email.
 */
export default {
    async fetch(request: any, env: any) {
        console.info(`Send Email Worker [request=${typeof request}, env=${typeof env}`)
        console.info(`env keys=${Object.keys(env)}`)
        const msg = createMimeMessage()

        msg.setSender({ name: 'Karasu Ltd', addr: SenderEmail })
        msg.setRecipient(ReceiverEmail)
        msg.setSubject('An email generated in a worker')
        msg.addMessage({
            contentType: 'text/plain',
            data: `Congratulations, you just sent an email from a worker.`
        })
        const message = new EmailMessage(
            SenderEmail, // sender
            ReceiverEmail, // recipient
            msg.asRaw()
        )

        try {
            const service = env.CONTACT_ME_EMAIL_SERVICE // defined in wrangler.jsonc
            await service.send(message)
            console.info('Email SUCCESS')
        } catch (e: any) {
            console.warn(`Email ERROR: {e.message}`)
            console.warn(e)
            return new Response(e.message)
        }

        return new Response('Hello Send Email World!')
    }
}
