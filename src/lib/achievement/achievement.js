export default class Achievement {
    /** @type {string} */
    name = ""

    /** @type {string} */
    description = ""

    /** @type {string} */
    gildedDescription = ""

    /** @type {[number, number]} */
    location = [0, 0]

    /** @type {boolean} */
    unlocked = false

    /** @type {boolean} */
    gilded = false

    requirement() { return false }

    gildedRequirement() { return false }
}