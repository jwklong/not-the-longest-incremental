import Resource from "$lib/resource/resource";

let euros = new Resource("euros")
euros.name = "Euros"

euros.spanConfig.symbol = "€"
euros.spanConfig.symbolClass = "symbolEuros"
euros.spanConfig.onLeft = true

export default [
    euros
]