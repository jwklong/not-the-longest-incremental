import OmegaNum from "omega_num.js";

let zero = OmegaNum(0, 0)

/** @typedef {typeof zero} onumType */

/**
 * @param {*} num 
 * @param {*} num2 
 * @returns {onumType}
 */
let onum = (num = 0, num2 = undefined) => OmegaNum(num, num2)

OmegaNum.prototype.toStringWhole = function(digits) {
    return this.lessThan(OmegaNum(10).pow(digits)) ? this.toFixed() : this.toExponential(digits-1)
}

export default onum