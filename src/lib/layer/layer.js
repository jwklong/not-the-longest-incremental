import onum from "$lib/onum"

export default class Layer {
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

    /** @type {number} */
    timeSpent = 0

    /** @type {import("$lib/onum").onumType} */
    resets = onum(0)

    get hasReset() { return this.resets.gt(0) }

    resetFunction() { }

    reset(external = false) {
        this.resetFunction()
        if (!this.external) this.resets = this.resets.add(1)
        this.timeSpent = 0
    }
}