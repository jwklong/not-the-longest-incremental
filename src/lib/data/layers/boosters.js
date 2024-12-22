import Building from "$lib/building/building";
import Resource from "$lib/resource/resource";
import Layer from "$lib/layer/layer";
import Cost from "$lib/cost";
import onum from "$lib/onum";
import data from "$lib/data/data";

let boosterLayer = new Layer("booster")
boosterLayer.name = "Booster"
boosterLayer.resetFunction = function() {
    data.getBuilding("maker").amount = onum(0)
    data.getBuilding("generator").amount = onum(0)
    data.getBuilding("producer").amount = onum(0)

    data.getUpgrade("p1").bought = false
    data.getUpgrade("p2").bought = false
    data.getUpgrade("p4").bought = false
    
    data.getResource("points").amount = onum(10)
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
    base = base.pow(this.amount)
    
    return [base, "points"]
}
booster.visible = function() {
    return data.getUpgrade('p3').bought
}
booster.onBuy = function() {
    data.getResource('boosterPoints').amount = data.getResource('boosterPoints').amount.add(this.amount)
    data.getLayer('booster').reset()
}

export default [
    boosterLayer,
    boosterPoints,
    booster
]