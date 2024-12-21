import Building from "$lib/building/building"
import Layer from "$lib/layer/layer"
import Resource from "$lib/resource/resource"
import Upgrade from "$lib/upgrade/upgrade"
import onum from "$lib/onum";

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

    serialize() {
        let object = {
            layers: {},
            resources: {},
            buildings: {},
            upgrades: {}
        }

        for (let layer of this.layers) {
            //todo
        }

        for (let resource of this.resources) {
            object.resources[resource.id] = {
                amount: resource.amount.toJSON()
            }
        }

        for (let building of this.buildings) {
            object.buildings[building.id] = {
                amount: building.amount.toJSON()
            }
        }

        for (let upgrade of this.upgrades) {
            object.upgrades[upgrade.id] = {
                bought: upgrade.bought
            }
        }

        return encodeURIComponent(btoa(JSON.stringify(object)))
    }

    deserialize(input) {
        let object = JSON.parse(atob(decodeURIComponent(input)))

        for (let layerID of Object.keys(object.layers || {})) {
            let loadedLayer = object.layers[layerID]
            let layer = this.getLayer(layerID)
            if (layer) {
                //todo
            }
        }

        for (let resourceID of Object.keys(object.resources || {})) {
            let loadedResource = object.resources[resourceID]
            let resource = this.getResource(resourceID)
            if (resource) {
                resource.amount = onum(loadedResource.amount)
            }
        }

        for (let buildingID of Object.keys(object.buildings || {})) {
            let loadedBuilding = object.buildings[buildingID]
            let building = this.getBuilding(buildingID)
            if (building) {
                building.amount = onum(loadedBuilding.amount)
            }
        }

        for (let upgradeID of Object.keys(object.upgrades || {})) {
            let loadedUpgrade = object.upgrades[upgradeID]
            let upgrade = this.getUpgrade(upgradeID)
            if (upgrade) {
                upgrade.bought = loadedUpgrade.bought
            }
        }
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