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
        for (let i in this.updates) {
            let upd = this.updates[i]
            upd(dt, () => this.updates.splice(i, 1))
        }
    }
}

let globalUpdater = new GlobalUpdater
export default globalUpdater