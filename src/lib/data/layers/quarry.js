import Resource from "$lib/resource/resource";
import Quarry from "$lib/quarry/quarry";
import onum from "$lib/onum";

import DirtOre from "$lib/assets/ores/dirt.svg";
import StoneOre from "$lib/assets/ores/stone.svg";
import CoalOre from "$lib/assets/ores/coal.svg";
import CopperOre from "$lib/assets/ores/copper.svg";
import IronOre from "$lib/assets/ores/iron.svg";
import GoldOre from "$lib/assets/ores/gold.svg";

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
            value: [onum(0.05), "euros"]
        },
        {
            id: "coal",
            name: "Coal",
            image: CoalOre,
            health: onum(4),
            value: [onum(0.08), "euros"]
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
    clickDamage: onum(0.2)
})

export default [
    euros,

    quarry
]