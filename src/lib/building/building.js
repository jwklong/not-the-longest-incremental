import data from "$lib/data/data"
import onum from "$lib/onum"

export default class Building {
    /**
     * @param {string} id 
     */
    constructor(id) {
        this.id = id
    }

    /** @type {string} */
    id

    /** @type {string} */
    name = "Unknown"

    /** @type {string} */
    image = ""

    /** @type {import("$lib/onum").onumType} */
    amount = onum()

    /** @returns {[import("$lib/onum").onumType, string]} */
    cost() {
        return [onum(), ""]
    }

    /** @returns {[import("$lib/onum").onumType, string]} */
    effect() {
        return [onum(), ""]
    }

    canBuy() {
        let cost = this.cost()
        return data.getResource(cost[1]).amount.gte(cost[0])
    }

    buy() {
        if (!this.canBuy()) return
        let cost = this.cost()
        data.getResource(cost[1]).amount = data.getResource(cost[1]).amount.sub(cost[0])
        this.amount = this.amount.add(1)
    }

    visible() {
        return true
    }
}