import Cost from "$lib/cost"
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

    /** @type {[Cost, string]} */
    cost = [
        new Cost({
            base: onum(0)
        }), ""
    ]

    /** @returns {[import("$lib/onum").onumType, string]} */
    effect() {
        return [onum(), ""]
    }

    canBuy() {
        return data.getResource(this.cost[1]).amount.gte(this.cost[0].eval(this.amount))
    }

    buy() {
        if (!this.canBuy()) return
        data.getResource(this.cost[1]).amount = data.getResource(this.cost[1]).amount.sub(this.cost[0].eval(this.amount))
        this.amount = this.amount.add(1)
    }

    visible() {
        return true
    }
}