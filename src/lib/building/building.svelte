<script>
    import Button from "$lib/button.svelte";
    import data from "$lib/data/data";
    import globalUpdater from "$lib/globalUpdater";
    import Resource from "$lib/resource/resource.svelte";
    import { onMount } from "svelte";

    let { id, generation } = $props()

    let building = $state(data.buildings[id])
    let image = $derived(building.image)
    let name = $derived(building.name)
    let amount = $state(building.amount)
    let cost = $derived(building.cost)
    let effect = $state(building.effect())
    let canBuy = $state(building.canBuy())
    let visible = $state(building.visible())
    
    let rootEl
    onMount(() => {
        globalUpdater.addUpdate((_, remove) => {
            if (!rootEl) remove()

            amount = building.amount
            effect = building.effect()
            canBuy = building.canBuy()
            visible = building.visible()
        })
    });
</script>

<div class="main" class:hidden={!visible} bind:this={rootEl}>
    <img src={image} alt="" />
    <span>
        {amount.toStringWhole(5, 3)} {name}s
        {@render generation(effect)}
    </span>
    <Button
        disabled={!canBuy}
        on:click={() => building.buy()}
        color={["var(--green-300)"]}
    >Buy (<Resource id={cost[1]} amountOverride={cost[0].eval(amount)} />)</Button>
</div>

<style>
    .main {
        display: flex;
        gap: 8px;
        align-items: center;

        width: 480px;
    }

    .hidden {
        display: none;
    }

    img {
        width: 32px !important;
    }

    .main > :global(button) {
        width: 160px;
        margin-left: auto;
    }
</style>