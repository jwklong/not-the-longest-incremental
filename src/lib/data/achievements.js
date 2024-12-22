import Achievement from "$lib/achievement/achievement";
import data from "./data";

export default [
    (() => {
        let ach = new Achievement
        ach.name = "Start"
        ach.location = [1, 1]

        ach.description = "Buy a Maker."
        ach.requirement = function() {
            return data.getBuilding("maker").amount.gte(1)
        }

        ach.gildedDescription = "Buy 100 Makers."
        ach.gildedRequirement = function() {
            return data.getBuilding("maker").amount.gte(100)
        }

        return ach
    })(),
    (() => {
        let ach = new Achievement
        ach.name = "Self-productive"
        ach.location = [1, 2]

        ach.description = "Buy a Generator."
        ach.requirement = function() {
            return data.getBuilding("generator").amount.gte(1)
        }

        ach.gildedDescription = "Buy a Fabricator."
        ach.gildedRequirement = function() {
            return false //remember to do this when you added it
        }

        return ach
    })(),
    (() => {
        let ach = new Achievement
        ach.name = "Inflation"
        ach.location = [1, 3]

        ach.description = "Buy the 2nd upgrade."
        ach.requirement = function() {
            return data.getUpgrade('p2').bought
        }

        return ach
    })(),
    (() => {
        let ach = new Achievement
        ach.name = "Multiplied"
        ach.location = [1, 4]

        ach.description = "Buy a Booster."
        ach.requirement = function() {
            return data.getBuilding("booster").amount.gte(1)
        }

        return ach
    })(),
    (() => {
        let ach = new Achievement
        ach.name = "Millionaire"
        ach.location = [1, 5]

        ach.description = "Get 1 million points."
        ach.requirement = function() {
            return data.getResource("points").amount.gte(1e6)
        }

        ach.gildedDescription = "Get 1 trillion points."
        ach.gildedRequirement = function() {
            return data.getResource("points").amount.gte(1e12)
        }

        return ach
    })()
]