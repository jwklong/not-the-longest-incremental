import Building from "$lib/building/building";
import onum from "$lib/onum";
import data from "../data";
import Resource from "$lib/resource/resource";
import Upgrade from "$lib/upgrade/upgrade";
import Cost from "$lib/cost";

let Points = new Resource("points")
Points.name = "Points"

Points.spanConfig.symbol = "p"
Points.spanConfig.symbolClass = "symbolPoints"

Points.amount = onum(10)

Points.gain = function() {
    let base = onum()

    base = base.add(maker.effect()[0])
    base = base.add(generator.effect()[0])
    base = base.add(producer.effect()[0])
    base = base.add(fabricator.effect()[0])

    return base
}

function globalPointsBoost(num) {
    const booster = data.getBuilding('booster')
    const bp1 = data.getUpgrade("bp1")
    const provider = data.getBuilding('provider')
    const bp4 = data.getUpgrade("bp4")

    if (p1.bought) num = num.mul(p1.effect())
    if (p2.bought) num = num.mul(p2.effect())
    num = num.mul(booster.effect()[0])
    if (bp1.bought) num = num.mul(bp1.effect())
    if (booster.amount.gte(3)) num = num.mul(3)
    num = num.mul(provider.effect()[0])
    if (bp4.bought) num = num.mul(bp4.effect())
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

            let bp3 = data.getUpgrade('bp3')
            let bp6 = data.getUpgrade('bp6')

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
    if (data.getUpgrade('bp2').bought) base = base.mul(onum(1.1).pow(generator.amount))
    if (p5.bought) base = base.mul(10)
    
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

            let bp3 = data.getUpgrade('bp3')
            let bp6 = data.getUpgrade('bp6')

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
    if (data.getUpgrade('bp2').bought) base = base.mul(onum(1.1).pow(producer.amount))

    return [base, "points"]
}
generator.visible = function() {
    return maker.amount.gte(1) || data.getLayer('booster').hasReset
}

import ProducerImage from "$lib/assets/buildings/producer.svg";
let producer = new Building("producer")
producer.image = ProducerImage
producer.name = "Producer"
producer.cost = [
    new Cost({
        base: () => {
            let base = onum(10000)

            let bp3 = data.getUpgrade('bp3')
            let bp6 = data.getUpgrade('bp6')

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
    if (data.getUpgrade('bp2').bought) base = base.mul(onum(1.1).pow(fabricator.amount))

    return [base, "points"]
}
producer.visible = function() {
    return generator.amount.gte(5) || data.getLayer('booster').hasReset
}

import FabricatorImage from "$lib/assets/buildings/fabricator.svg";
let fabricator = new Building("fabricator")
fabricator.image = FabricatorImage
fabricator.name = "Fabricator"
fabricator.cost = [
    new Cost({
        base: () => {
            let base = onum(1e8)
            
            let bp3 = data.getUpgrade('bp3')
            let bp6 = data.getUpgrade('bp6')

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
    
    return [base, "points"]
}
fabricator.visible = function() {
    return data.getBuilding('booster').amount.gte(5)
}

let p1 = new Upgrade("p1")
p1.cost = function() {
    let base = onum(1000)
    
    return [base, "points"]
}
p1.effect = function() {
    let base = data.buildings.reduce((a, b) => a.add(b.amount), onum())
    base = base.add(1)
    base = base.logBase(10)
    if (data.getBuilding('booster').amount.gte(4)) base = base.pow(1.3)
    base = base.add(1)
    
    return base
}
p1.visible = function() {
    return generator.amount.gte(1) || data.getLayer('booster').hasReset
}

let p2 = new Upgrade("p2")
p2.cost = function() {
    let base = onum(10000)
    
    return [base, "points"]
}
p2.effect = function() {
    let base = data.getResource("points").amount
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
    return data.getLayer('booster').hasReset
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
    let base = data.getBuilding('booster').amount

    base = base.div(2)
    base = base.add(1)

    return base
}
p6.visible = function() {
    return p5.bought && fabricator.visible()
}

export default [
    Points,

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
]