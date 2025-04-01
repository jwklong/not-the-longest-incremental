import Building from "$lib/building/building";
import Layer from "$lib/layer/layer";
import Resource from "$lib/resource/resource";
import Upgrade from "$lib/upgrade/upgrade";
import Quarry from "$lib/quarry/quarry";
import Achievement from "$lib/achievement/achievement";

import onum from "$lib/onum";

import achievements from "./achievements";

import Points from "./layers/points";
import Boosters from "./layers/boosters";
import QuarryL from "./layers/quarry";

class Data {
    /** @type {number} */
    timeSpent = 0

    /** @type {Object<string, Layer>} */
    layers = {}

    /** @type {Object<string, Resource>} */
    resources = {}

    /** @type {Object<string, Building>} */
    buildings = {}

    /** @type {Object<string, Upgrade>} */
    upgrades = {}

    /** @type {Object<string, Quarry>} */
    quarrys = {}

    /** @type {Achievement[]} */
    achievements = achievements

    settings = {
        disableNews: false
    }

    tick(dt) {
        this.timeSpent += dt

        Object.values(this.layers).forEach(v => {
            v.timeSpent = v.timeSpent + dt
        })

        Object.values(this.resources).forEach(v => {
            v.amount = v.amount.add(v.gain().mul(dt))
        })

        Object.values(this.quarrys).forEach(v => {
            v.tick(dt)
        })

        this.achievements.forEach(v => {
            if (!v.unlocked && v.requirement()) {
                v.unlocked = true
            }
            if (v.unlocked && !v.gilded && v.gildedRequirement()) {
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
            quarrys: {},

            settings: this.settings,
            timeSpent: this.timeSpent
        }

        for (let layer of Object.values(this.layers)) {
            object.layers[layer.id] = {
                timeSpent: layer.timeSpent,
                resets: layer.resets.toJSON()
            }
        }

        for (let resource of Object.values(this.resources)) {
            object.resources[resource.id] = {
                amount: resource.amount.toJSON()
            }
        }

        for (let building of Object.values(this.buildings)) {
            object.buildings[building.id] = {
                amount: building.amount.toJSON()
            }
        }

        for (let upgrade of Object.values(this.upgrades)) {
            object.upgrades[upgrade.id] = {
                bought: upgrade.bought
            }
        }

        for (let quarry of Object.values(this.quarrys)) {
            object.quarrys[quarry.id] = {
                currentLayer: quarry.currentLayer.id,
                currentOre: quarry.currentOre.id,
                currentHealth: quarry.currentOre.health.toJSON()
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
            let layer = this.layers[layerID]
            if (layer) {
                layer.timeSpent = loadedLayer.timeSpent ?? 0
                layer.resets = onum(loadedLayer.resets ?? 0)
            }
        }

        for (let resourceID of Object.keys(object.resources ?? {})) {
            let loadedResource = object.resources[resourceID]
            let resource = this.resources[resourceID]
            if (resource) {
                resource.amount = onum(loadedResource.amount ?? 0)
            }
        }

        for (let buildingID of Object.keys(object.buildings ?? {})) {
            let loadedBuilding = object.buildings[buildingID]
            let building = this.buildings[buildingID]
            if (building) {
                building.amount = onum(loadedBuilding.amount ?? 0)
            }
        }

        for (let upgradeID of Object.keys(object.upgrades ?? {})) {
            let loadedUpgrade = object.upgrades[upgradeID]
            let upgrade = this.upgrades[upgradeID]
            if (upgrade) {
                upgrade.bought = Boolean(loadedUpgrade.bought)
            }
        }

        for (let quarryID of Object.keys(object.quarrys ?? {})) {
            let loadedQuarry = object.quarrys[quarryID]
            let quarry = this.quarrys[quarryID]
            if (quarry) {
                quarry.setCurrentLayer(loadedQuarry.currentLayer)
                quarry.setCurrentOre(loadedQuarry.currentOre)
                quarry.currentOre.health = onum(loadedQuarry.currentHealth)
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
            data.layers[v.id] = v
        } else if (v instanceof Resource) {
            data.resources[v.id] = v
        } else if (v instanceof Building) {
            data.buildings[v.id] = v
        } else if (v instanceof Upgrade) {
            data.upgrades[v.id] = v
        } else if (v instanceof Quarry) {
            data.quarrys[v.id] = v

            Object.values(data.quarrys[v.id].inventory).forEach(w => data.resources[w.id] = w)
        } else {
            console.warn("Unknown layer type", v)
        }
    })
}

loadLayer(Points)
loadLayer(Boosters)
loadLayer(QuarryL)

export default data