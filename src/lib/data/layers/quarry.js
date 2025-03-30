import Resource from "$lib/resource/resource";
import Quarry from "$lib/quarry/quarry";
import onum from "$lib/onum";

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
            health: onum(1)
        },
        {
            id: "stone",
            name: "Stone",
            health: onum(3),
            value: [onum(0.05), "euros"]
        },
        {
            id: "coal",
            name: "Coal",
            health: onum(4),
            value: [onum(0.08), "euros"]
        },
        {
            id: "copper",
            name: "Copper",
            health: onum(6),
            value: [onum(0.1), "euros"]
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
                {id: "copper", rarity: 0.2}
            ]
        }
    ],
    clickDamage: onum(0.2)
})

export default [
    euros,

    quarry
]