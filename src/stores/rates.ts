import { acceptHMRUpdate, defineStore } from 'pinia'
import AlphaVantage from '~/services/AlphaVantage'

export const useRatesStore = defineStore('rates', () => {
    const av = new AlphaVantage(import.meta.env.VITE_AV_API_KEY as string)

    const hint = ref('')

    const from_currency = ref('BTC')
    const to_currency = ref('USD')

    const results = ref<any[]>([])
    const lastResults = ref()

    function setFromCurrency(value: string) {
        from_currency.value = value
    }

    function setToCurrency(value: string) {
        to_currency.value = value
    }

    function clearAll() {
        results.value = []
        lastResults.value = undefined
    }

    async function getLastExchangeRate() {
        try {
            const data = await av.forex.rate(unref(from_currency), unref(to_currency))
            const polishData = av.api.polish(data)

            lastResults.value = polishData
            results.value.push(polishData)

            return polishData
        }
        catch (error) {
            if (error?.Information || error?.Note)
                hint.value = 'Please obtain new API KEY. Run `pnpm apigen` and enjoy service again'

            else if (error?.['Error Message'])
                hint.value = 'Unsupported currencies pair'

            throw new Error(error)
        }
    }

    return {
        av,

        hint,
        from_currency,
        to_currency,
        results,
        lastResults,

        setFromCurrency,
        setToCurrency,
        getLastExchangeRate,

        clearAll,
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useRatesStore as any, import.meta.hot))
