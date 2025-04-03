<script>
    import Button from "$lib/button.svelte";
    import data from "$lib/data/data";
    import Resource from "$lib/resource/resource.svelte";
    import { onMount } from "svelte";
    import globalUpdater from "$lib/globalUpdater";

    let { id, desc } = $props()

    let upgrade = $state(data.upgrades[id])
    let bought = $state(upgrade.bought)
    let cost = $state(upgrade.cost())
    let effect = $state(upgrade.effect())
    let canBuy = $state(upgrade.canBuy())
    let visible = $state(upgrade.visible())
    
    let rootEl
    onMount(() => {
        globalUpdater.addUpdate((_, remove) => {
            if (!rootEl) remove()

            bought = upgrade.bought
            cost = upgrade.cost()
            effect = upgrade.effect()
            canBuy = upgrade.canBuy()
            visible = upgrade.visible()
        })
    });
</script>

<div class="main" class:hidden={!(visible || bought)} bind:this={rootEl}>
    <Button
        color={["var(--green-300)"]}
        disabled={!canBuy && !bought}
        active={bought}
        on:click={() => upgrade.buy()}
    >
        {@render desc(effect)}<br>
        {#if bought}
            <b>BOUGHT</b>
        {:else}
            <Resource id={cost[1]} amountOverride={cost[0]} />
        {/if}
    </Button>
</div>

<style>
    .main {
        width: 200px;
    }

    .hidden :global(button) {
        display: none;
    }

    .main :global(button) {
        width: 100%;
        height: 100%;
    }
</style>