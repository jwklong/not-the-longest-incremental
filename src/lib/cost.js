import onum from "./onum"

/**
 * @param {import("./onum").onumType | () => import("./onum").onumType?} input
 * @returns {import("./onum").onumType?}
 */
function handle(input) {
    if (typeof input == 'function') return input()
    return input
}

export default class Cost {
    /**
     * base + (additive * level) * (multiplicative ^ level)
     * @typedef {Object} CostInput
     * @property {import("./onum").onumType | () => import("./onum").onumType} base
     * @property {import("./onum").onumType | () => import("./onum").onumType?} multiplicative
     * @property {import("./onum").onumType | () => import("./onum").onumType?} scaling
     */

    /** @type {CostInput} */
    input

    /**
     * @param {CostInput} input 
     */
    constructor(input) {
        this.input = input
    }

    /**
     * cost at specified level
     * (b * (m ^ l)) ^ s
     * @param {import("./onum").onumType} level 
     * @returns {import("./onum").onumType}
     */
    eval(level) {
        let base = handle(this.input.base)
        let multiplicative = handle(this.input.multiplicative) || onum(1)
        let scaling = handle(this.input.scaling) || onum(1)

        return base.mul(multiplicative.pow(level)).pow(scaling)
    }

    /**
     * l = log(a^(1/s)/b)/log(m) according to wolfram
     * @param {import("./onum").onumType} amount
     * @returns {import("./onum").onumType}
     */
    evalHighestLevel(amount) {
        let base = handle(this.input.base)
        let multiplicative = handle(this.input.multiplicative) || onum(1)
        let scaling = handle(this.input.scaling) || onum(1)

        return amount.root(scaling).div(base).logBase(multiplicative).add(1).floor()
    }
}