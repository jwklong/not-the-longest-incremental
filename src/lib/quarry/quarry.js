import onum from "$lib/onum";
import Resource from "$lib/resource/resource";
import UnknownImage from "$lib/assets/ores/unknown.svg"

export default class Quarry {
    /**
     * @param {string} id
     * @param {Object} data
     * @param {((() => import("$lib/onum").onumType) | import("$lib/onum").onumType)?} data.clickDamage
     * @param {((dt) => import("$lib/onum").onumType)?} data.autoDamage
     * @param {(() => import("$lib/onum").onumType)?} data.globalValueBoost
     * @param {Object[]} data.ores
     * @param {string} data.ores[].id
     * @param {string} data.ores[].name
     * @param {string?} data.ores[].image
     * @param {((() => [import("$lib/onum").onumType, string]) | [import("$lib/onum").onumType, string])?} data.ores[].value
     * @param {import("$lib/onum").onumType} data.ores[].health
     * @param {Object[]} data.layers
     * @param {string} data.layers[].id
     * @param {string} data.layers[].name
     * @param {(() => boolean)?} data.layers[].unlocked
     * @param {Object[]} data.layers[].ores[]
     * @param {string} data.layers[].ores[].id
     * @param {number} data.layers[].ores[].rarity
     */
    constructor(id, data) {
        this.id = id
        this.ores = data.ores.map(o => new QuarryOre(o, this))
        this.layers = data.layers.map(l => new QuarryLayer(l))

        this.ores.forEach(o => {
            let resource = new Resource(`quarry_${this.id}_${o.id}`)
            resource.name = o.name
            resource.spanConfig.symbol = ` ${o.name.toLowerCase()}`

            this.inventory[o.id] = resource
        })

        this.clickDamage = typeof data.clickDamage == 'function' ? data.clickDamage : () => data.clickDamage ?? onum()
        this.autoDamage = data.autoDamage ?? (() => onum())
        this.globalValueBoost = data.globalValueBoost ?? (() => onum(1))

        this.setCurrentLayer(this.layers[0].id)
    }

    /** @type {string} */
    id

    /** @type {QuarryOre[]} */
    ores = []

    /** @type {QuarryLayer[]} */
    layers = []

    /** @type {() => import("$lib/onum").onumType} */
    clickDamage

    /** @type {(dt) => import("$lib/onum").onumType} */
    autoDamage

    /** @type {() => import("$lib/onum").onumType} */
    globalValueBoost

    /** @type {Object<string, Resource>} */
    inventory = {}

    /** @type {QuarryOre?} */
    currentOre

    /** @type {QuarryLayer} */
    currentLayer

    /**
     * @param {string} id
     * @returns {QuarryOre}
     */
    setCurrentOre(id) {
        this.currentOre = this.ores.find(v => v.id == id).clone()
        return this.currentOre
    }

    /**
     * @param {string} id
     * @returns {QuarryLayer}
     */
    setCurrentLayer(id) {
        this.currentLayer = this.layers.find(v => v.id == id)
        this.currentOre = null
        this._cooldown = Date.now() + 1000
        return this.currentLayer
    }

    _cooldown = Date.now() + 1000

    tick(dt) {
        if (this.currentOre) {
            if (this.currentOre.isDestroyed()) {
                this.inventory[this.currentOre.id].amount = this.inventory[this.currentOre.id].amount.add(1)
                this.currentOre = null
                this._cooldown = Date.now() + 1000
            } else {
                this.currentOre.damage(this.autoDamage(dt))
            }
        } else if (!this.currentOre && this._cooldown < Date.now()) {
            this.setCurrentOre(this.currentLayer.getRandomOreId())
        }
    }
}

export class QuarryOre {
    /**
     * @param {Object} data
     * @param {string} data.id
     * @param {string} data.name
     * @param {string?} data.image
     * @param {((() => [import("$lib/onum").onumType, string]) | [import("$lib/onum").onumType, string])?} data.value
     * @param {import("$lib/onum").onumType} data.health
     * @param {Quarry} quarry
     */
    constructor(data, quarry) {
        this.quarry = quarry

        this.id = data.id
        this.name = data.name
        this.image = data.image ?? UnknownImage
        this.value = typeof data.value == 'function' ? data.value : () => data.value
        this.health = data.health
        this.maxHealth = data.health
    }

    /** @type {Quarry} */
    quarry

    /** @type {string} */
    id

    /** @type {string} */
    name

    /** @type {string} */
    image

    /** @type {() => [import("$lib/onum").onumType, string]?} */
    value

    /** @type {import("$lib/onum").onumType} */
    health

    /** @type {import("$lib/onum").onumType} */
    maxHealth

    damage(amount) {
        this.health = this.health.sub(amount)
        this.health = this.health.max(onum(0))
    }

    isDestroyed() {
        return this.health.lte(onum(1e-4)) //precision loss
    }

    clone() {
        return new QuarryOre(this, this.quarry)
    }
}

export class QuarryLayer {
    /**
     * @param {Object} data
     * @param {string} data.id
     * @param {string} data.name
     * @param {() => boolean} data.unlocked
     * @param {Object[]} data.ores[]
     * @param {string} data.ores[].id
     * @param {number} data.ores[].rarity
     */
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.unlocked = data.unlocked ?? this.unlocked
        this.ores = data.ores
    }

    /** @type {string} */
    id

    /** @type {string} */
    name

    /** @type {() => boolean} */
    unlocked = () => true

    /** @type {{id: string, rarity: number}[]} */
    ores = []

    getRandomOreId() {
        let totalRarity = this.ores.reduce((acc, ore) => acc + ore.rarity, 0)
        let sortedOres = this.ores.sort((a, b) => b.rarity - a.rarity)
        let randomRarity = Math.random() * totalRarity

        let rarityPassed = 0
        for (let ore of sortedOres) {
            rarityPassed += ore.rarity
            if (randomRarity <= rarityPassed) {
                return ore.id
            }
        }
    }
}