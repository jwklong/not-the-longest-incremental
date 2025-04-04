import Building from "$lib/building/building";
import onum from "$lib/onum";
import data from "../data";
import Resource from "$lib/resource/resource";
import Upgrade from "$lib/upgrade/upgrade";
import Cost from "$lib/cost";

let points = new Resource("points")
points.name = "Points"

points.spanConfig.symbol = "p"
points.spanConfig.symbolClass = "symbolPoints"

points.amount = onum(10)

points.gain = function() {
    let base = onum()

    base = base.add(maker.effect()[0])
    base = base.add(generator.effect()[0])
    base = base.add(producer.effect()[0])
    base = base.add(fabricator.effect()[0])

    return base
}

function globalPointsBoost(num) {
    const booster = data.buildings['booster']
    const bp1 = data.upgrades['bp1']
    const provider = data.buildings['provider']
    const bp4 = data.upgrades['bp4']

    if (p1.bought) num = num.mul(p1.effect())
    if (p2.bought) num = num.mul(p2.effect())
    num = num.mul(booster.effect()[0])
    if (bp1.bought) num = num.mul(bp1.effect())
    if (booster.amount.gte(3)) num = num.mul(3)
    num = num.mul(provider.effect()[0])
    if (bp4.bought) num = num.mul(bp4.effect())
    if (p8.bought) num = num.mul(p8.effect())

    return num
}

import MakerImage from "$lib/assets/buildings/maker.svg";
let maker = new Building("maker")
maker.image = MakerImage
maker.name = "Maker"
maker.cost = [
    new Cost({
        base: () => {
            let base = onum(10)

            let bp3 = data.upgrades['bp3']
            let bp6 = data.upgrades['bp6']

            if (bp3.bought) base = base.div(bp3.effect())
            if (bp6.bought) base = base.div(bp6.effect())

            return base
        },
        multiplicative: onum(1.4)
    }), "points"
]
maker.effect = function() {
    let base = onum(1)
    base = base.mul(this.amount)

    base = globalPointsBoost(base)
    if (data.upgrades['bp2'].bought) base = base.mul(onum(1.1).pow(generator.amount))
    if (p5.bought) base = base.mul(10)
    if (p7.bought) base = base.mul(10)
    
    return [base, "points"]
}

import GeneratorImage from "$lib/assets/buildings/generator.svg";
let generator = new Building("generator")
generator.image = GeneratorImage
generator.name = "Generator"
generator.cost = [
    new Cost({
        base: () => {
            let base = onum(250)

            let bp3 = data.upgrades['bp3']
            let bp6 = data.upgrades['bp6']

            if (bp3.bought) base = base.div(bp3.effect())
            if (bp6.bought) base = base.div(bp6.effect())

            return base
        },
        multiplicative: onum(1.6)
    }), "points"
]
generator.effect = function() {
    let base = onum(10)
    base = base.mul(this.amount)

    base = globalPointsBoost(base)
    if (data.upgrades['bp2'].bought) base = base.mul(onum(1.1).pow(producer.amount))
    if (p7.bought) base = base.mul(10)
    
    return [base, "points"]
}
generator.visible = function() {
    return maker.amount.gte(1) || data.layers['booster'].hasReset
}

import ProducerImage from "$lib/assets/buildings/producer.svg";
let producer = new Building("producer")
producer.image = ProducerImage
producer.name = "Producer"
producer.cost = [
    new Cost({
        base: () => {
            let base = onum(10000)

            let bp3 = data.upgrades['bp3']
            let bp6 = data.upgrades['bp6']

            if (bp3.bought) base = base.div(bp3.effect())
            if (bp6.bought) base = base.div(bp6.effect())

            return base
        },
        multiplicative: onum(1.8)
    }), "points"
]
producer.effect = function() {
    let base = onum(100)
    base = base.mul(this.amount)

    base = globalPointsBoost(base)
    if (data.upgrades['bp2'].bought) base = base.mul(onum(1.1).pow(fabricator.amount))
    if (p7.bought) base = base.mul(10)
    
    return [base, "points"]
}
producer.visible = function() {
    return generator.amount.gte(5) || data.layers['booster'].hasReset
}

import FabricatorImage from "$lib/assets/buildings/fabricator.svg";
let fabricator = new Building("fabricator")
fabricator.image = FabricatorImage
fabricator.name = "Fabricator"
fabricator.cost = [
    new Cost({
        base: () => {
            let base = onum(1e8)
            
            let bp3 = data.upgrades['bp3']
            let bp6 = data.upgrades['bp6']

            if (bp3.bought) base = base.div(bp3.effect())
            if (bp6.bought) base = base.div(bp6.effect())

            return base
        },
        multiplicative: onum(2)
    }), "points"
]
fabricator.effect = function() {
    let base = onum(3000)
    base = base.mul(this.amount)

    base = globalPointsBoost(base)
    if (p6.bought) base = base.mul(p6.effect())
    if (p7.bought) base = base.mul(10)
    
    return [base, "points"]
}
fabricator.visible = function() {
    return data.buildings['booster'].amount.gte(5)
}

let p1 = new Upgrade("p1")
p1.cost = function() {
    let base = onum(1000)
    
    return [base, "points"]
}
p1.effect = function() {
    let base = [maker, generator, producer, fabricator, data.buildings['provider']].reduce((a, b) => a.add(b.amount), onum())
    base = base.add(1)
    base = base.logBase(10)
    if (data.buildings['booster'].amount.gte(4)) base = base.pow(1.3)
    base = base.add(1)
    
    return base
}
p1.visible = function() {
    return generator.amount.gte(1) || data.layers['booster'].hasReset
}

let p2 = new Upgrade("p2")
p2.cost = function() {
    let base = onum(10000)
    
    return [base, "points"]
}
p2.effect = function() {
    let base = data.resources['points'].amount
    base = base.add(1)
    if (p4.bought) {
        base = base.root(8)
        base = base.mul(1.5)
    } else {
        base = base.logBase(15)
        base = base.add(1)
    }
    
    return base
}
p2.visible = function() {
    return p1.visible()
}

let p3 = new Upgrade("p3")
p3.cost = function() {
    let base = onum(50000)
    
    return [base, "points"]
}
p3.visible = function() {
    return p1.bought || p2.bought
}

let p4 = new Upgrade("p4")
p4.cost = function() {
    let base = onum(5e7)
    
    return [base, "points"]
}
p4.visible = function() {
    return data.layers['booster'].hasReset
}

let p5 = new Upgrade("p5")
p5.cost = function() {
    let base = onum(1e9)
    
    return [base, "points"]
}
p5.visible = function() {
    return p4.bought
}

let p6 = new Upgrade("p6")
p6.cost = function() {
    let base = onum(2e12)
    
    return [base, "points"]
}
p6.effect = function() {
    let base = data.buildings['booster'].amount

    base = base.div(2)
    base = base.add(1)

    return base
}
p6.visible = function() {
    return p5.bought && fabricator.visible()
}

let p7 = new Upgrade("p7")
p7.cost = function() {
    let base = onum(1e26)

    return [base, "points"]
}
p7.visible = function() {
    return p6.bought && data.upgrades['q3'].bought
}

let p8 = new Upgrade("p8")
p8.cost = function() {
    let base = onum(1e40)

    return [base, "points"]
}
p8.effect = function() {
    let base = data.resources['euros'].amount

    base = base.add(1)
    base = base.sqrt()

    return base
}
p8.visible = function() {
    return p6.bought && data.upgrades['q3'].bought
}

export default [
    points,

    maker,
    generator,
    producer,
    fabricator,

    p1,
    p2,
    p3,
    p4,
    p5,
    p6,
    p7,
    p8
]