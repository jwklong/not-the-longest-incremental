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

    return base
}

import MakerImage from "$lib/assets/buildings/maker.svg";
let maker = new Building("maker")
maker.image = MakerImage
maker.name = "Maker"
maker.cost = [
    new Cost({
        base: onum(10),
        multiplicative: onum(1.4)
    }), "points"
]
maker.effect = function() {
    let base = onum(1)
    base = base.mul(this.amount)

    if (data.getUpgrade("p1").bought) base = base.mul(data.getUpgrade("p1").effect())
    if (data.getUpgrade("p2").bought) base = base.mul(data.getUpgrade("p2").effect())
    base = base.mul(data.getBuilding('booster').effect()[0])
    
    return [base, "points"]
}

import GeneratorImage from "$lib/assets/buildings/generator.svg";
let generator = new Building("generator")
generator.image = GeneratorImage
generator.name = "Generator"
generator.cost = [
    new Cost({
        base: onum(250),
        multiplicative: onum(1.6)
    }), "points"
]
generator.effect = function() {
    let base = onum(10)
    base = base.mul(this.amount)

    if (data.getUpgrade("p1").bought) base = base.mul(data.getUpgrade("p1").effect())
    if (data.getUpgrade("p2").bought) base = base.mul(data.getUpgrade("p2").effect())
        base = base.mul(data.getBuilding('booster').effect()[0])
    
    return [base, "points"]
}
generator.visible = function() {
    return data.getBuilding('maker').amount.gte(1)
}

import ProducerImage from "$lib/assets/buildings/producer.svg";
let producer = new Building("producer")
producer.image = ProducerImage
producer.name = "Producer"
producer.cost = [
    new Cost({
        base: onum(10000),
        multiplicative: onum(1.8)
    }), "points"
]
producer.effect = function() {
    let base = onum(100)
    base = base.mul(this.amount)

    if (data.getUpgrade("p1").bought) base = base.mul(data.getUpgrade("p1").effect())
    if (data.getUpgrade("p2").bought) base = base.mul(data.getUpgrade("p2").effect())
    base = base.mul(data.getBuilding('booster').effect()[0])
    
    return [base, "points"]
}
producer.visible = function() {
    return data.getBuilding('generator').amount.gte(5)
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
    base = base.logBase(15)
    base = base.add(1)
    
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

export default [
    Points,

    maker,
    generator,
    producer,

    p1,
    p2,
    p3,
]