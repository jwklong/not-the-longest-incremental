import data from "$lib/data/data"
import onum from "$lib/onum"

export default class Upgrade {
    /**
     * @param {string} id 
     */
    constructor(id) {
        this.id = id
    }

    /** @type {string} */
    id

    /** @type {string} */
    desc = ""

    /** @type {boolean} */
    bought = false

    /** @returns {[import("$lib/onum").onumType, string]} */
    cost() {
        return [onum(), ""]
    }

    /** @returns {import("$lib/onum").onumType} */
    effect() {
        return onum()
    }

    canBuy() {
        let cost = this.cost()
        return this.visible() && data.getResource(cost[1]).amount.gte(cost[0])
    }

    buy() {
        if (!this.canBuy()) return
        let cost = this.cost()
        data.getResource(cost[1]).amount = data.getResource(cost[1]).amount.sub(cost[0])
        this.bought = true
    }

    respec() {
        if (!this.bought) return
        this.bought = false
        let cost = this.cost()
        data.getResource(cost[1]).amount = data.getResource(cost[1]).amount.add(cost[0])
    }

    visible() {
        return true
    }
}