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

    base = base.add(data.getBuilding("maker").effect()[0])
    base = base.add(data.getBuilding("generator").effect()[0])
    base = base.add(data.getBuilding("producer").effect()[0])
    base = base.add(data.getBuilding("fabricator").effect()[0])

    return base
}

function globalPointsBoost(num) {
    if (data.getUpgrade("p1").bought) num = num.mul(data.getUpgrade("p1").effect())
    if (data.getUpgrade("p2").bought) num = num.mul(data.getUpgrade("p2").effect())
    num = num.mul(data.getBuilding('booster').effect()[0])
    if (data.getUpgrade("bp1").bought) num = num.mul(data.getUpgrade("bp1").effect())
    if (data.getBuilding('booster').amount.gte(3)) num = num.mul(3)
    num = num.mul(data.getBuilding('provider').effect()[0])
    if (data.getUpgrade("bp4").bought) num = num.mul(data.getUpgrade("bp4").effect())
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

            if (data.getUpgrade('bp3').bought) base = base.div(data.getUpgrade('bp3').effect())
            if (data.getUpgrade('bp6').bought) base = base.div(data.getUpgrade('bp6').effect())

            return base
        },
        multiplicative: onum(1.4)
    }), "points"
]
maker.effect = function() {
    let base = onum(1)
    base = base.mul(this.amount)

    base = globalPointsBoost(base)
    if (data.getUpgrade('bp2').bought) base = base.mul(onum(1.02).pow(data.getBuilding('generator').amount))
    if (data.getUpgrade('p5').bought) base = base.mul(10)
    
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

            if (data.getUpgrade('bp3').bought) base = base.div(data.getUpgrade('bp3').effect())
            if (data.getUpgrade('bp6').bought) base = base.div(data.getUpgrade('bp6').effect())

            return base
        },
        multiplicative: onum(1.6)
    }), "points"
]
generator.effect = function() {
    let base = onum(10)
    base = base.mul(this.amount)

    base = globalPointsBoost(base)
    if (data.getUpgrade('bp2').bought) base = base.mul(onum(1.02).pow(data.getBuilding('producer').amount))

    return [base, "points"]
}
generator.visible = function() {
    return data.getBuilding('maker').amount.gte(1) || data.getLayer('booster').hasReset
}

import ProducerImage from "$lib/assets/buildings/producer.svg";
let producer = new Building("producer")
producer.image = ProducerImage
producer.name = "Producer"
producer.cost = [
    new Cost({
        base: () => {
            let base = onum(10000)

            if (data.getUpgrade('bp3').bought) base = base.div(data.getUpgrade('bp3').effect())
            if (data.getUpgrade('bp6').bought) base = base.div(data.getUpgrade('bp6').effect())

            return base
        },
        multiplicative: onum(1.8)
    }), "points"
]
producer.effect = function() {
    let base = onum(100)
    base = base.mul(this.amount)

    base = globalPointsBoost(base)
    if (data.getUpgrade('bp2').bought) base = base.mul(onum(1.02).pow(data.getBuilding('fabricator').amount))

    return [base, "points"]
}
producer.visible = function() {
    return data.getBuilding('generator').amount.gte(5) || data.getLayer('booster').hasReset
}

import FabricatorImage from "$lib/assets/buildings/fabricator.svg";
let fabricator = new Building("fabricator")
fabricator.image = FabricatorImage
fabricator.name = "Fabricator"
fabricator.cost = [
    new Cost({
        base: () => {
            let base = onum(1e8)

            if (data.getUpgrade('bp3').bought) base = base.div(data.getUpgrade('bp3').effect())
            if (data.getUpgrade('bp6').bought) base = base.div(data.getUpgrade('bp6').effect())

            return base
        },
        multiplicative: onum(2)
    }), "points"
]
fabricator.effect = function() {
    let base = onum(3000)
    base = base.mul(this.amount)

    base = globalPointsBoost(base)
    if (data.getUpgrade('p6').bought) base = base.mul(data.getUpgrade('p6').effect())
    
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
    return data.getBuilding('generator').amount.gte(1) || data.getLayer('booster').hasReset
}

let p2 = new Upgrade("p2")
p2.cost = function() {
    let base = onum(10000)
    
    return [base, "points"]
}
p2.effect = function() {
    let base = data.getResource("points").amount
    base = base.add(1)
    if (data.getUpgrade('p4').bought) {
        base = base.root(8)
        base = base.mul(1.5)
    } else {
        base = base.logBase(15)
        base = base.add(1)
    }
    
    return base
}
p2.visible = function() {
    return data.getUpgrade('p1').visible()
}

let p3 = new Upgrade("p3")
p3.cost = function() {
    let base = onum(50000)
    
    return [base, "points"]
}
p3.visible = function() {
    return data.getUpgrade('p1').bought || data.getUpgrade('p2').bought
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
    return data.getUpgrade('p4').bought
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
    return data.getUpgrade('p5').bought && data.getBuilding('fabricator').visible()
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