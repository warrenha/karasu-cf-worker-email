// - - - - - Types - - - - - //

/*
 * Input values from the user.
 */
export type ContactMessage = {
    name: string,
    email: string,
    message: string
}

// - - - - - Helpers - - - - - //

const validString = (s: any): s is string => (
    (typeof s === 'string') && (s.trim().length > 0)
)

/*
 * For validating a received contact API request.
 */
export const validContactMessage = (
    m: any
): string | null => {
    if (!m || (typeof m !== 'object')) {
        return 'No contact message'
    }
    if (!validString(m.name) || (m.name.length > 500)) {
        return 'Missing or invalid name'
    }
    if (!validString(m.email) || !m.email.includes('@') || (m.email.length > 500)) {
        return 'Missing or invalid email address'
    }
    if (!validString(m.message) || (m.message.length > 2000)) {
        return 'Missing or invalid message'
    }
    return null
}
