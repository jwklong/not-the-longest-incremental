<script>
    import data from "$lib/data/data";
    import { onMount } from "svelte";
    import InventoryItem from "./inventoryItem.svelte";
    import globalUpdater from "$lib/globalUpdater";
    import { QuarryOre } from "./quarry";
    import Resource from "$lib/resource/resource";

    let {
        id = ""
    } = $props()

    let quarry = $state(data.quarrys[id])
    /** @type {[QuarryOre, Resource][]} */
    let ores = $state(quarry.ores
        .filter(v => quarry.inventory[v.id].amount.gt(0))
        .map(v => [v, quarry.inventory[v.id]])
    )
    
    let rootEl
    onMount(() => {
        globalUpdater.addUpdate((_, remove) => {
            if (!rootEl) remove()

            ores = quarry.ores
                .filter(v => quarry.inventory[v.id].amount.gt(0))
                .map(v => [v, quarry.inventory[v.id]])
        })
    });
</script>

<div bind:this={rootEl}>
    {#each ores as ore}
        <InventoryItem ore={ore[0]} resource={ore[1]} />
    {/each}
</div>

<style>
    div {
        display: flex;
        flex-direction: column-reverse;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
</style>