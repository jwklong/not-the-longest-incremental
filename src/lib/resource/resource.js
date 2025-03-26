import onum from "$lib/onum"

export default class Resource {
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


    /** @type {import("$lib/onum").onumType} */
    amount = onum()

    spanConfig = {
        /** @type {string?} */
        outerClass: null,
        /** @type {string} */
        symbol: "?",
        /** @type {string?} */
        symbolClass: null,
        /** @type {boolean} */
        onLeft: false
    }

    /** @returns {import("$lib/onum").onumType} */
    gain() {
        return onum()
    }
}