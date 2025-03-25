import Building from "$lib/building/building";
import Resource from "$lib/resource/resource";
import Layer from "$lib/layer/layer";
import Upgrade from "$lib/upgrade/upgrade";
import Cost from "$lib/cost";
import onum from "$lib/onum";
import data from "$lib/data/data";

let boosterLayer = new Layer("booster")
boosterLayer.name = "Booster"
boosterLayer.resetFunction = function() {
    data.buildings['maker'].amount = onum(0)
    data.buildings['generator'].amount = onum(0)
    data.buildings['producer'].amount = onum(0)
    data.buildings['fabricator'].amount = onum(0)
    data.buildings['provider'].amount = onum(0)

    data.upgrades['p1'].bought = false
    data.upgrades['p2'].bought = false
    data.upgrades['p4'].bought = false
    data.upgrades['p5'].bought = false
    data.upgrades['p6'].bought = false
    
    data.resources['points'].amount = onum(10)
}

let boosterPoints = new Resource("boosterPoints");
boosterPoints.name = "Booster Points"

boosterPoints.spanConfig.symbol = "b"
boosterPoints.spanConfig.symbolClass = "symbolBP"

import BoosterImage from "$lib/assets/buildings/booster.svg";
let booster = new Building("booster")
booster.image = BoosterImage
booster.name = "Booster"
booster.cost = [
    new Cost({
        base: onum(100000),
        multiplicative: onum(10)
    }), "points"
]
booster.effect = function() {
    let base = onum(2)
    if (this.amount.gte(8)) base = onum(2.1)
    base = base.pow(this.amount)
    
    return [base, "points"]
}
booster.visible = function() {
    return data.upgrades['p3'].bought
}
booster.onBuy = function() {
    boosterPoints.amount = boosterPoints.amount.add(this.amount)
    data.layers['booster'].reset()
}

import ProviderImage from "$lib/assets/buildings/provider.svg";
let provider = new Building("provider")
provider.image = ProviderImage
provider.name = "Provider"
provider.cost = [
    new Cost({
        base: onum(1e10),
        multiplicative: onum(2.5)
    }), "points"
]
provider.effect = function() {
    let base = onum(1.25)

    let amount = this.amount
    if (bp5.bought) amount = amount.add(booster.amount.div(2))

    base = base.pow(amount)
    
    return [base, "points"]
}
provider.visible = function() {
    return booster.amount.gte(10)
}

function perkCost() {
    let perks = [bp1, bp2, bp3, bp4, bp5, bp6]
    let perksBought = perks.filter(v => v.bought).length

    let amt = onum(4).pow(perksBought+1)

    return [amt, "boosterPoints"]
}

let bp1 = new Upgrade("bp1")
bp1.cost = perkCost
bp1.effect = function() {
    let base = onum(boosterLayer.timeSpent)
    
    base = base.add(1)
    base = base.logBase(20)
    base = base.add(1)

    return base
}

let bp2 = new Upgrade("bp2")
bp2.cost = perkCost

let bp3 = new Upgrade("bp3")
bp3.cost = perkCost
bp3.effect = function() {
    let base = booster.amount
    
    base = base.div(10)
    base = base.add(1)
    
    return base
}

let bp4 = new Upgrade("bp4")
bp4.cost = perkCost
bp4.effect = function() {
    let base = boosterPoints.amount

    base = base.max(1)
    base = base.logBase(6)
    base = base.add(1)

    return base
}
bp4.visible = function() {
    return booster.amount.gte(12)
}

let bp5 = new Upgrade("bp5")
bp5.cost = perkCost
bp5.visible = function() {
    return booster.amount.gte(12)
}

let bp6 = new Upgrade("bp6")
bp6.cost = perkCost
bp6.effect = function() {
    let base = onum(1.035)
    
    base = base.pow(provider.amount)

    return base
}
bp6.visible = function() {
    return booster.amount.gte(12)
}

export default [
    boosterLayer,
    boosterPoints,
    booster,

    provider,

    bp1,
    bp2,
    bp3,
    bp4,
    bp5,
    bp6,
]