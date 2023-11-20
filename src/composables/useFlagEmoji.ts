export default function useFlagEmoji(iso: string) {
    const flagEmoji = isRef(iso) ? iso : ref(iso ?? '')

    function isoToEmoji(countryCode: string): string {
        if (!countryCode)
            return ''

        const code = countryCode.toUpperCase()
        const codePoints = Array.from(code).map(c => 0x1F1E6 - 65 + c.charCodeAt(0))

        return String.fromCodePoint(...codePoints)
    }

    function setCountryCode(countryCode: string) {
        flagEmoji.value = isoToEmoji(countryCode)
    }

    return {
        flagEmoji,
        isoToEmoji,
        setCountryCode,
    }
}
