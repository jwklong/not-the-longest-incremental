import Building from "$lib/building/building";
import onum from "$lib/onum";
import data from "../data";
import Resource from "$lib/resource/resource";

let Points = new Resource("points")

Points.spanConfig.symbol = "p"
Points.spanConfig.symbolClass = "symbolPoints"

Points.amount = onum(10)

Points.gain = function() {
    let base = onum()
    base = base.add(data.getBuilding("maker").effect()[0])
    base = base.add(data.getBuilding("generator").effect()[0])

    return base
}

import MakerImage from "$lib/assets/buildings/maker.svg";
let maker = new Building("maker")
maker.image = MakerImage
maker.name = "Maker"
maker.cost = function() {
    let base = onum(10)
    base = base.mul(onum(1.4).pow(this.amount))
    
    return [base, "points"]
}
maker.effect = function() {
    let base = onum(1)
    base = base.mul(this.amount)
    
    return [base, "points"]
}

import GeneratorImage from "$lib/assets/buildings/generator.svg";
let generator = new Building("generator")
generator.image = GeneratorImage
generator.name = "Generator"
generator.cost = function() {
    let base = onum(250)
    base = base.mul(onum(1.6).pow(this.amount))
    
    return [base, "points"]
}
generator.effect = function() {
    let base = onum(10)
    base = base.mul(this.amount)
    
    return [base, "points"]
}
generator.visible = function() {
    return data.getBuilding('maker').amount.gte(1)
}

export default [
    Points,
    maker,
    generator
]