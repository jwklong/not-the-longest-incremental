import Building from "$lib/building/building"
import Layer from "$lib/layer/layer"
import Resource from "$lib/resource/resource"
import Upgrade from "$lib/upgrade/upgrade"

import Points from "./layers/points"

class Data {
    /** @type {Layer[]} */
    layers = []

    /**
     * @param {string} id
     * @returns {Layer?}
     */
    getLayer(id) {
        return this.layers.find(v => v.id == id) || null
    }

    /** @type {Resource[]} */
    resources = []

    /**
     * @param {string} id
     * @returns {Resource?}
     */
    getResource(id) {
        return this.resources.find(v => v.id == id) || null
    }

    /** @type {Building[]} */
    buildings = []

    /**
     * @param {string} id
     * @returns {Building?}
     */
    getBuilding(id) {
        return this.buildings.find(v => v.id == id) || null
    }

    tick(dt) {
        this.resources.forEach(v => {
            v.amount = v.amount.add(v.gain().mul(dt))
        })
    }

    /** @type {Upgrade[]} */
    upgrades = []

    /**
     * @param {string} id
     * @returns {Upgrade?}
     */
    getUpgrade(id) {
        return this.upgrades.find(v => v.id == id) || null
    }
}

let data = new Data

/** @argument {*[]} layer */
function loadLayer(layer) {
    layer.forEach(v => {
        if (v instanceof Layer) {
            data.layers.push(v)
        } else if (v instanceof Resource) {
            data.resources.push(v)
        } else if (v instanceof Building) {
            data.buildings.push(v)
        } else if (v instanceof Upgrade) {
            data.upgrades.push(v)
        } else {
            console.warn("Unknown layer type", v)
        }
    })
}

loadLayer(Points)

export default data