import { sendEmail } from './EmailService'
import { handleOptions, handlePost/*, parseBody*/, parseRequest } from './WorkerHelper'

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
        const { url, method, contentType } = parseRequest(request)
        console.info(`[Send Email Worker] ${contentType}, env: ${Object.keys(env)}`)

        const doSendEmail = async (): Promise<Payload> => {
            return sendEmail(env)
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
            return handlePost(doSendEmail())
        }
        return Response.json({ error: `Unexpected method: ${method}` })
    }
}
