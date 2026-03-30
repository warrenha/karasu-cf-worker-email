import { sendEmail } from './EmailService'
import { handleOptions, handlePost/*, parseBody*/, parseRequest } from './WorkerHelper'
import { validContactMessage } from './models/ContactMessage';

import type { ContactMessage } from './models/ContactMessage'

type Payload = {
    status: 'success' | 'error'
    message: string | null
}

/*
 * Cloudflare Worker.
 *   Receives an API request, & sends a contact email.
 */
export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const { method, contentType, body } = await parseRequest(request)
        console.log({  // cloudflare prefers json objects
            worker: 'Send Email Worker',
            method,
            contentType,
            env: `${Object.keys(env)}`
        })

        const doSendEmail = async (body: ContactMessage): Promise<Payload> => {
            return sendEmail(body, env)
                .then(() => {
                    return { status: 'success', message: `Successfully sent an email!`} as const
                })
                .catch(e => {
                    return { status: 'error', message: e.message } as const
                })
        }

        if (method === 'OPTIONS') {  // CORS preflight
            return handleOptions()
        } else if (method === 'POST') {
            const error = validContactMessage(body);
            if (error) { throw Error(`Invalid request: ${error}`) }
            const message = body as ContactMessage;

            const payload = await doSendEmail(message)
            return handlePost(payload)
        }
        return Response.json({ error: `Unexpected method: ${method}` })
    }
}
