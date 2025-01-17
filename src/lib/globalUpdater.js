import data from "./data/data"

class GlobalUpdater {
    updates = []

    addUpdate(func) {
        this.updates.push(func)
    }

    constructor() {
        this.addUpdate(dt => data.tick(dt))
    }

    update(dt) {
        for (let upd of this.updates) {
            upd(dt)
        }
    }
}

let globalUpdater = new GlobalUpdater
export default globalUpdater