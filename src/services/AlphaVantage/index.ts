import Api from './api'
import Stocks from './stocks'
import Crypto from './crypto'
import Forex from './forex'
import Technicals from './technicals'
import Sectors from './sectors'

class AlphaVantage {
    public api: Api

    public stocks: Stocks
    public crypto: Crypto
    public forex: Forex
    public technicals: Technicals
    public performance: Sectors

    constructor(apiKey: string) {
        this.api = new Api(apiKey)

        this.stocks = new Stocks(this.api)
        this.crypto = new Crypto(this.api)
        this.forex = new Forex(this.api)
        this.technicals = new Technicals(this.api)
        this.performance = new Sectors(this.api)
    }
}

export default AlphaVantage
