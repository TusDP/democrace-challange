import type Api from './api'

class Crypto {
    #api: Api

    constructor(api: Api) {
        this.#api = api
    }

    #series = (fn: string) => (symbol: string, market: string) => {
        return this.#api.request(fn)({ symbol, market })
    }

    intraday = this.#series('DIGITAL_CURRENCY_INTRADAY')
    daily = this.#series('DIGITAL_CURRENCY_DAILY')
    weekly = this.#series('DIGITAL_CURRENCY_WEEKLY')
    monthly = this.#series('DIGITAL_CURRENCY_MONTHLY')
}

export default Crypto
