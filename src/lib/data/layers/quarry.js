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
            health: onum(3)
        }
    ],
    layers: [
        {
            id: "0",
            name: "Surface",
            ores: [
                {id: "dirt", rarity: 1},
                {id: "stone", rarity: 0.5}
            ]
        }
    ],
    clickDamage: onum(0.2)
})

export default [
    euros,

    quarry
]