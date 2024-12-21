import OmegaNum from "omega_num.js";

let zero = OmegaNum(0, 0)

/** @typedef {typeof zero} onumType */

/**
 * @param {*} num 
 * @param {*} num2 
 * @returns {onumType}
 */
let onum = (num = 0, num2 = undefined) => OmegaNum(num, num2)

OmegaNum.prototype.toStringWhole = function(limit, pre = limit, precision) {
    return this.lessThan(OmegaNum(10).pow(limit))
        ? precision && this.lessThan(OmegaNum(10).pow(precision))
            ? this.lessThan(OmegaNum(1))
                ? this.toFixed(precision-1)
                : this.toPrecision(precision) 
            : this.toFixed()
        : this.toExponential(pre-1)
}

export default onum