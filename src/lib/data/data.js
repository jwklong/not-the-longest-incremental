import Building from "$lib/building/building"
import Layer from "$lib/layer/layer"
import Resource from "$lib/resource/resource"
import Upgrade from "$lib/upgrade/upgrade"
import onum from "$lib/onum";

import Points from "./layers/points"
import Boosters from "./layers/boosters";
import achievements from "./achievements";
import Achievement from "$lib/achievement/achievement";

class Data {
    /** @type {number} */
    timeSpent = 0

    /** @type {Layer[]} */
    layers = []

    /**
     * @param {string} id
     * @returns {Layer?}
     */
    getLayer(id) {
        return this.layers.find(v => v.id == id)
    }

    /** @type {Resource[]} */
    resources = []

    /**
     * @param {string} id
     * @returns {Resource?}
     */
    getResource(id) {
        return this.resources.find(v => v.id == id)
    }

    /** @type {Building[]} */
    buildings = []

    /**
     * @param {string} id
     * @returns {Building?}
     */
    getBuilding(id) {
        return this.buildings.find(v => v.id == id)
    }

    /** @type {Upgrade[]} */
    upgrades = []

    /**
     * @param {string} id
     * @returns {Upgrade?}
     */
    getUpgrade(id) {
        return this.upgrades.find(v => v.id == id)
    }

    /** @type {Achievement[]} */
    achievements = achievements

    settings = {
        disableNews: false
    }

    tick(dt) {
        this.timeSpent += dt

        this.layers.forEach(v => {
            v.timeSpent = v.timeSpent + dt
        })

        this.resources.forEach(v => {
            v.amount = v.amount.add(v.gain().mul(dt))
        })

        this.achievements.forEach(v => {
            if (v.requirement()) {
                v.unlocked = true
            }
            if (v.gildedRequirement() && v.unlocked) {
                v.gilded = true
            }
        })
    }

    serialize() {
        let object = {
            layers: {},
            resources: {},
            buildings: {},
            upgrades: {},
            achievements: {},

            settings: this.settings,
            timeSpent: this.timeSpent
        }

        for (let layer of this.layers) {
            object.layers[layer.id] = {
                timeSpent: layer.timeSpent,
                resets: layer.resets.toJSON()
            }
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

        for (let achievement of this.achievements) {
            object.achievements[achievement.location.join("")] = {
                unlocked: achievement.unlocked,
                gilded: achievement.gilded
            }
        }

        return encodeURIComponent(btoa(JSON.stringify(object)))
    }

    deserialize(input) {
        let object = JSON.parse(atob(decodeURIComponent(input)))

        this.timeSpent = object.timeSpent ?? 0

        for (let setting of Object.keys(this.settings)) {
            this.settings[setting] = (object.settings ?? {})[setting] ?? this.settings[setting]
        }

        for (let layerID of Object.keys(object.layers ?? {})) {
            let loadedLayer = object.layers[layerID]
            let layer = this.getLayer(layerID)
            if (layer) {
                layer.timeSpent = loadedLayer.timeSpent ?? 0
                layer.resets = onum(loadedLayer.resets ?? 0)
            }
        }

        for (let resourceID of Object.keys(object.resources ?? {})) {
            let loadedResource = object.resources[resourceID]
            let resource = this.getResource(resourceID)
            if (resource) {
                resource.amount = onum(loadedResource.amount ?? 0)
            }
        }

        for (let buildingID of Object.keys(object.buildings ?? {})) {
            let loadedBuilding = object.buildings[buildingID]
            let building = this.getBuilding(buildingID)
            if (building) {
                building.amount = onum(loadedBuilding.amount ?? 0)
            }
        }

        for (let upgradeID of Object.keys(object.upgrades ?? {})) {
            let loadedUpgrade = object.upgrades[upgradeID]
            let upgrade = this.getUpgrade(upgradeID)
            if (upgrade) {
                upgrade.bought = Boolean(loadedUpgrade.bought)
            }
        }

        for (let achievement of this.achievements) {
            let loadedAchievement = (object.achievements ?? {})[achievement.location.join("")]
            if (loadedAchievement) {
                achievement.unlocked = Boolean(loadedAchievement.unlocked)
                achievement.gilded = Boolean(loadedAchievement.gilded)
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
loadLayer(Boosters)

export default data