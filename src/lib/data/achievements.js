import Achievement from "$lib/achievement/achievement";
import onum from "$lib/onum";
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

        ach.gildedDescription = "Buy 50 Makers."
        ach.gildedRequirement = function() {
            return data.getBuilding("maker").amount.gte(50)
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
            return data.getBuilding("fabricator").amount.gte(1)
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
        
        ach.gildedDescription = "2nd upgrade effect exceedes x50."
        ach.gildedRequirement = function() {
            return data.getUpgrade('p2').effect().gte(50)
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
        
        ach.gildedDescription = "Buy 8 Boosters."
        ach.gildedRequirement = function() {
            return data.getBuilding("booster").amount.gte(8)
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

        ach.gildedDescription = "Get 1 quadrillion points."
        ach.gildedRequirement = function() {
            return data.getResource("points").amount.gte(1e15)
        }

        return ach
    })(),
    (() => {
        let ach = new Achievement
        ach.name = "Tough choice"
        ach.location = [2, 1]

        ach.description = "Buy a Perk."
        ach.requirement = function() {
            return data.getUpgrade('bp1').cost()[0].gt(4)
        }

        ach.gildedDescription = "Have all 6 perks at once."
        ach.gildedRequirement = function() {
            return data.getUpgrade('bp1').cost()[0].gt(onum(4).pow(6))
        }

        return ach
    })(),
    (() => {
        let ach = new Achievement
        ach.name = "Overclocking"
        ach.location = [2, 2]

        ach.description = "Buy upgrade 5."
        ach.requirement = function() {
            return data.getUpgrade('p5').bought
        }

        return ach
    })(),
    (() => {
        let ach = new Achievement
        ach.name = "In this together"
        ach.location = [2, 3]

        ach.description = "Buy a Provider."
        ach.requirement = function() {
            return data.getBuilding("provider").amount.gte(1)
        }

        return ach
    })(),
]