import Resource from "$lib/resource/resource";
import Quarry from "$lib/quarry/quarry";
import onum from "$lib/onum";
import Building from "$lib/building/building";
import data from "../data";
import Cost from "$lib/cost";
import Upgrade from "$lib/upgrade/upgrade";

import DirtOre from "$lib/assets/ores/dirt.svg";
import StoneOre from "$lib/assets/ores/stone.svg";
import CoalOre from "$lib/assets/ores/coal.svg";
import CopperOre from "$lib/assets/ores/copper.svg";
import IronOre from "$lib/assets/ores/iron.svg";
import GoldOre from "$lib/assets/ores/gold.svg";
import TitaniumOre from "$lib/assets/ores/titanium.svg";
import CrystalOre from "$lib/assets/ores/crystal.svg";
import RubyOre from "$lib/assets/ores/ruby.svg";
import EmeraldOre from "$lib/assets/ores/emerald.svg";
import SapphireOre from "$lib/assets/ores/sapphire.svg";
import DiamondOre from "$lib/assets/ores/diamond.svg";

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
            health: onum(1),
            value: [onum(0.01), "euros"]
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
            value: [onum(0.06), "euros"]
        },
        {
            id: "copper",
            name: "Copper",
            image: CopperOre,
            health: onum(6),
            value: [onum(0.1), "euros"]
        },
        {
            id: "iron",
            name: "Iron",
            image: IronOre,
            health: onum(10),
            value: [onum(0.15), "euros"]
        },
        {
            id: "gold",
            name: "Gold",
            image: GoldOre,
            health: onum(5),
            value: [onum(0.3), "euros"]
        },
        {
            id: "titanium",
            name: "Titanium",
            image: TitaniumOre,
            health: onum(30),
            value: [onum(0.4), "euros"]
        },
        {
            id: "crystal",
            name: "Crystal",
            image: CrystalOre,
            health: onum(20),
            value: () => {
                let boosters = data.buildings['booster'].amount

                return [boosters, "boosterPoints"]
            }
        },
        {
            id: "ruby",
            name: "Ruby",
            image: RubyOre,
            health: onum(25),
            value: [onum(0.5), "euros"]
        },
        {
            id: "emerald",
            name: "Emerald",
            image: EmeraldOre,
            health: onum(25),
            value: [onum(0.5), "euros"]
        },
        {
            id: "sapphire",
            name: "Sapphire",
            image: SapphireOre,
            health: onum(25),
            value: [onum(0.5), "euros"]
        },
        {
            id: "diamond",
            name: "Diamond",
            image: DiamondOre,
            health: onum(40),
            value: [onum(0.8), "euros"]
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
                {id: "gold", rarity: 0.08},
                {id: "titanium", rarity: 0.01}
            ]
        },
        {
            id: "1",
            name: "Geode",
            ores: [
                {id: "stone", rarity: 1},
                {id: "coal", rarity: 0.3},
                {id: "copper", rarity: 0.3},
                {id: "iron", rarity: 0.2},
                {id: "gold", rarity: 0.2},
                {id: "titanium", rarity: 0.2},
                {id: "crystal", rarity: 0.15},
                {id: "ruby", rarity: 0.1},
                {id: "emerald", rarity: 0.1},
                {id: "sapphire", rarity: 0.1},
                {id: "diamond", rarity: 0.03}
            ],
            unlocked: () => q2.bought
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

import MinerImage from "$lib/assets/buildings/miner.svg";
let miner = new Building('miner')
miner.name = 'Miner'
miner.image = MinerImage
miner.cost = [
    new Cost({
        base: onum(2),
        multiplicative: onum(1.5)
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

let q2 = new Upgrade('q2')
q2.cost = function() {
    let base = onum(20)
    
    return [base, "quarry_normal_copper"]
}
q2.visible = function() {
    return q1.bought
}

let q3 = new Upgrade('q3')
q3.cost = function() {
    let base = onum(50)
    
    return [base, "euros"]
}
q3.visible = function() {
    return q2.bought
}

export default [
    euros,

    quarry,

    miner,

    q1,
    q2,
    q3
]