import Resource from "$lib/resource/resource";
import Quarry from "$lib/quarry/quarry";
import onum from "$lib/onum";

import DirtOre from "$lib/assets/ores/dirt.svg";
import StoneOre from "$lib/assets/ores/stone.svg";
import CoalOre from "$lib/assets/ores/coal.svg";
import CopperOre from "$lib/assets/ores/copper.svg";
import IronOre from "$lib/assets/ores/iron.svg";
import GoldOre from "$lib/assets/ores/gold.svg";
import Building from "$lib/building/building";
import data from "../data";
import Cost from "$lib/cost";
import Upgrade from "$lib/upgrade/upgrade";

let euros = new Resource("euros")
euros.name = "Euros"

euros.spanConfig.symbol = "€"
euros.spanConfig.symbolClass = "symbolEuros"
euros.spanConfig.onLeft = true

let quarry = new Quarry("normal", {
    ores: [
        {
            id: "dirt",
            name: "Dirt",
            image: DirtOre,
            health: onum(1)
        },
        {
            id: "stone",
            name: "Stone",
            image: StoneOre,
            health: onum(3),
            value: [onum(0.03), "euros"]
        },
        {
            id: "coal",
            name: "Coal",
            image: CoalOre,
            health: onum(4),
            value: [onum(0.05), "euros"]
        },
        {
            id: "copper",
            name: "Copper",
            image: CopperOre,
            health: onum(6),
            value: [onum(0.08), "euros"]
        },
        {
            id: "iron",
            name: "Iron",
            image: IronOre,
            health: onum(10),
            value: [onum(0.12), "euros"]
        },
        {
            id: "gold",
            name: "Gold",
            image: GoldOre,
            health: onum(5),
            value: [onum(0.2), "euros"]
        }
    ],
    layers: [
        {
            id: "0",
            name: "Surface",
            ores: [
                {id: "dirt", rarity: 1},
                {id: "stone", rarity: 0.5},
                {id: "coal", rarity: 0.2},
                {id: "copper", rarity: 0.2},
                {id: "iron", rarity: 0.1},
                {id: "gold", rarity: 0.08}
            ]
        }
    ],
    clickDamage: () => {
        let base = onum(0.2)

        if (q1.bought) base = base.add(q1.effect())

        return base
    },
    autoDamage: (dt) => {
        let base = onum()

        base = base.add(miner.effect())

        base = base.mul(dt)
        return base
    }
})

let miner = new Building('miner')
miner.name = 'Miner'
miner.cost = [
    new Cost({
        base: onum(2),
        multiplicative: onum(2)
    }), "euros"
]
miner.effect = function() {
    let base = onum(0.1)
    base = base.mul(this.amount)

    return [base]
}
miner.visible = function() {
    return data.resources['euros'].amount.gte(1) || miner.amount.gte(1)
}

let q1 = new Upgrade('q1')
q1.cost = function() {
    let base = onum(5)
    
    return [base, "euros"]
}
q1.effect = function() {
    let base = miner.amount
    base = base.mul(0.05)
    
    return base
}
q1.visible = function() {
    return miner.amount.gte(1)
}

export default [
    euros,

    quarry,

    miner,

    q1
]