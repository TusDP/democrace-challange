import path from 'node:path'
import fs from 'node:fs'

import { generateApiKey } from './getAlphaVantageApiKey'

async function main() {
    try {
        const apiKey = await generateApiKey()

        if (apiKey == null) {
            console.log('Cannot get API key. You\'ll have to do it manually.')
            return
        }

        const envFilePath = path.resolve(__dirname, '../../.env')

        // Check if .env file exists
        if (fs.existsSync(envFilePath)) {
            // Remove the existing .env file
            fs.unlinkSync(envFilePath)
        }

        // Replace it with the new content
        fs.writeFileSync(envFilePath, `VITE_AV_API_KEY=${apiKey}`)
    }
    catch (error) {
        console.error(error)
    }
}

main()
