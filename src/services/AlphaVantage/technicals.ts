import type Api from './api'

export interface TimeSeriesParameters {
    interval:
        | '1min'
        | '5min'
        | '15min'
        | '30min'
        | '60min'
        | 'daily'
        | 'weekly'
        | 'monthly'
}

export interface MultiTimeSeriesParameters extends TimeSeriesParameters {
    series_type: 'close' | 'open' | 'high' | 'low'
}

export interface TimePeriodSeriesParameters extends MultiTimeSeriesParameters {
    time_period: number
}

export interface MultiPeriodSeriesParameters extends MultiTimeSeriesParameters {
    fastperiod?: number
    slowperiod?: number
    matype?: number
}

export interface MultiPeriodAndMaSeriesParameters
    extends MultiTimeSeriesParameters {
    fastperiod?: number
    slowperiod?: number
    signalperiod?: number
    fastmatype?: number
    slowmatype?: number
    signalmatype?: number
}

class Technicals {
    #api: Api

    constructor(api: Api) {
        this.#api = api
    }

    private timePeriodSeries = (fn: string) => (
        symbol: string,
        { interval, time_period, series_type }: TimePeriodSeriesParameters,
    ) => {
        return this.#api.request(fn)({ symbol, interval, time_period, series_type })
    }

    private multiPeriodSeries = (fn: string) => (
        symbol: string,
        {
            interval,
            series_type,
            fastperiod,
            slowperiod,
            matype,
        }: MultiPeriodSeriesParameters,
    ) => {
        return this.#api.request(fn)({
            symbol,
            interval,
            series_type,
            ...(fastperiod ? { fastperiod } : {}),
            ...(slowperiod ? { slowperiod } : {}),
            ...(matype ? { matype } : {}),
        })
    }

    private multiPeriodAndMaSeries = (fn: string) => (
        symbol: string,
        {
            interval,
            series_type,
            fastperiod = 12,
            slowperiod = 26,
            signalperiod = 9,
            fastmatype,
            slowmatype,
            signalmatype,
        }: MultiPeriodAndMaSeriesParameters,
    ) => {
        return this.#api.request(fn)({
            symbol,
            interval,
            series_type,
            ...(fastperiod ? { fastperiod } : {}),
            ...(slowperiod ? { slowperiod } : {}),
            ...(signalperiod ? { signalperiod } : {}),
            ...(fastmatype ? { fastmatype } : {}),
            ...(slowmatype ? { slowmatype } : {}),
            ...(signalmatype ? { signalmatype } : {}),
        })
    }

    private multiTimeSeriesParameters = (fn: string) => (
        symbol: string,
        { interval, series_type }: MultiTimeSeriesParameters,
    ) => {
        return this.#api.request(fn)({ symbol, interval, series_type })
    }

    sma = this.timePeriodSeries('SMA')
    ema = this.timePeriodSeries('EMA')
    wma = this.timePeriodSeries('WMA')
    dema = this.timePeriodSeries('DEMA')
    tema = this.timePeriodSeries('TEMA')
    trima = this.timePeriodSeries('TRIMA')
    kama = this.timePeriodSeries('KAMA')
    mama = (
        symbol: string,
        {
            interval,
            series_type,
            fastlimit = 0.01,
            slowlimit = 0.01,
        }: TimeSeriesParameters & any,
    ) =>
        this.#api.request('MAMA')({
            symbol,
            interval,
            series_type,
            fastlimit,
            slowlimit,
        })

    t3 = this.timePeriodSeries('T3')
    macd = this.multiPeriodAndMaSeries('MACD')
    macdext = this.multiPeriodAndMaSeries('MACDEXT')
    stoch = (
        symbol: string,
        {
            interval,
            fastkperiod,
            slowkperiod,
            slowdperiod,
            slowkmatype,
            slowdmatype,
        }: TimeSeriesParameters & any,
    ) =>
        this.#api.request('STOCH')({
            symbol,
            interval,
            fastkperiod,
            slowkperiod,
            slowdperiod,
            slowkmatype,
            slowdmatype,
        })

    stochf = (
        symbol: string,
        {
            interval,
            fastkperiod,
            fastdperiod,
            fastdmatype,
        }: TimeSeriesParameters & any,
    ) =>
        this.#api.request('STOCHF')({
            symbol,
            interval,
            fastkperiod,
            fastdperiod,
            fastdmatype,
        })

    rsi = this.timePeriodSeries('RSI')
    stochrsi = (
        symbol: string,
        {
            interval,
            time_period,
            series_type,
            fastkperiod,
            fastdperiod,
            fastdmatype,
        }: TimeSeriesParameters & any,
    ) =>
        this.#api.request('STOCHRSI')({
            symbol,
            interval,
            time_period,
            series_type,
            fastkperiod,
            fastdperiod,
            fastdmatype,
        })

    willr = this.timePeriodSeries('WILLR')
    adx = this.timePeriodSeries('ADX')
    adxr = this.timePeriodSeries('ADXR')
    apo = this.multiPeriodSeries('APO')
    ppo = this.multiPeriodSeries('PPO')
    mom = this.timePeriodSeries('MOM')
    bop = this.timePeriodSeries('BOP')
    cci = this.timePeriodSeries('CCI')
    cmo = this.timePeriodSeries('CMO')
    roc = this.timePeriodSeries('ROC')
    rocr = this.timePeriodSeries('ROCR')
    aroon = this.timePeriodSeries('AROON')
    aroonosc = this.timePeriodSeries('AROONOSC')
    mfi = this.timePeriodSeries('MFI')
    trix = this.timePeriodSeries('TRIX')
    ultosc = (
        symbol: string,
        {
            interval,
            timeperiod1,
            timeperiod2,
            timeperiod3,
        }: TimeSeriesParameters & any,
    ) =>
        this.#api.request('ULTOSC')({
            symbol,
            interval,
            timeperiod1,
            timeperiod2,
            timeperiod3,
        })

    dx = this.timePeriodSeries('DX')
    minus_di = this.timePeriodSeries('MINUS_DI')
    plus_di = this.timePeriodSeries('PLUS_DI')
    minus_dm = this.timePeriodSeries('MINUS_DM')
    plus_dm = this.timePeriodSeries('PLUS_DM')
    bbands = (
        symbol: string,
        {
            interval,
            time_period,
            series_type,
            nbdevup,
            nbdevdn,
            matype,
        }: TimeSeriesParameters & any,
    ) =>
        this.#api.request('BBANDS')({
            symbol,
            interval,
            time_period,
            series_type,
            nbdevup,
            nbdevdn,
            matype,
        })

    midpoint = this.timePeriodSeries('MIDPOINT')
    midprice = this.timePeriodSeries('MIDPRICE')
    sar = (
        symbol: string,
        { interval, acceleration, maximum }: TimeSeriesParameters & any,
    ) => this.#api.request('SAR')({ symbol, interval, acceleration, maximum })

    trange = this.timePeriodSeries('TRANGE')
    atr = this.timePeriodSeries('ATR')
    natr = this.timePeriodSeries('NATR')
    ad = this.timePeriodSeries('AD')
    adosc = (
        symbol: string,
        { interval, fastperiod, slowperiod }: TimeSeriesParameters & any,
    ) => this.#api.request('ADOSC')({ symbol, interval, fastperiod, slowperiod })

    obv = this.timePeriodSeries('OBV')
    ht_trendline = this.multiTimeSeriesParameters('HT_TRENDLINE')
    ht_sine = this.multiTimeSeriesParameters('HT_SINE')
    ht_trendmode = this.multiTimeSeriesParameters('HT_TRENDMODE')
    ht_dcperiod = this.multiTimeSeriesParameters('HT_DCPERIOD')
    ht_dcphase = this.multiTimeSeriesParameters('HT_DCPHASE')
    ht_dcphasor = this.multiTimeSeriesParameters('HT_PHASOR')
}

export default Technicals
