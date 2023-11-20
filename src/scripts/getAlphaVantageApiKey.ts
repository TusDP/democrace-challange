import setCookiesParser from 'set-cookie-parser'

async function getCsrfToken(): Promise<string | null> {
    const response = await fetch('https://www.alphavantage.co/support/')

    const setCookieHeader = response.headers.get('set-cookie')
    const cookies = setCookiesParser.parse(setCookieHeader)
    const csrftoken = cookies.find(cookie => cookie.name === 'csrftoken')?.value

    return csrftoken ?? null
}

export function generateRandomEmail() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'mail.com']
    const localPartLength = 10

    let localPart = ''

    for (let i = 0; i < localPartLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        localPart += characters.charAt(randomIndex)
    }

    const domain = domains[Math.floor(Math.random() * domains.length)]
    return `${localPart}@${domain}`
}

function extractApiKey(responseJson: Record<string, string>) {
    const apiKeyPattern = /key(?: is)?: (\w+)/
    const match = responseJson.text.match(apiKeyPattern)
    if (match && match.length > 1)
        return match[1] // The API key

    else
        return responseJson.text
}

export async function generateApiKey(email: string = generateRandomEmail()) {
    const formData = new FormData()
    formData.append('first_text', 'deprecated')
    formData.append('last_text', 'deprecated')
    formData.append('occupation_text', 'Other')
    formData.append('organization_text', 'DMCC')
    formData.append('email_text', email)

    const csrftoken = await getCsrfToken()

    if (csrftoken == null) {
        console.error('Cannot get CSRF token')
        return null
    }

    return fetch('https://www.alphavantage.co/create_post/', {
        method: 'POST',
        headers: {
            // Assuming that the CSRF token and Cookie are required for your specific case
            'Cookie': `csrftoken=${csrftoken}`,
            'X-Csrftoken': csrftoken,
            'Referer': 'https://www.alphavantage.co/support/',
        },
        body: formData,
        credentials: 'include', // Keep this if cookies are essential for the request
    })
        .then((response) => {
            if (!response.ok) {
                console.error(`HTTP error! Status: ${response.status}`)
                return
            }
            return response.text() // Or response.json() if the response is in JSON format
        })
        .then((response) => {
            if (response)
                return extractApiKey(JSON.parse(response))
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error)
        })
}
