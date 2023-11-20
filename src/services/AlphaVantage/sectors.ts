import type Api from './api'

class Sectors {
    #api: Api

    constructor(api: Api) {
        this.#api = api
    }

    performance = () => {
        return this.#api.request('SECTOR')
    }
}

export default Sectors
