import type { JsonObject } from './models/JsonTypes'

// - - - - Helpers - - - - - //

/*
 * Prevents CORS errors in the browser
 */
export const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // or your domain
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
}

/*
 * Parse the JSON body, or null if none
 */
export const parseBody = async (request: Request) => {
    const { headers } = request
    const contentType = headers.get('content-type') || ''

    if (contentType.includes('application/json')) {
        return await request.json()
    } else if (contentType.includes('form')) {
        const formData = await request.formData()
        const body: JsonObject = {}
        for (const entry of formData.entries()) {
            if (typeof entry === 'string') {
                body[entry[0]] = entry[1]
            }
        }
        return body
    } else {
        return null
    }
}

/*
 * Parse the JSON request
 */
export const parseRequest = async (request: Request) => {
    const { method, headers } = request

    const url = new URL(request.url)
    const contentType = headers.get('content-type') || ''
    const body = await parseBody(request)

    return { url, method, contentType, body }
}

/*
 * CORS preflight
 */
export const handleOptions = () => {
    return new Response(null, {
        status: 204,
        headers: corsHeaders
    })
}

export const handlePost = async (
    data: object | null
) => {
    return Response.json(data, {
        headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
        }
    })
}
